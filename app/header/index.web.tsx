import { Button } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";
import { useRouter } from "expo-router";

export default function IndexWeb() {
  const Router = useRouter();

  return (
    <Container.Vertical>
      <Typography>Rota Web para header</Typography>
      <Button
        text="Navegar para pagina de teste"
        onClick={() => Router.push("/test-page")}
      />
    </Container.Vertical>
  );
}
