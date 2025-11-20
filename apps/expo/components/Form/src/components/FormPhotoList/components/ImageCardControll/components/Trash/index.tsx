import { Icon } from "@mobilestock-native/icons";
import { Pressable } from "react-native";
import { usePhotoList } from "../../../../hooks/usePhotoList";

export function Trash({ photo }: { photo: File }) {
  const Photo = usePhotoList();
  return (
    <Pressable
      onPress={() => Photo.removeImage(`${photo.name}-${photo.size}`)}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        borderBottomLeftRadius: 4,
        backgroundColor: "red",
      }}
    >
      <Icon name="X" size="XS" color="#fff" />
    </Pressable>
  );
}
