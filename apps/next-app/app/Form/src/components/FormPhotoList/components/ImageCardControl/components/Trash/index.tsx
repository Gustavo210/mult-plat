import { Icon } from "@mobilestockweb/icons";
import { usePhotoList } from "../../../../hooks/usePhotoList";

export function Trash({ id }: { id: string }) {
  const PhotoList = usePhotoList();
  function handleClick() {
    PhotoList.removeImage(id);
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
