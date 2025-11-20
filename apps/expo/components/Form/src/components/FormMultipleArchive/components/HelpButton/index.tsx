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
      type: MultipleArchive.accept?.map(
        (type) => TypeFiles[type]
      ) as unknown as string,
    });

    if (!result.assets) {
      return;
    }

    if (Platform.OS === "android") {
      MultipleArchive.handleSaveFiles(
        result.assets.map(
          (asset) =>
            ({
              uri: asset.uri,
              name: asset.name,
              type: asset.mimeType,
            } as unknown as File)
        )
      );
      return;
    }

    const files = result.assets
      .map((asset) => asset.file)
      .filter((file) => !!file);

    if (!files) {
      return;
    }

    MultipleArchive.handleSaveFiles(files);
  }

  return (
    <Button text="Selecionar arquivo" size="XS" onPress={handleSelectFile} />
  );
}
