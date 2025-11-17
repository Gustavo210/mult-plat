import { Container } from "@mobilestock-native/container";
import { DropController } from "./components/DropController";
import {
  EventOnChangeAddFiles,
  EventOnChangeRemoveFile,
  FileInputProvider,
  FileInputProviderProps,
} from "../../hooks/useFile";
import { TypeFiles } from "../../enum/TypeFiles";
import { useMemo } from "react";
import { DefaultView } from "./components/DefaultView";

type TypeEventOnChange = EventOnChangeAddFiles | EventOnChangeRemoveFile;

interface MultipleArchiveProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> {
  children?: React.ReactNode;
  accept?: (keyof typeof TypeFiles)[] | string;
  onChange?: (event: TypeEventOnChangeGeneric) => void;
}

export function MultipleArchive<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
>({
  children,
  accept,
  onChange,
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
    <FileInputProvider
      accept={acceptArray}
      onChange={onChange as FileInputProviderProps["onChange"]}
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
    </FileInputProvider>
  );
}
