import { ButtonProps, Button as ButtonRaw } from "@mobilestockweb/button";
import { useMemo } from "react";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

type ButtonType = "PLUS" | "MINUS";

export interface TypeButton
  extends Pick<ButtonProps, "disabled" | "text" | "size"> {
  type: ButtonType;
  disabled?: boolean;
}

export function Button({ type, disabled, ...props }: TypeButton) {
  const Counter = useCounter();

  const disabledPress = useMemo(() => {
    if (type === "PLUS" && Counter.maxCount !== undefined) {
      return Counter.count >= Counter.maxCount;
    }
    if (type === "MINUS" && Counter.minCount !== undefined) {
      return Counter.count <= Counter.minCount;
    }
    return false;
  }, [type, Counter.count, Counter.maxCount, Counter.minCount]);

  function handlePress() {
    if (type === "PLUS") {
      Counter.increment();
    } else {
      Counter.decrement();
    }
  }

  return (
    <Slot>
      <ButtonRaw
        type="button"
        size="SM"
        icon={type === "PLUS" ? "Plus" : "Minus"}
        {...props}
        variant={Counter.buttonTransparent ? "TRANSPARENT" : "DEFAULT"}
        style={
          Counter.groupElements
            ? {
                borderRadius: 0,
              }
            : undefined
        }
        backgroundColor={type === "PLUS" ? "DEFAULT_DARK" : "CANCEL_DARK"}
        disabled={disabledPress || disabled}
        onClick={handlePress}
      />
    </Slot>
  );
}
