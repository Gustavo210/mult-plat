import { useFileInput } from "../../hooks/useFile";
import { Button } from "@mobilestock-native/button";
import { useTheme } from "styled-components/native";

export function ImageAdd() {
  const File = useFileInput();
  const Theme = useTheme();
  return (
    <Button
      icon="Plus"
      variant="OUTLINE"
      onPress={File.showDeviceImage}
      style={{
        height: parseInt(Theme.sizeImage.sm),
        width: parseInt(Theme.sizeImage.sm),
      }}
    />
  );
}
