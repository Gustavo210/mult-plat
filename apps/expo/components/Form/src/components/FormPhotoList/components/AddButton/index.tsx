import { Button } from "@mobilestock-native/button";
import { useTheme } from "styled-components/native";
import { usePhotoList } from "../../hooks/usePhotoList";

export function AddButton() {
  const Photo = usePhotoList();
  const Theme = useTheme();
  return (
    <Button
      icon="Plus"
      variant="OUTLINE"
      onPress={Photo.showDeviceImage}
      style={{
        height: parseInt(Theme.sizeImage.sm),
        width: parseInt(Theme.sizeImage.sm),
      }}
    />
  );
}
