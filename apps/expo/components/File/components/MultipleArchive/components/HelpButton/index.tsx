import { Button } from "@mobilestock-native/button";

import * as DocumentPicker from "expo-document-picker";
import { useFileInput } from "../../../../hooks/useFile";
export function HelpButton() {
  const FileInput = useFileInput();
  async function handleSelectFile() {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });
    if (!result.assets) {
      return;
    }
    FileInput.handleSaveFiles(result.assets);
  }
  return (
    <Button text="Selecionar arquivo" size="XS" onPress={handleSelectFile} />
  );
}
