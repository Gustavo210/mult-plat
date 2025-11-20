import { Typography } from "@mobilestock-native/typography";
import { useField } from "@unform/core";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function ErrorLabel() {
  const MultipleArchive = useMultipleArchive();
  const { error } = useField(MultipleArchive.name);
  return (
    <Typography color="DANGER" size="XS">
      {error}
    </Typography>
  );
}
