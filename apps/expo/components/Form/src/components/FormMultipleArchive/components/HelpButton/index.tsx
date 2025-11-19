import * as DocumentPicker from "expo-document-picker";

import { Button } from "@mobilestock-native/button";

import { Platform } from "react-native";
import { TypeFiles } from "../../enum/TypeFiles";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function HelpButton() {
  const MultipleArchive = useMultipleArchive();

  async function handleSelectFile() {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
      type: MultipleArchive.accept?.map(
        (type) => TypeFiles[type]
      ) as unknown as string,
    });

    if (!result.assets) {
      return;
    }

    if (Platform.OS === "android") {
      MultipleArchive.handleSaveFiles(files);
      return;
    }

    const files = result.assets
      .map((asset) => asset.file)
      .filter((file): file is File => !!file);

    if (!files) {
      return;
    }

    MultipleArchive.handleSaveFiles(files);
  }

  function convertToFile(
    fileUri: string,
    fileName: string,
    fileType: string
  ): Promise<File> {
    return fetch(fileUri)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new File([blob], fileName, {
            type: fileType,
          })
      );
  }

  return (
    <Button text="Selecionar arquivo" size="XS" onPress={handleSelectFile} />
  );
}
