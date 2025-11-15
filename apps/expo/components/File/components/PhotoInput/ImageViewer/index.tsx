import { Container } from "@mobilestock-native/container";
import { useFileInput } from "../../../hooks/useFile";
import { Platform, useWindowDimensions, View } from "react-native";
import { ImageAdd } from "../ImageAdd";
import { useTheme } from "styled-components/native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ImageCardControll } from "../ImageCardControll";
import { ImagePickerAsset } from "expo-image-picker";
import { CropDemo } from "../../WebCrop";

interface ImageViewerProps {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
}
export function ImageViewer({
  numberOfImagesVisible = 0,
  buttonAddDirection = "left",
}: ImageViewerProps) {
  const tamanhoDaTela = useWindowDimensions();
  const File = useFileInput();
  const Theme = useTheme();
  const [list, setList] = useState(File.images || []);

  const gapSize = useMemo(() => parseInt(Theme.gaps["2xs"]), [Theme.gaps]);
  const imageSize = useMemo(
    () => parseInt(Theme.sizeImage.sm),
    [Theme.sizeImage],
  );

  useEffect(() => {
    setList(File.images || []);
  }, [File.images]);

  const handleDragEnd = useCallback(
    (dragEndResult: DragEndParams<ImagePickerAsset>) => {
      File.reorderImages(dragEndResult.data);
    },
    [File],
  );

  const maxWidth = useMemo(() => {
    if (!!numberOfImagesVisible) {
      return (
        imageSize * numberOfImagesVisible +
        gapSize * (numberOfImagesVisible - 1)
      );
    }

    return tamanhoDaTela.width - imageSize - gapSize;
  }, [numberOfImagesVisible, tamanhoDaTela.width, imageSize, gapSize]);

  return (
    <>
      <Container.Horizontal gap="2XS">
        {buttonAddDirection === "left" && <ImageAdd />}
        {list && (
          <Container.Horizontal full>
            <DraggableFlatList
              data={list}
              keyExtractor={(item) => item.uri}
              horizontal
              onDragEnd={handleDragEnd}
              activationDistance={10}
              style={{
                maxWidth,
              }}
              ItemSeparatorComponent={() => <View style={{ width: gapSize }} />}
              renderItem={(item) => <ImageCardControll {...item} />}
            />
          </Container.Horizontal>
        )}
        {buttonAddDirection === "right" && <ImageAdd />}
      </Container.Horizontal>
      {Platform.OS === "web" && <CropDemo />}
    </>
  );
}
