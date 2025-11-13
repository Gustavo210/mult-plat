import { Container } from "@mobilestock-native/container";
import { useFile } from "../../hooks/useFile";
import { Img } from "@mobilestock-native/image";
import * as ImagePicker from "expo-image-picker";
import { Dimensions, Image, Modal, View, ViewStyle } from "react-native";
import { ImageAdd } from "../ImageAdd";
import { useTheme } from "styled-components/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ImageCardControll } from "../ImageCardControll";

const NUMBER_OF_IMAGES_VISIBLE = null;

export function ImageViewer({
  numberOfImagesVisible = NUMBER_OF_IMAGES_VISIBLE,
  buttonAddDirection = "left",
}: {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
}) {
  const File = useFile();
  const Theme = useTheme();
  const [list, setList] = useState(File.images || []);
  useEffect(() => {
    setList(File.images || []);
  }, [File.images]);
  const handleDragEnd = useCallback(
    (dragEndResult: { data: ImagePicker.ImagePickerAsset[] }) => {
      const reorderedItemList = dragEndResult.data;
      File.reorderImages(reorderedItemList);
    },
    [],
  );

  const definedMaxWidth = useMemo((): ViewStyle => {
    if (!!numberOfImagesVisible) {
      return {
        maxWidth:
          parseInt(Theme.sizeImage.sm) * numberOfImagesVisible +
          parseInt(Theme.gaps["2xs"]) * (numberOfImagesVisible - 1),
      };
    }
    return {
      maxWidth: Dimensions.get("window").width,
    };
  }, [numberOfImagesVisible, Theme.gaps, Theme.sizeImage]);

  return (
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
            style={[definedMaxWidth]}
            ItemSeparatorComponent={() => (
              <View style={{ width: parseInt(Theme.gaps["2xs"]) }} />
            )}
            ListFooterComponent={
              !numberOfImagesVisible ? (
                <View
                  style={{
                    width:
                      parseInt(Theme.sizeImage.sm) +
                      parseInt(Theme.gaps["2xs"]) * 4,
                  }}
                />
              ) : undefined
            }
            renderItem={(item) => <ImageCardControll {...item} />}
          />
        </Container.Horizontal>
      )}
      {buttonAddDirection === "right" && <ImageAdd />}
    </Container.Horizontal>
  );
}
