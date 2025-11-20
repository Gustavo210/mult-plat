import { Button } from "@mobilestockweb/button";

import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function HelpButton() {
  const MultipleArchive = useMultipleArchive();

  return (
    <Button
      text="Selecionar arquivo"
      size="XS"
      onClick={MultipleArchive.handleSelectFile}
    />
  );
}
