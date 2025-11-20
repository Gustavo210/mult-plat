import { Container } from "@mobilestock-native/container";
import { useCallback, useMemo } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { usePhotoList } from "../../hooks/usePhotoList";
import { AddButton } from "../AddButton";
import { ImageCardControl } from "../ImageCardControl";
import { CropDemo } from "../WebCrop";

interface ImageViewerProps {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
}
export function Viewer({
  numberOfImagesVisible = 0,
  buttonAddDirection = "left",
}: ImageViewerProps) {
  const screenDimensions = useWindowDimensions();
  const PhotoList = usePhotoList();

  const handleDragEnd = useCallback(
    (dragEndResult: DragEndParams<File>) => {
      PhotoList.reorderImages(dragEndResult.data);
    },
    [PhotoList]
  );

  const maxWidth = useMemo(() => {
    if (!!numberOfImagesVisible) {
      return (
        PhotoList.sizeComponent * numberOfImagesVisible +
        PhotoList.gapComponent * (numberOfImagesVisible - 1)
      );
    }

    return (
      screenDimensions.width - PhotoList.sizeComponent - PhotoList.gapComponent
    );
  }, [
    numberOfImagesVisible,
    screenDimensions.width,
    PhotoList.sizeComponent,
    PhotoList.gapComponent,
  ]);

  return (
    <>
      <Container.Horizontal gap="2XS">
        {buttonAddDirection === "left" && <AddButton />}
        {PhotoList.images && (
          <Container.Horizontal full>
            <DraggableFlatList
              data={PhotoList.images}
              keyExtractor={(item) => `${item.name}-${item.size}`}
              horizontal
              onDragEnd={handleDragEnd}
              activationDistance={10}
              style={{
                maxWidth,
              }}
              ItemSeparatorComponent={() => (
                <View style={{ width: PhotoList.gapComponent }} />
              )}
              renderItem={(item) => <ImageCardControl {...item} />}
            />
          </Container.Horizontal>
        )}
        {buttonAddDirection === "right" && <AddButton />}
      </Container.Horizontal>
      {Platform.OS === "web" && <CropDemo />}
    </>
  );
}
