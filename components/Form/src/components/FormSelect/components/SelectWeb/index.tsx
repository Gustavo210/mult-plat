import { useForm } from "@/components/Form/src/hooks/useForm";
import { useField } from "@unform/core";
import { mergeWith } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import ReactSelect, { CSSObjectWithLabel } from "react-select";
import { useTheme } from "styled-components";
import { CustomOption, FormSelectPropsBase } from "../..";

export function SelectWeb({
  options,
  placeholder,
  value,
  disabled,
  name,
  defaultValue,
}: FormSelectPropsBase) {
  const Theme = useTheme();
  const { loading } = useForm();
  const {
    fieldName,
    defaultValue: unformDefaultValue,
    registerField,
    error,
  } = useField(name);
  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        const selectValue: CustomOption[] = ref?.state?.selectValue;
        if (!selectValue) return "";
        return selectValue[0]?.value || "";
      },
    });
  }, [fieldName, registerField]);

  const performStyles = useCallback((base: CSSObjectWithLabel) => {
    return function (style: CSSObjectWithLabel): CSSObjectWithLabel {
      return mergeWith(style, base);
    };
  }, []);
  return (
    <ReactSelect<CustomOption>
      options={[
        {
          label: placeholder,
          options: options,
        },
      ]}
      placeholder={placeholder}
      defaultInputValue={
        defaultValue?.label ?? unformDefaultValue?.label ?? undefined
      }
      value={value}
      menuPortalTarget={
        typeof document !== "undefined" ? document.body : undefined
      }
      menuPosition="fixed"
      styles={{
        container: performStyles({
          width: "100%",
          display: "flex",
          height: "3rem",
        }),
        control: performStyles({
          width: "100%",
          backgroundColor: error ? Theme.colors.input.error : undefined,
          borderColor: error ? Theme.colors.alert.urgent : undefined,
        }),
        indicatorSeparator: performStyles({
          backgroundColor: error ? Theme.colors.alert.urgent : undefined,
        }),
        dropdownIndicator: performStyles({
          color: error ? Theme.colors.alert.urgent : undefined,
        }),
      }}
      className="react-select"
      classNamePrefix="react-select"
      defaultValue={defaultValue}
      ref={selectRef}
      isDisabled={disabled || loading}
    />
  );
}
