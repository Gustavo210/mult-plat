import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { File } from "../../components/File";
import { Spacer } from "@mobilestock-native/spacer";
import {
  EventOnChangeCropSave,
  EventOnChangeRemoveFile,
} from "../../components/File/hooks/useFile";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota Web para file-input</Typography>
      <File.PhotoInput
        onChange={(event: EventOnChangeCropSave) => {
          event;
        }}
        multiple
      />
      <Spacer size="2XL" />
      <File.MultipleArchive
        accept="jpg, png, gif"
        onChange={(event: EventOnChangeRemoveFile) => {
          event;
        }}
      />
    </Container.Vertical>
  );
}
