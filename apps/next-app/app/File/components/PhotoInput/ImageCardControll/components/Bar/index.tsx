import { useSortable } from "@dnd-kit/sortable";

export function Bar({ id }: { id: string }) {
  const { isDragging } = useSortable({ id });
  return (
    <div
      style={{
        height: 5,
        width: "90%",

        backgroundColor: "#222",
        ...(isDragging && { backgroundColor: "#f9e30f" }),
      }}
    />
  );
}
