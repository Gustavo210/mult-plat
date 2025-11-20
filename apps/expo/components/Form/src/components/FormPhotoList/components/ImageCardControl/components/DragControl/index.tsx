import { Clickable } from "@mobilestock-native/clickable";
import { Bar } from "../Bar";

export function DragControl({
  drag,
  isActive,
}: {
  drag: () => void;
  isActive: boolean;
}) {
  return (
    <Clickable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 4,
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }}
      onLongPress={drag}
      onTouchMove={drag}
      onTouchStart={drag}
      onPressIn={drag}
    >
      <Bar isActive={isActive} />
    </Clickable>
  );
}
