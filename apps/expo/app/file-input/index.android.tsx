import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";

export default function IndexAndroid() {
  return (
    <Container.Vertical>
      <Typography>Rota Android para file-input</Typography>

      <File />
    </Container.Vertical>
  );
}
