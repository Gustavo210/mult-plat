import { Container } from "@mobilestockweb/container";
import { memo, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTheme } from "styled-components";
import { DragControll } from "./components/DragControll";
import { Trash } from "./components/Trash";
function ImageCardControllComponent({ file }: { file: File }) {
  const Theme = useTheme();
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${file.name}-${file.size}`,
  });

  const uri = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Container.Horizontal
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 0,
        border: "1px solid #cecece",
        userSelect: "none",
        width: Theme.sizeImage.sm,
        minWidth: Theme.sizeImage.sm,
        maxWidth: Theme.sizeImage.sm,
        height: Theme.sizeImage.sm,
        flexShrink: 0,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
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
      <DragControll id={`${file.name}-${file.size}`} />
    </Container.Horizontal>
  );
}

export const ImageCardControll = memo(ImageCardControllComponent);
