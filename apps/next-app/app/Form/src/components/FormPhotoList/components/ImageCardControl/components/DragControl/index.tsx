import { useSortable } from "@dnd-kit/sortable";
import { Container } from "@mobilestockweb/container";
import { usePhotoList } from "../../../../hooks/usePhotoList";
import { Bar } from "../Bar";

export function DragControl({ id }: { id: string }) {
  const PhotoList = usePhotoList();
  const { listeners, attributes } = useSortable({ id });
  return (
    <Container.Horizontal
      style={{
        position: "absolute",
        width: PhotoList.sizeComponent,
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
