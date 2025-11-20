import { Button } from "@mobilestock-native/button";

import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function HelpButton() {
  const MultipleArchive = useMultipleArchive();

  return (
    <Button
      text="Selecionar arquivo"
      size="XS"
      onPress={MultipleArchive.handleSelectFile}
    />
  );
}
