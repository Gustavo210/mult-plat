import { Badge as BadgeRaw } from "@mobilestock-native/badge";

export function Badge(props: React.ComponentProps<typeof BadgeRaw>) {
  return <BadgeRaw {...props} size="XS" />;
}
