import { Container } from "@mobilestock-native/container";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";

export function SelectAndroid({
  options,
  placeholder,
  selectRef,
  defaultValue,
  value,
  disabled,
}: {
  options?: { label: string; value: string }[];
  placeholder?: string;
  selectRef: any;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}) {
  return (
    <ContainerSelect>
      <Picker
        ref={selectRef}
        selectedValue={value || defaultValue}
        prompt={placeholder}
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
      </Picker>
    </ContainerSelect>
  );
}
const ContainerSelect = styled(Container.Horizontal)`
  overflow: hidden;
  height: 48px;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.input.error : theme.colors.input.default};
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.colors.alert.urgent : theme.colors.input.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 0 10px;
`;
