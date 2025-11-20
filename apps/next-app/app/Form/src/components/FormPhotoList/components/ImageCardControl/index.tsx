import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Container } from "@mobilestockweb/container";
import { memo, useMemo } from "react";
import { usePhotoList } from "../../hooks/usePhotoList";
import { DragControl } from "./components/DragControl";
import { Trash } from "./components/Trash";

function ImageCardControlComponent({ file }: { file: File }) {
  const PhotoList = usePhotoList();

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${file.name}-${file.size}`,
  });

  const uri = useMemo(() => URL.createObjectURL(file), [file]);
  return (
    <Container.Vertical
      ref={setNodeRef}
      align="CENTER"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 0,
        border: "1px solid #cecece",
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
        ...(isDragging && {
          borderColor: "#f9e30f",
        }),
      }}
    >
      <Trash id={`${file.name}-${file.size}`} />
      <img
        alt="image"
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        src={uri}
      />
      {PhotoList.dragAndDrop && (
        <DragControl id={`${file.name}-${file.size}`} />
      )}
    </Container.Vertical>
  );
}

export const ImageCardControl = memo(ImageCardControlComponent);
