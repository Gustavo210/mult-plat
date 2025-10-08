import { Typography } from "@mobilestock-native/typography";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

export function Display() {
  const { count } = useCounter();
  return (
    <Slot>
      <Typography weight="BOLD" size="LG">
        {count}
      </Typography>
    </Slot>
  );
}

Display.displayName = "FormCounter.Display";
