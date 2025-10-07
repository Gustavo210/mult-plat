import { ButtonProps, Button as ButtonRaw } from "@mobilestock-native/button";
import { useMemo } from "react";
import styled, { css } from "styled-components/native";
import { useCounter } from "../../hooks/useCount";
export function Button(props: ButtonProps & { type: "PLUS" | "MINUS" }) {
  const { increment, decrement, maxCount, minCount, count, variant } =
    useCounter();

  const disabledPress = useMemo(() => {
    if (props.type === "PLUS" && maxCount !== undefined) {
      return count >= maxCount;
    }
    if (props.type === "MINUS" && minCount !== undefined) {
      return count <= minCount;
    }
    return false;
  }, [props.type, count, maxCount, minCount]);

  function handlePress() {
    if (props.type === "PLUS") {
      increment();
    } else {
      decrement();
    }
  }

  function handleLongPress() {
    if (props.type === "PLUS") {
      increment(10);
    } else {
      decrement(10);
    }
  }

  return (
    <Teste
      size="SM"
      variant={variant === "NAKED" ? "TRANSPARENT" : "DEFAULT"}
      $variant={variant}
      icon={props.type === "PLUS" ? "Plus" : "Minus"}
      {...props}
      backgroundColor={props.type === "PLUS" ? "DEFAULT_DARK" : "CANCEL_DARK"}
      disabled={disabledPress || props.disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
    />
  );
}

const Teste = styled(ButtonRaw)<{
  $variant?: "GROUPED" | "NAKED" | "DEFAULT";
}>`
  ${(props) =>
    props.$variant === "GROUPED" &&
    css`
      border-radius: 0px;
    `}
`;
