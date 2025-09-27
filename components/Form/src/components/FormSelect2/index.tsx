import { useField } from "@unform/core";
import { useEffect, useRef } from "react";
import ReactSelect, { GroupBase, Props } from "react-select";
import styled from "styled-components";

import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";

import { Platform } from "react-native";
import { useForm } from "../../hooks/useForm";

interface CustomOption {
  label: string;
  value: string;
}

interface SelectProps<
  Option extends CustomOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  name: string;
  label?: string;
}

export function FormSelect2<
  Option extends CustomOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
  if (Platform.OS !== "web") {
    return <></>;
  }
  const { loading } = useForm();
  const { fieldName, defaultValue, registerField, error } = useField(
    props.name
  );
  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        const selectValue: Option[] = ref?.state?.selectValue;
        if (!selectValue) return props?.isMulti ? [] : "";

        return props?.isMulti
          ? selectValue.map((item: Option) => item.value)
          : selectValue[0]?.value;
      },
    });
  }, [fieldName, registerField, props.isMulti]);

  return (
    <ContainerSelect $isWrong={!!error}>
      {props?.label && (
        <Label htmlFor={fieldName} size="MD">
          {props.label}
        </Label>
      )}
      <ReactSelect
        {...props}
        className="react-select"
        classNamePrefix="react-select"
        defaultValue={defaultValue}
        ref={selectRef}
        isDisabled={loading}
      />
      {error && (
        <Typography color="DANGER" size="SM">
          {error}
        </Typography>
      )}
    </ContainerSelect>
  );
}

export const ContainerSelect = styled(Container.Vertical)<{
  $isWrong: boolean;
}>`
  z-index: 1000;

  .react-select {
    background-color: ${({ $isWrong, theme }) =>
      $isWrong ? theme.colors.input.error : theme.colors.input.default};
    border: 1px solid
      ${({ $isWrong, theme }) =>
        $isWrong ? theme.colors.alert.urgent : theme.colors.input.border};
    border-radius: 0.25rem;
    height: 2.5rem;
    z-index: 1000;

    width: 100%;
  }
  .react-select__control {
    background-color: ${({ $isWrong, theme }) =>
      $isWrong ? theme.colors.input.error : theme.colors.input.default};
    border: none;
    height: 100%;
    z-index: 1000;
  }
  .react-select__placeholder {
    padding: 0.3rem;
  }
  .react-select__menu {
    color: #f1f1f1;
    background-color: #cecece;
    height: auto;
    z-index: 1000;
  }
  .react-select__option--is-focused {
    color: #f1f1f1;
    background-color: #000000;
    z-index: 1000;
  }
`;

const Label = styled(Typography)``;
