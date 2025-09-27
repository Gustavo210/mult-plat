import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Platform } from "react-native";
import { SelectAndroid } from "./implemetations/android";
import { SelectWeb } from "./implemetations/web";

interface FormSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  value?: { label: string; value: string };
  full?: boolean;
}
export function FormSelect({
  name,
  label,
  disabled,
  options,
  menuIsOpen = false,
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
    <Container.Vertical
      full={full}
      style={{
        zIndex: 100,
      }}
    >
      {label && <Typography>{label}</Typography>}
      {Platform.OS === "web" ? (
        <SelectWeb
          disabled={disabled}
          options={options || []}
          menuIsOpen={menuIsOpen}
          defaultValue={
            defaultValue
              ? { label: defaultValue, value: defaultValue }
              : undefined
          }
          value={value}
          selectRef={selectRef}
          placeholder={placeholder}
          label={label}
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

      {/* <Picker
          ref={selectRef}
          selectedValue={value || defaultValue}
          prompt={label}
          dropdownIconRippleColor="transparent"
          mode="dialog"
          style={{
            padding: 0,
            margin: 0,
            flex: 1,
            height: 48,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
          onValueChange={(itemValue: any, itemIndex: number) => {
            console.log(itemValue, itemIndex);
          }}
          selectionColor={"#f00"}
          enabled={!disabled}
        >
          <Picker.Item
            label={placeholder || "Selecione"}
            style={{
              color: "#999",
            }}
          />
          {options?.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={{ color: "#000" }}
            />
          ))}
        </Picker> */}
      {error && (
        <Typography color="DANGER" size="SM">
          {error}
        </Typography>
      )}
    </Container.Vertical>
  );
}
