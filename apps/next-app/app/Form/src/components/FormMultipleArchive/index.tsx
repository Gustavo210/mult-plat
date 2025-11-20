"use client";

import { useMemo } from "react";

import { Container } from "@mobilestockweb/container";

import { DefaultView } from "./components/DefaultView";
import { DropController } from "./components/DropController";
import { Footer } from "./components/Footer";
import { TypeFiles } from "./enum/TypeFiles";
import {
  MultipleArchiveProvider,
  MultipleArchiveProviderProps,
} from "./hooks/useMultipleArchive";
import { utils } from "./utils";

interface MultipleArchiveProps
  extends Omit<MultipleArchiveProviderProps, "children" | "accept"> {
  children?: React.ReactNode;
  accept?: (keyof typeof TypeFiles)[] | string;
}

export function FormMultipleArchive({
  accept,
  ...props
}: MultipleArchiveProps) {
  const acceptArray = useMemo(() => utils.parseAcceptString(accept), [accept]);

  return (
    <MultipleArchiveProvider {...props} accept={acceptArray}>
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
        <DropController>{props.children || <DefaultView />}</DropController>
        <Footer />
      </Container.Vertical>
    </MultipleArchiveProvider>
  );
}
