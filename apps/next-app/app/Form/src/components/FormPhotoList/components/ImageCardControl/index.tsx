import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Container } from "@mobilestockweb/container";
import { memo, useMemo } from "react";
import { utils } from "../../../../utils";
import { usePhotoList } from "../../hooks/usePhotoList";
import { DragControl } from "./components/DragControl";
import { Trash } from "./components/Trash";

function ImageCardControlComponent({ file }: { file: File }) {
  const PhotoList = usePhotoList();

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: utils.getHashFile(file),
  });

  const uri = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Container.Vertical
      ref={setNodeRef}
      align="CENTER"
      style={{
        borderColor: "#cecece",
        borderStyle: "solid",
        borderWidth: 1,
        ...(isDragging && {
          borderColor: "#f9e30f",
        }),
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 0,
        userSelect: "none",
        width: PhotoList.sizeComponent,
        minWidth: PhotoList.sizeComponent,
        maxWidth: PhotoList.sizeComponent,
        height: PhotoList.sizeComponent,
        flexShrink: 0,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Trash id={utils.getHashFile(file)} />
      <img
        alt="image"
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        src={uri}
      />
      {PhotoList.dragAndDrop && <DragControl id={utils.getHashFile(file)} />}
    </Container.Vertical>
  );
}

export const ImageCardControl = memo(ImageCardControlComponent);
