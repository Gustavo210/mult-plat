import { ButtonProps, Button as ButtonRaw } from "@mobilestock-native/button";
import { useMemo } from "react";
import { useCounter } from "../../hooks/useCount";
export function Button(props: ButtonProps & { type: "PLUS" | "MINUS" }) {
  const { increment, decrement, maxCount, minCount, count } = useCounter();

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
    <ButtonRaw
      size="SM"
      variant="TRANSPARENT"
      icon={props.type === "PLUS" ? "Plus" : "Minus"}
      {...props}
      disabled={disabledPress || props.disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
    />
  );
}
