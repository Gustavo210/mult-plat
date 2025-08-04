import { Button } from "@mobilestock-native/button";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { useRouter } from "expo-router";

export default function IndexAndroid() {
  const Router = useRouter();
  return (
    <Container.Vertical>
      <Typography>Rota Android para header</Typography>
      <Button
        text="Navegar para pagina de teste"
        onPress={() => Router.push("/test-page")}
      />
    </Container.Vertical>
  );
}
