import { Button } from "@mobilestock-native/button";

import * as DocumentPicker from "expo-document-picker";
import { useFileInput } from "../../../../hooks/useFile";
import { TypeFiles } from "../../../../enum/TypeFiles";

export function HelpButton() {
  const FileInput = useFileInput();

  async function handleSelectFile() {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: [
        FileInput.accept.map((type) => TypeFiles[type]) as unknown as string,
      ],
    });

    if (!result.assets) {
      return;
    }

    const files = result.assets
      .map((asset) => asset.file)
      .filter(Boolean) as File[];

    if (!files) {
      return;
    }

    FileInput.handleSaveFiles(files);
  }

  return (
    <Button text="Selecionar arquivo" size="XS" onPress={handleSelectFile} />
  );
}
