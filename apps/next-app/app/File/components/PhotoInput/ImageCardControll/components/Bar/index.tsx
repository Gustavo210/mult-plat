import { View } from "react-native";
import { useTheme } from "styled-components/native";

export function Bar({ isActive }: { isActive: boolean }) {
  const Theme = useTheme();

  return (
    <View
      style={[
        {
          height: 2,
          width: parseInt(Theme.sizeImage.sm) * 0.7,
          backgroundColor: "#222",
        },
        isActive && { backgroundColor: "#f9e30f" },
      ]}
    />
  );
}
