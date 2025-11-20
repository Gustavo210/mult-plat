import { Container } from "@mobilestock-native/container";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { useTheme } from "styled-components/native";
import { usePhotoList } from "../../hooks/usePhotoList";
import { AddButton } from "../AddButton";
import { ImageCardControll } from "../ImageCardControll";
import { CropDemo } from "../WebCrop";

interface ImageViewerProps {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
}
export function Viewer({
  numberOfImagesVisible = 0,
  buttonAddDirection = "left",
}: ImageViewerProps) {
  const tamanhoDaTela = useWindowDimensions();
  const File = usePhotoList();
  const Theme = useTheme();
  const [list, setList] = useState(File.images || []);

  const gapSize = useMemo(() => parseInt(Theme.gaps["2xs"]), [Theme.gaps]);
  const imageSize = useMemo(
    () => parseInt(Theme.sizeImage.sm),
    [Theme.sizeImage]
  );

  useEffect(() => {
    setList(File.images || []);
  }, [File.images]);

  const handleDragEnd = useCallback(
    (dragEndResult: DragEndParams<File>) => {
      File.reorderImages(dragEndResult.data);
    },
    [File]
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

  console.log("RENDER VIEWER", list);
  return (
    <>
      <Container.Horizontal gap="2XS">
        {buttonAddDirection === "left" && <AddButton />}
        {list && (
          <Container.Horizontal full>
            <DraggableFlatList
              data={list}
              keyExtractor={(item) => `${item.name}-${item.size}`}
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
        {buttonAddDirection === "right" && <AddButton />}
      </Container.Horizontal>
      {Platform.OS === "web" && <CropDemo />}
    </>
  );
}
