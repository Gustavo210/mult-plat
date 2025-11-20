import { Typography } from "@mobilestockweb/typography";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function HelpText() {
  const MultipleArchive = useMultipleArchive();
  return (
    <>
      <Typography size="XS">Arquivos suportados</Typography>
      <Typography size="XS">
        ( {MultipleArchive.accept?.join(", ")} )
      </Typography>
    </>
  );
}
