import { SearchProvider } from "./hooks/useSearch";

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

export type LeafObjectKeyPath<
  typeObject,
  Prefix extends string = ""
> = typeObject extends PrimitiveValue
  ? Prefix extends ""
    ? never
    : Prefix
  : typeObject extends readonly (infer typeElement)[]
  ? typeElement extends PrimitiveValue
    ? never
    :
        | LeafObjectKeyPath<typeElement, JoinArrayIndexPath<Prefix>>
        | LeafObjectKeyPath<typeElement, JoinArrayWildcardPath<Prefix>>
  : typeObject extends object
  ? {
      [key in Extract<keyof typeObject, string>]: LeafObjectKeyPath<
        typeObject[key],
        JoinDotPath<Prefix, key>
      >;
    }[Extract<keyof typeObject, string>]
  : never;

interface PropsSearch<T extends object | string> {
  defaultData?: T[];
  fetchOnQuery?: (query?: string, signal?: AbortSignal) => Promise<T[]>;
  onSelectItem?: (item: T) => void;
  valueSuggestionKey?: T extends object ? LeafObjectKeyPath<T> : never;
  variant?: "attached" | "detached" | "no-button";
}

export function Search<T extends dataType>(props: PropsSearch<T>) {
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
