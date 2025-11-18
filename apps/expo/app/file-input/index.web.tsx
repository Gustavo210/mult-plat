import { Container } from "@mobilestock-native/container";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota Web para file-input</Typography>
      <File.PhotoInput onChange={console.log} multiple={false} dragAndDrop />
      <Spacer size="2XL" />
      <File.MultipleArchive accept="jpg|png|gif|json" onChange={console.log} />
    </Container.Vertical>
  );
}
