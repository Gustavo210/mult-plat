import { Icon } from "@mobilestock-native/icons";

import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";

import { Typography } from "@mobilestock-native/typography";
import { useState } from "react";
import styled from "styled-components/native";
import { CustomOption } from "../..";
import { FormSheet } from "./components/FormSheet";

interface FormSelectModalProps<T> {
  data: (T & { id?: string | number })[];
  placeholder?: string;
  options: CustomOption[];
}

export function SelectAndroid<T extends { name: string; id: string | number }>({
  data,
  options,
  placeholder = "Selecione um item",
}: FormSelectModalProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<CustomOption | null>(null);

  return (
    <>
      <Clickable onPress={() => setShowModal(true)}>
        <ContainerInputFake
          padding="NONE_MD"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Container.Horizontal style={{}}>
            <Typography color={selected ? "DEFAULT" : "DEFAULT_200"}>
              {selected?.label || placeholder}
            </Typography>
          </Container.Horizontal>
          <Container.Vertical>
            <Icon name="ChevronDown" size="XS" />
          </Container.Vertical>
        </ContainerInputFake>
      </Clickable>

      <FormSheet
        options={options}
        onClose={() => setShowModal(false)}
        visible={showModal}
        placeholder={placeholder}
        onSelect={(item) => {
          setSelected(item);
        }}
      />
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
