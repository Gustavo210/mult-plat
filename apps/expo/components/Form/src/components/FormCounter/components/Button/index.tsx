import { ButtonProps, Button as ButtonRaw } from "@mobilestock-native/button";
import { useMemo } from "react";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

type ButtonType = "PLUS" | "MINUS";

export interface TypeButton extends Pick<ButtonProps, "disabled" | "text"> {
  type: ButtonType;
  disabled?: boolean;
}

export function Button(props: TypeButton) {
  const Counter = useCounter();

  const disabledPress = useMemo(() => {
    if (props.type === "PLUS" && Counter.maxCount !== undefined) {
      return Counter.count >= Counter.maxCount;
    }
    if (props.type === "MINUS" && Counter.minCount !== undefined) {
      return Counter.count <= Counter.minCount;
    }
    return false;
  }, [props.type, Counter.count, Counter.maxCount, Counter.minCount]);

  function handlePress() {
    if (props.type === "PLUS") {
      Counter.increment();
    } else {
      Counter.decrement();
    }
  }

  function handleLongPress() {
    if (props.type === "PLUS") {
      Counter.increment(10);
    } else {
      Counter.decrement(10);
    }
  }

  return (
    <Slot>
      <ButtonRaw
        size="SM"
        variant={Counter.variant === "NAKED" ? "TRANSPARENT" : "DEFAULT"}
        icon={props.type === "PLUS" ? "Plus" : "Minus"}
        style={
          Counter.variant === "GROUPED"
            ? {
                borderRadius: 0,
              }
            : undefined
        }
        {...props}
        backgroundColor={props.type === "PLUS" ? "DEFAULT_DARK" : "CANCEL_DARK"}
        disabled={disabledPress || props.disabled}
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
    </Slot>
  );
}
