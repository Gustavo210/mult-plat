import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Platform } from "react-native";
import { SelectAndroid } from "./components/SelectAndroid";
import { SelectWeb } from "./components/SelectWeb";

export interface CustomOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  options?: CustomOption[];
  placeholder?: string;
  value?: CustomOption;
  full?: boolean;
}
export function FormSelect({
  name,
  label,
  disabled,
  options,
  placeholder,
  full = false,
  value,
}: FormSelectProps) {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const selectRef = useRef(null);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        const selectValue = ref?.state?.selectValue;
        if (!selectValue) return "";

        return selectValue[0]?.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container.Vertical full={full}>
      {label && <Typography>{label}</Typography>}
      {Platform.OS === "web" ? (
        <SelectWeb
          disabled={disabled}
          options={options || []}
          defaultValue={
            defaultValue
              ? { label: defaultValue, value: defaultValue }
              : undefined
          }
          value={value}
          selectRef={selectRef}
          placeholder={placeholder}
        />
      ) : (
        <SelectAndroid
          disabled={disabled}
          options={options || []}
          defaultValue={defaultValue?.value}
          value={value?.value}
          selectRef={selectRef}
          placeholder={placeholder}
          label={label}
        />
      )}
      {error && (
        <Typography color="DANGER" size="SM">
          {error}
        </Typography>
      )}
    </Container.Vertical>
  );
}
