import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota Web para file-input</Typography>
      <File />
    </Container.Vertical>
  );
}
