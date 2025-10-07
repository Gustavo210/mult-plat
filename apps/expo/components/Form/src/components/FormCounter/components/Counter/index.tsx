import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { useCounter } from "../../hooks/useCount";

export function Counter() {
  const { count } = useCounter();
  return (
    <Container.Vertical
      style={{ minWidth: 40, userSelect: "none" }}
      align="CENTER"
    >
      <Typography weight="BOLD" size="LG">
        {count}
      </Typography>
    </Container.Vertical>
  );
}
