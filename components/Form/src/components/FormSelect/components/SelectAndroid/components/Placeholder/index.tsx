import { Typography } from "@mobilestock-native/typography";

export function Placeholder({ text }: { text: string }) {
  return (
    <Typography size="MD" align="RIGHT" color="DEFAULT_100">
      {text}
    </Typography>
  );
}
