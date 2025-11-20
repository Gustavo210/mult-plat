import { Clickable } from "@mobilestock-native/clickable";
import { Icon } from "@mobilestock-native/icons";
import { utils } from "../../../../../../utils";
import { usePhotoList } from "../../../../hooks/usePhotoList";

export function Trash({ photo }: { photo: File }) {
  const PhotoList = usePhotoList();

  function handleClick() {
    PhotoList.removeImage(utils.getHashFile(photo));
  }

  return (
    <Clickable
      onPress={handleClick}
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
