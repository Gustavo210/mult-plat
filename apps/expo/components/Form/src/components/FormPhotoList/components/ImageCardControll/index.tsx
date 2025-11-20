import { Container } from "@mobilestock-native/container";
import { Img } from "@mobilestock-native/image";
import { memo, useMemo } from "react";
import { Platform } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useTheme } from "styled-components/native";
import { usePhotoList } from "../../hooks/usePhotoList";
import { DragControll } from "./components/DragControll";
import { Trash } from "./components/Trash";

function ImageCardControllComponent({
  item,
  drag,
  isActive,
}: RenderItemParams<any>) {
  const FileInput = usePhotoList();
  const Theme = useTheme();

  const uri = useMemo(
    () => (Platform.OS === "web" ? URL.createObjectURL(item) : item.uri),
    [item]
  );
  return (
    <Container.Vertical
      align="CENTER"
      style={[
        {
          backgroundColor: "#ffffff",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 8,
          width: parseInt(Theme.sizeImage.sm),
          borderWidth: 1,
          position: "relative",
          borderColor: "#e0e0e0",
        },
        isActive && {
          borderColor: "#f9e30f",
        },
      ]}
    >
      <Trash photo={item} />
      <Img src={{ uri }} alt="image" size="SM" />
      {FileInput.dragAndDrop && (
        <DragControll drag={drag} isActive={isActive} />
      )}
    </Container.Vertical>
  );
}

export const ImageCardControll = memo(ImageCardControllComponent);
