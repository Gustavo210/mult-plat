import { Container } from "@mobilestockweb/container";
import { memo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTheme } from "styled-components";
import { Img } from "@mobilestockweb/image";
import { DragControll } from "./components/DragControll";
import { Trash } from "./components/Trash";
function ImageCardControllComponent({ id }: { id: string }) {
  const Theme = useTheme();
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

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
      <Trash />
      <Img
        size="SM"
        alt="image"
        borderRadius="NONE"
        src="https://images.unsplash.com/photo-1742201876600-fbb37a2ff6ca?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <DragControll id={id} />
    </Container.Horizontal>
  );
}

export const ImageCardControll = memo(ImageCardControllComponent);
