import { Typography } from "@mobilestock-native/typography";

import { useFileInput } from "../../hooks/useMultipleArchive";

export function HelpText() {
  const FileInput = useFileInput();
  return (
    <>
      <Typography size="XS">Arquivos suportados</Typography>
      <Typography size="XS">( {FileInput.accept?.join(", ")} )</Typography>
    </>
  );
}
