import { Link, Stack } from "expo-router";

import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container.Vertical>
        <Typography size="MD">This screen does not exist.</Typography>
        <Link href="/">
          <Typography size="MD">Go to home screen!</Typography>
        </Link>
      </Container.Vertical>
    </>
  );
}
