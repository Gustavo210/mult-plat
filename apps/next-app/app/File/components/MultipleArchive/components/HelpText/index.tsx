import { Typography } from "@mobilestockweb/typography";
import { useFileInput } from "../../../../hooks/useFile";

export function HelpText() {
  const FileInput = useFileInput();
  return (
    <>
      <Typography size="XS">Arquivos suportados</Typography>
      <Typography size="XS">( {FileInput.accept?.join(", ")} )</Typography>
    </>
  );
}
