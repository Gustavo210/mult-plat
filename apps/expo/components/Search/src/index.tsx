import { SearchProvider } from "./hooks/useSearch";

import { JSX } from "react";
import { Attached } from "./components/Attached";
import { Detached } from "./components/Detached";
import { NoButton } from "./components/NoButton";

export type dataType = object | string;

type PrimitiveValue = string | number;

type JoinDotPath<Prefix extends string, Key extends string> = Prefix extends ""
  ? Key
  : `${Prefix}.${Key}`;

type JoinArrayIndexPath<Prefix extends string> = `${Prefix}[${number}]`;
type JoinArrayWildcardPath<Prefix extends string> = `${Prefix}[*]`;

type DepthDecrementMap = {
  0: 0;
  1: 0;
  2: 1;
  3: 2;
  4: 3;
  5: 4;
  6: 5;
  7: 6;
  8: 7;
  9: 8;
  10: 9;
};

type DecrementDepth<Depth extends number> =
  Depth extends keyof DepthDecrementMap ? DepthDecrementMap[Depth] : 0;

export type LeafObjectKeyPath<
  typeObject,
  Prefix extends string = "",
  Depth extends number = 8
> = Depth extends 0
  ? never
  : typeObject extends PrimitiveValue
  ? Prefix extends ""
    ? never
    : Prefix
  : typeObject extends readonly (infer typeElement)[]
  ? typeElement extends PrimitiveValue
    ? never
    :
        | LeafObjectKeyPath<
            typeElement,
            JoinArrayIndexPath<Prefix>,
            DecrementDepth<Depth>
          >
        | LeafObjectKeyPath<
            typeElement,
            JoinArrayWildcardPath<Prefix>,
            DecrementDepth<Depth>
          >
  : typeObject extends object
  ? {
      [key in Extract<keyof typeObject, string>]: LeafObjectKeyPath<
        typeObject[key],
        JoinDotPath<Prefix, key>,
        DecrementDepth<Depth>
      >;
    }[Extract<keyof typeObject, string>]
  : never;

type NormalizeSearchItem<typeItem> = typeItem extends string
  ? string
  : typeItem;

type FetchOnQueryFunction<typeItem> = (
  query?: string,
  signal?: AbortSignal
) => Promise<NormalizeSearchItem<typeItem>[]>;

type InferItemFromArray<typeArray> =
  typeArray extends readonly (infer typeItem)[] ? typeItem : never;

type InferItemFromFetchOnQuery<typeFetchOnQuery> = Awaited<
  typeFetchOnQuery extends (...args: any[]) => any
    ? ReturnType<typeFetchOnQuery>
    : never
> extends readonly (infer typeItem)[]
  ? typeItem
  : never;

type ValueSuggestionKeyForItem<typeItem> =
  NormalizeSearchItem<typeItem> extends object
    ? "" | LeafObjectKeyPath<NormalizeSearchItem<typeItem>>
    : never;

interface PropsSearchBase<typeItem> {
  onSelectItem?: (item: NormalizeSearchItem<typeItem>) => void;
  variant?: "attached" | "detached" | "no-button";
  valueSuggestionKey?: ValueSuggestionKeyForItem<typeItem>;
}

export function Search<typeDefaultData extends readonly unknown[]>(
  props: PropsSearchBase<InferItemFromArray<typeDefaultData>> & {
    defaultData: typeDefaultData;
    fetchOnQuery?: FetchOnQueryFunction<InferItemFromArray<typeDefaultData>>;
  }
): JSX.Element;

export function Search<
  typeFetchOnQuery extends (
    query?: string,
    signal?: AbortSignal
  ) => Promise<any[]>
>(
  props: PropsSearchBase<InferItemFromFetchOnQuery<typeFetchOnQuery>> & {
    defaultData?: undefined;
    fetchOnQuery: typeFetchOnQuery;
  }
): JSX.Element;

export function Search(props: PropsSearchBase<string>) {
  return (
    <SearchProvider {...props}>
      {props.variant === "attached" ? (
        <Attached />
      ) : props.variant === "detached" ? (
        <Detached />
      ) : (
        <NoButton />
      )}
    </SearchProvider>
  );
}
