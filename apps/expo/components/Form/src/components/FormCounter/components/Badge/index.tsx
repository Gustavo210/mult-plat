import { Badge as BadgeRaw } from "@mobilestock-native/badge";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

export function Badge(props: { text: string; renderInsideThePill?: boolean }) {
  const { groupElements } = useCounter();
  // o badge tem um margin bottom padrao de 2px tem que ser removido
  return (
    <Slot>
      {groupElements && props.renderInsideThePill ? (
        <Container.Vertical
          style={{
            backgroundColor: "black",
            flex: 1,
            width: "100%",
          }}
          align="CENTER"
        >
          <Typography color="CONTRAST">{props.text}</Typography>
        </Container.Vertical>
      ) : (
        <BadgeRaw text={props.text} size="XS" />
      )}
    </Slot>
  );
}
Badge.displayName = "Form.FormCounter.Badge";
