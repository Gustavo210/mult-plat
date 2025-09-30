import { Icon } from "@mobilestock-native/icons";

import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";

import { useForm } from "@/components/Form/src/hooks/useForm";
import { Typography } from "@mobilestock-native/typography";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { CustomOption } from "../..";
import { FormSheet } from "./components/FormSheet";

interface FormSelectModalProps {
  placeholder?: string;
  options: CustomOption[];
  disabled?: boolean;
  name: string;
}

export function SelectAndroid({
  options,
  placeholder = "Selecione um item",
  disabled = false,
  name,
}: FormSelectModalProps) {
  const { loading } = useForm();
  const { fieldName, registerField } = useField(name);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<CustomOption | null>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return selected?.value;
      },
      setValue: (_, value) => {
        const item = options.find((option) => option.value === value);
        if (item) {
          setSelected(item);
        }
      },
      clearValue: () => {
        setSelected(null);
      },
    });
  }, [fieldName, registerField, selected, options]);

  return (
    <>
      <Clickable
        disabled={disabled || loading}
        onPress={() => setShowModal(true)}
      >
        <ContainerInputFake
          padding="NONE_XS_NONE_MD"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Container.Horizontal>
            <Typography color={selected ? "DEFAULT" : "DEFAULT_200"}>
              {selected?.label || placeholder}
            </Typography>
          </Container.Horizontal>
          <Container.Horizontal gap="XS" align="CENTER">
            <Container.Vertical
              style={{
                width: 1,
                height: 30,
                backgroundColor: "#E1E1E6",
              }}
            />
            <Icon name="ChevronDown" size="XS" />
          </Container.Horizontal>
        </ContainerInputFake>
      </Clickable>
      {!disabled && !loading && (
        <FormSheet
          options={options}
          onClose={() => setShowModal(false)}
          visible={showModal}
          placeholder={placeholder}
          onSelect={(item) => {
            setSelected(item);
          }}
        />
      )}
    </>
  );
}

interface ContainerInputFakeProps {
  error?: boolean;
}

const ContainerInputFake = styled(
  Container.Horizontal
)<ContainerInputFakeProps>`
  overflow: hidden;
  height: 45px;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.input.error : theme.colors.input.default};
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.colors.alert.urgent : theme.colors.input.border};
  border-radius: 8px;
`;
