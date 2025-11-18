import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";
import { memo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
function ImageCardControllComponent() {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: "image-card-controll",
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  return (
    <Container.Vertical
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Typography>Teste</Typography>
    </Container.Vertical>
  );
}

export const ImageCardControll = memo(ImageCardControllComponent);
