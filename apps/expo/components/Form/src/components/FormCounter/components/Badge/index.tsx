import { Badge as BadgeRaw } from "@mobilestock-native/badge";
import { Slot } from "../Slot";

export function Badge(props: React.ComponentProps<typeof BadgeRaw>) {
  // o badge tem um margin bottom padrao de 2px tem que ser removido
  return (
    <Slot>
      <BadgeRaw {...props} size="XS" />
    </Slot>
  );
}
Badge.displayName = "Form.FormCounter.Badge";
