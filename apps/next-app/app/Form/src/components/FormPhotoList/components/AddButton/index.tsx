import { Button } from "@mobilestockweb/button";
import { usePhotoList } from "../../hooks/usePhotoList";

export function AddButton() {
  const PhotoList = usePhotoList();

  return (
    <Button
      icon="Plus"
      variant="OUTLINE"
      onClick={PhotoList.showDeviceImage}
      style={{
        height: PhotoList.sizeComponent,
        width: PhotoList.sizeComponent,
        minWidth: PhotoList.sizeComponent,
        maxWidth: PhotoList.sizeComponent,
      }}
    />
  );
}
