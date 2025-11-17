import { Container } from "@mobilestock-native/container";
import { Img } from "@mobilestock-native/image";
import { memo } from "react";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useTheme } from "styled-components/native";
import { DragControll } from "./components/DragControll";
import { Trash } from "./components/Trash";
import { useFileInput } from "../../../hooks/useFile";

function ImageCardControllComponent({
  item,
  drag,
  isActive,
}: RenderItemParams<any>) {
  const FileInput = useFileInput();
  const Theme = useTheme();

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
      <Img src={{ uri: item.uri }} alt="image" size="SM" />
      {FileInput.dragAndDrop && (
        <DragControll drag={drag} isActive={isActive} />
      )}
    </Container.Vertical>
  );
}

export const ImageCardControll = memo(ImageCardControllComponent);
