import { Clickable } from "@mobilestock-native/clickable";
import { Icon } from "@mobilestock-native/icons";
import { utils } from "../../../../../../utils";
import { usePhotoList } from "../../../../hooks/usePhotoList";

export function Trash({ photo }: { photo: File }) {
  const Photo = usePhotoList();
  return (
    <Clickable
      onPress={() => Photo.removeImage(utils.getHashFile(photo))}
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
    </Clickable>
  );
}
