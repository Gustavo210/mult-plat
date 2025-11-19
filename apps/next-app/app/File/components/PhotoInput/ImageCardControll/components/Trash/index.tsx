import { useFileInput } from "@/app/File/hooks/useFile";
import { Icon } from "@mobilestockweb/icons";

export function Trash({ id }: { id: string }) {
  const FileInput = useFileInput();
  function handleClick() {
    FileInput.handleRemoveImage(id);
  }
  return (
    <button
      onClick={handleClick}
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
