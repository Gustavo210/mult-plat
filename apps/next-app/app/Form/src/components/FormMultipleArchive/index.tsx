"use client";

import { useMemo } from "react";

import { Container } from "@mobilestockweb/container";

import { useField } from "@unform/core";
import { DefaultView } from "./components/DefaultView";
import { DropController } from "./components/DropController";
import { Footer } from "./components/Footer";
import { Label } from "./components/Label";
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
  alignLabel?: "END" | "CENTER" | "START";
  label?: string;
}

export function FormMultipleArchive({
  accept,
  ...props
}: MultipleArchiveProps) {
  const acceptArray = useMemo(() => utils.parseAcceptString(accept), [accept]);
  const { error } = useField(props.name);

  return (
    <MultipleArchiveProvider {...props} accept={acceptArray}>
      <Container.Vertical gap="2XS">
        <Container.Horizontal align={props.alignLabel || "START"}>
          <Label>{props.label}</Label>
        </Container.Horizontal>
        <Container.Vertical
          style={{
            borderWidth: 1,
            backgroundColor: error ? "#fff1f0" : "#ffffff",
            borderColor: error ? "#ff4d4f" : "#d9d9d9",
            borderRadius: 8,
            borderStyle: "solid",
            minWidth: 400,
          }}
          padding="MD"
        >
          <DropController>{props.children || <DefaultView />}</DropController>
          <Footer />
        </Container.Vertical>
      </Container.Vertical>
    </MultipleArchiveProvider>
  );
}
