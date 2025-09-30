import { useField } from "@unform/core";

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
  options: CustomOption[];
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
  const { error } = useField(name);

  return (
    <Container.Vertical full={full}>
      {label && <Typography>{label}</Typography>}
      {Platform.OS === "web" ? (
        <SelectWeb
          disabled={disabled}
          options={options}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <SelectAndroid
          name={name}
          disabled={disabled}
          options={options}
          placeholder={placeholder}
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
