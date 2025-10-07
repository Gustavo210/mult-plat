import { Badge as BadgeRaw } from "@mobilestock-native/badge";

export function Badge(props: React.ComponentProps<typeof BadgeRaw>) {
  // o badge tem um margin bottom padrao de 2px tem que ser removido
  return <BadgeRaw {...props} size="LG" />;
}
Badge.displayName = "FormCounter.Badge";
