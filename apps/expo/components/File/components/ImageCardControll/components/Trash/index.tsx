import { Icon } from "@mobilestock-native/icons";
import { ImagePickerAsset } from "expo-image-picker";
import { Pressable } from "react-native";
import { useFileInput } from "../../../../hooks/useFile";

export function Trash({ photo }: { photo: ImagePickerAsset }) {
  const File = useFileInput();
  return (
    <Pressable
      onPress={() => File.removeImage(photo.uri)}
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
