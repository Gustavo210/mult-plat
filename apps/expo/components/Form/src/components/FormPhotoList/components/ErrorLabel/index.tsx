import { Typography } from "@mobilestock-native/typography";
import { useField } from "@unform/core";
import { usePhotoList } from "../../hooks/usePhotoList";

export function ErrorLabel() {
  const PhotoList = usePhotoList();
  const { error } = useField(PhotoList.name);
  return (
    <Typography color="DANGER" size="XS">
      {error}
    </Typography>
  );
}
