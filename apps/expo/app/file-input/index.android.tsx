import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";
import { Spacer } from "@mobilestock-native/spacer";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota android para file-input</Typography>
      <File.PhotoInput multiple dragAndDrop />
      <Spacer size="2XL" />
      <File.MultipleArchive accept={["jpeg"]} />
    </Container.Vertical>
  );
}
