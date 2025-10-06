import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Counter } from "../../components/Counter";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota para counter</Typography>
      <Counter />
      <Counter variant="editable" />
    </Container.Vertical>
  );
}
