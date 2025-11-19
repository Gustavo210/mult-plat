import { useMemo } from "react";

import { Container } from "@mobilestock-native/container";

import { TypeEventOnChange } from "./@types/event";
import { DefaultView } from "./components/DefaultView";
import { DropController } from "./components/DropController";
import { TypeFiles } from "./enum/TypeFiles";
import {
  MultipleArchiveProvider,
  MultipleArchiveProviderProps,
} from "./hooks/useMultipleArchive";

interface MultipleArchiveProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> {
  children?: React.ReactNode;
  accept?: (keyof typeof TypeFiles)[] | string;
  onChange?(event: TypeEventOnChangeGeneric): void;
  name: string;
}

export function FormMultipleArchive<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
>({
  children,
  accept,
  onChange,
  name,
}: MultipleArchiveProps<TypeEventOnChangeGeneric>) {
  const acceptArray = useMemo(() => {
    if (!accept) {
      return ["all"] as (keyof typeof TypeFiles)[];
    }

    const separators = ["|", ",", ";", " ", "\n", "\t", "\r"];

    if (typeof accept === "string") {
      return accept
        .split(new RegExp(separators.map((s) => `\\${s}`).join("|")))
        .map((item) => item.trim().replace(".", ""))
        .filter((item) => item.length > 0) as (keyof typeof TypeFiles)[];
    }

    return accept;
  }, [accept]);

  return (
    <MultipleArchiveProvider
      name={name}
      accept={acceptArray}
      onChange={onChange as MultipleArchiveProviderProps["onChange"]}
    >
      <Container.Vertical
        style={{
          borderWidth: 1,
          backgroundColor: "#f9f9f9",
          borderColor: "#cecece",
          borderRadius: 8,
          maxWidth: 400,
        }}
        padding="MD"
      >
        <DropController>{children || <DefaultView />}</DropController>
      </Container.Vertical>
    </MultipleArchiveProvider>
  );
}
