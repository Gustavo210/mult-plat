import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Container } from "@mobilestockweb/container";
import { Icon } from "@mobilestockweb/icons";
import { Typography } from "@mobilestockweb/typography";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  return (
    <Container.Vertical
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 0,
        width: "100px",
        height: "100px",
        border: "1px solid #cecece",
        userSelect: "none",
        backgroundColor: "white",
      }}
      align="START_CENTER"
    >
      <Container.Vertical full padding="SM">
        <Typography>{props.id}</Typography>
      </Container.Vertical>
      <div
        {...listeners}
        {...attributes}
        style={{
          height: "5px",
          width: "50%",
          marginBottom: "5px",
          cursor: "grab",
          backgroundColor: "#cecece",
        }}
      />
    </Container.Vertical>
  );
}
