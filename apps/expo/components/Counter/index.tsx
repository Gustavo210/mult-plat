import { Button } from "@mobilestock-native/button";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { useState } from "react";
import styled from "styled-components/native";

export function Counter({
  variant = "read-only",
}: {
  variant?: "editable" | "read-only" | "grouped";
}) {
  const [count, setCount] = useState(0);
  return (
    <Container.Horizontal
      align="CENTER"
      gap="XS"
      style={{ userSelect: "none" }}
    >
      <Button
        size="SM"
        icon="Minus"
        onPress={() => setCount(count - 1)}
        onLongPress={() => setCount(count - 10)}
      />
      <Container.Vertical
        style={{ minWidth: 40, userSelect: "none" }}
        align="CENTER"
      >
        {variant === "editable" ? (
          <Input
            value={String(count)}
            onChangeText={(text) => {
              const parsed = parseInt(text, 10);
              if (!isNaN(parsed)) {
                setCount(parsed);
              } else {
                setCount(0);
              }
            }}
            keyboardType="decimal-pad"
          />
        ) : null}
        {variant === "read-only" ? <Typography>{count}</Typography> : null}
      </Container.Vertical>
      <Button
        size="SM"
        icon="Plus"
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(count + 10)}
      />
    </Container.Horizontal>
  );
}
const Input = styled.TextInput`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid gray;
  width: 100%;
  text-align: center;
`;
