import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { Typography } from "@mobilestock-native/typography";
import { Ref, useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useFileInput } from "../../../../hooks/useFile";
import { Button } from "@mobilestock-native/button";

export function Footer() {
  const FileInput = useFileInput();
  const flipIcon = useSharedValue(false);
  const containerRef = useRef<Ref<View>>(null);
  const fileCount = useSharedValue(FileInput.files?.length || 0);

  useEffect(() => {
    fileCount.value = FileInput.files?.length || 0;
  }, [FileInput.files, fileCount]);

  useEffect(() => {
    flipIcon.value = !!FileInput.files?.length;
  }, [flipIcon, FileInput.files]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(flipIcon.value ? "0deg" : "180deg"),
        },
      ],
    };
  });

  const containerAnimationStyle = useAnimatedStyle(() => {
    let height;
    switch (fileCount.value) {
      case 0:
        height = 0;
        break;
      case 1:
        height = 20;
        break;
      case 2:
        height = 50;
        break;
      case 3:
        height = 75;
        break;
      default:
        height = 100;
        break;
    }
    return {
      height: withSpring(flipIcon.value ? height : 0),
      opacity: withSpring(flipIcon.value ? 1 : 0),
    };
  }, [containerRef.current, fileCount.value]);

  function converterBytesParaFormatoLegivel(quantidadeBytes: number): string {
    const quantidadeKilobytes = 1024;
    const quantidadeMegabytes = 1024 * 1024;
    const quantidadeGigabytes = 1024 * 1024 * 1024;

    if (quantidadeBytes >= quantidadeGigabytes) {
      const valorGigabytes = quantidadeBytes / quantidadeGigabytes;
      return valorGigabytes.toFixed(2) + " GB";
    }

    if (quantidadeBytes >= quantidadeMegabytes) {
      const valorMegabytes = quantidadeBytes / quantidadeMegabytes;
      return valorMegabytes.toFixed(2) + " MB";
    }

    if (quantidadeBytes >= quantidadeKilobytes) {
      const valorKilobytes = quantidadeBytes / quantidadeKilobytes;
      return valorKilobytes.toFixed(2) + " KB";
    }

    return quantidadeBytes + " B";
  }

  return (
    <>
      <Container.Horizontal align="END">
        {!!FileInput.files?.length && (
          <Clickable onPress={() => (flipIcon.value = !flipIcon.value)}>
            <Container.Horizontal align="CENTER">
              <Typography size="XS">
                {FileInput.files?.length} arquivos
              </Typography>
              <Animated.View style={animationStyle}>
                <Icon name="ChevronDown" size="XS" />
              </Animated.View>
            </Container.Horizontal>
          </Clickable>
        )}
      </Container.Horizontal>
      <Animated.ScrollView style={containerAnimationStyle}>
        {FileInput.files?.map((item, index) => (
          <Container.Horizontal key={index} align="START_CENTER">
            <Container.Horizontal gap="SM" full>
              <Typography size="XS" weight="MEDIUM">
                {item.name.slice(0, 20)}
              </Typography>
              <Typography size="XS">
                {converterBytesParaFormatoLegivel(item.size)}
              </Typography>
            </Container.Horizontal>
            <Button
              variant="TRANSPARENT"
              icon="Trash"
              backgroundColor="CANCEL_DARK"
              size="XS"
              onPress={() =>
                FileInput.handleRemoveFile(`${item.name}-${item.size}`)
              }
            />
          </Container.Horizontal>
        ))}
      </Animated.ScrollView>
    </>
  );
}
