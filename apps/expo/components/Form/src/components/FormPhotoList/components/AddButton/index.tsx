import { Button } from "@mobilestock-native/button";
import { usePhotoList } from "../../hooks/usePhotoList";

export function AddButton() {
  const PhotoList = usePhotoList();

  return (
    <Button
      icon="Plus"
      variant="OUTLINE"
      onPress={PhotoList.showDeviceImage}
      style={{
        height: PhotoList.sizeComponent,
        width: PhotoList.sizeComponent,
      }}
    />
  );
}
