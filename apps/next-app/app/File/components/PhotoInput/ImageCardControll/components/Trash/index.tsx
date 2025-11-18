import { Icon } from "@mobilestockweb/icons";

export function Trash() {
  return (
    <button
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        borderBottomLeftRadius: 4,
        backgroundColor: "red",
        border: "none",
      }}
    >
      <Icon name="X" size="XS" color="#fff" />
    </button>
  );
}
