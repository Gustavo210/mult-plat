import { Container } from "@mobilestock-native/container";
import { Img } from "@mobilestock-native/image";
import { memo, useMemo } from "react";
import { Platform } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { usePhotoList } from "../../hooks/usePhotoList";
import { DragControl } from "./components/DragControl";
import { Trash } from "./components/Trash";

function ImageCardControlComponent({
  item,
  drag,
  isActive,
}: RenderItemParams<any>) {
  const PhotoList = usePhotoList();

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
          width: PhotoList.sizeComponent,
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
      {PhotoList.dragAndDrop && <DragControl drag={drag} isActive={isActive} />}
    </Container.Vertical>
  );
}

export const ImageCardControl = memo(ImageCardControlComponent);
