import { Container } from "@mobilestock-native/container";
import { useCallback, useMemo } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { usePhotoList } from "../../hooks/usePhotoList";
import { AddButton } from "../AddButton";
import { ErrorLabel } from "../ErrorLabel";
import { ImageCardControl } from "../ImageCardControl";
import { Label } from "../Label";
import { CropDemo } from "../WebCrop";

interface ImageViewerProps {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
  label?: string;
  alignLabel?: "END" | "CENTER" | "START";
}
export function Viewer({
  numberOfImagesVisible = 0,
  buttonAddDirection = "left",
  label,
  alignLabel,
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
      {!!label && (
        <Container.Horizontal align={alignLabel || "START"}>
          <Label>{label}</Label>
        </Container.Horizontal>
      )}
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
              renderItem={(item) => (
                <ImageCardControl
                  {...(item as RenderItemParams<File & { uri: string }>)}
                />
              )}
            />
          </Container.Horizontal>
        )}
        {buttonAddDirection === "right" && <AddButton />}
      </Container.Horizontal>
      <ErrorLabel />
      {Platform.OS === "web" && <CropDemo />}
    </>
  );
}
