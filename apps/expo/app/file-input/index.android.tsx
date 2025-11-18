import { Container } from "@mobilestock-native/container";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota android para file-input</Typography>
      <File.PhotoInput multiple={false} dragAndDrop />
      <Spacer size="2XL" />
      <File.MultipleArchive accept={["jpeg", "png"]} />
    </Container.Vertical>
  );
}
