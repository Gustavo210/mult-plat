import { useField } from "@unform/core";
import {
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { KeyboardTypeOptions, TextInput, TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";

import { Button } from "@mobilestock-native/button";
import { Container } from "@mobilestock-native/container";
import tools from "@mobilestock-native/tools";
import { Typography } from "@mobilestock-native/typography";

import { useForm } from "../../hooks/useForm";

type InputType =
  | "text"
  | "password"
  | "tel"
  | "email"
  | "number"
  | "url"
  | "zipcode"
  | "hidden";

export interface InputProps extends Omit<TextInputProps, "hitSlop"> {
  name: string;
  label?: string;
  autofocus?: boolean;
  type?: InputType;
  autoSubmit?: boolean;
  full?: boolean;
  format?(value: string): string;
}

export interface InputRef {
  focus(): void;
  blur(): void;
}

interface InputValueRef extends TextInput {
  value: string;
}

export const FormInput = forwardRef<InputRef, InputProps>(function FormInputRef(
  {
    name,
    label,
    defaultValue,
    type = "text",
    autoSubmit = false,
    format,
    onChangeText,
    autoCapitalize,
    full,
    maxLength,
    ...props
  },
  formRef
) {
  const { loading, submitForm } = useForm();
  const unformField = useField(name);
  const inputRef = useRef<InputValueRef>(
    null
  ) as MutableRefObject<InputValueRef>;
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");

  const isPassword = type === "password";
  const maxInputLength =
    type === "tel" ? 15 : type === "zipcode" ? 9 : maxLength;

  useEffect(() => {
    const initialValue =
      value || defaultValue || unformField?.defaultValue || "";
    inputRef.current.value = initialValue;
    setValue(initialValue);

    unformField.registerField<string>({
      name: unformField.fieldName,
      ref: inputRef.current,
      getValue(ref) {
        return ref?.value || "";
      },
      setValue(ref, newValue) {
        ref.value = newValue;
        setValue(newValue);
      },
      clearValue(ref) {
        ref.value = "";
        setValue("");
      },
    });
  }, [unformField?.fieldName, unformField?.registerField]);

  useImperativeHandle(formRef, () => ({
    focus() {
      inputRef.current?.focus();
    },
    blur() {
      inputRef.current?.blur();
    },
  }));

  const handleChangeText = useCallback(
    (textValue: string) => {
      let formattedValue: string = textValue;

      switch (type) {
        case "tel":
          formattedValue = tools.phoneNumberFormatter(textValue);
          break;
        case "email":
        case "url":
          formattedValue = textValue.trim();
          break;
        case "number":
          formattedValue = textValue.replace(/[^0-9.,]/g, "");
          break;
        case "zipcode":
          formattedValue = tools.formatZipcode(formattedValue);
          break;
      }

      if (format) {
        formattedValue = format(formattedValue);
      }

      setValue(formattedValue);
      inputRef.current.value = formattedValue;

      onChangeText?.(formattedValue);

      if (type === "tel" && autoSubmit && formattedValue.length === 15) {
        inputRef.current?.blur();
        submitForm();
      }

      if (type === "zipcode" && autoSubmit && formattedValue.length === 9) {
        inputRef.current?.blur();
        submitForm();
      }
    },
    [type, format, autoSubmit, onChangeText, unformField]
  );

  const keyboardType = useCallback((): KeyboardTypeOptions => {
    switch (type) {
      case "tel":
        return "phone-pad";
      case "email":
        return "email-address";
      case "url":
        return "url";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  }, [type]);
  return (
    <InputContainer full={full} $show={type !== "hidden"}>
      {label && <Typography>{label}</Typography>}
      <ContainerInput error={!!unformField?.error} $isPassword={isPassword}>
        <InputField
          {...props}
          ref={inputRef}
          value={value}
          autoCapitalize={
            type && ["email", "url"].includes(type) ? "none" : autoCapitalize
          }
          keyboardType={keyboardType()}
          secureTextEntry={showPassword && isPassword}
          onChangeText={handleChangeText}
          maxLength={maxInputLength}
          editable={!loading && props.editable}
        />
        {isPassword && (
          <Button
            size="SM"
            onPress={() => setShowPassword(!showPassword)}
            icon={showPassword ? "EyeOff" : "EyeOutline"}
            variant="TRANSPARENT"
          />
        )}
      </ContainerInput>
      {unformField?.error && (
        <Typography color="DANGER" size="SM">
          {unformField.error}
        </Typography>
      )}
    </InputContainer>
  );
});

const InputContainer = styled(Container.Vertical)<{ $show: boolean }>`
  ${({ $show }) =>
    !$show &&
    css`
      display: none;
    `}
`;

const ContainerInput = styled(Container.Horizontal)<{
  error?: boolean;
  $isPassword: boolean;
}>`
  overflow: hidden;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.input.error : theme.colors.input.default};
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.colors.alert.urgent : theme.colors.input.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ $isPassword }) => ($isPassword ? "0 0 0 10px" : "0 10px")};
`;

const InputField = styled(TextInput)`
  flex: 1;
  height: 45px;
  color: ${({ theme }) => theme.colors.text.default};
`;
