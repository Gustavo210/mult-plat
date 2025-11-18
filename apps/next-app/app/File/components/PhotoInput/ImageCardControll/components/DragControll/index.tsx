import { Container } from "@mobilestockweb/container";
import { Bar } from "../Bar";
import { useSortable } from "@dnd-kit/sortable";
import { useTheme } from "styled-components";

export function DragControll({ id }: { id: string }) {
  const Theme = useTheme();
  const { listeners, attributes } = useSortable({ id });
  return (
    <Container.Horizontal
      style={{
        position: "absolute",
        width: Theme.sizeImage.sm,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        padding: 4,
        bottom: 0,
      }}
      align="CENTER"
      {...listeners}
      {...attributes}
    >
      <Bar id={id} />
    </Container.Horizontal>
  );
}
