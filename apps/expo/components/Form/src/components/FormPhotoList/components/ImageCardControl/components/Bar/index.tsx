import { Container } from "@mobilestock-native/container";
import { usePhotoList } from "../../../../hooks/usePhotoList";

export function Bar({ isActive }: { isActive: boolean }) {
  const PhotoList = usePhotoList();

  return (
    <Container.Horizontal
      style={[
        {
          height: 2,
          width: PhotoList.sizeComponent * 0.7,
          backgroundColor: "#222",
        },
        isActive && { backgroundColor: "#f9e30f" },
      ]}
    />
  );
}
