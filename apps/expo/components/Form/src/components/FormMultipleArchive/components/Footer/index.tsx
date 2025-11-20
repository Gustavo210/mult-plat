import { Ref, useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Button } from "@mobilestock-native/button";
import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { Typography } from "@mobilestock-native/typography";

import { useMultipleArchive } from "../../hooks/useMultipleArchive";
import { utils } from "../../utils";

export function Footer() {
  const MultipleArchive = useMultipleArchive();
  const flipIcon = useSharedValue(false);
  const containerRef = useRef<Ref<View>>(null);
  const fileCount = useSharedValue(MultipleArchive.files?.length || 0);

  useEffect(() => {
    fileCount.value = MultipleArchive.files?.length || 0;
  }, [MultipleArchive.files, fileCount]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(flipIcon.value ? "180deg" : "0deg"),
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

  return (
    <>
      <Container.Horizontal align="END">
        {!!MultipleArchive.files?.length && (
          <Clickable onPress={() => (flipIcon.value = !flipIcon.value)}>
            <Container.Horizontal align="CENTER">
              <Typography size="XS">
                {MultipleArchive.files?.length} arquivos
              </Typography>
              <Animated.View style={animationStyle}>
                <Icon name="ChevronDown" size="XS" />
              </Animated.View>
            </Container.Horizontal>
          </Clickable>
        )}
      </Container.Horizontal>
      <Animated.ScrollView style={containerAnimationStyle}>
        {MultipleArchive.files?.map((item, index) => (
          <Container.Horizontal key={index} align="START_CENTER">
            <Container.Horizontal gap="SM" full>
              <Typography size="XS" weight="MEDIUM">
                {item.name.slice(0, 20)}
              </Typography>
              {item.size && (
                <Typography size="XS">
                  {utils.convertBytesToReadableFormat(item.size)}
                </Typography>
              )}
            </Container.Horizontal>
            <Button
              variant="TRANSPARENT"
              icon="Trash"
              backgroundColor="CANCEL_DARK"
              size="XS"
              onPress={() =>
                MultipleArchive.handleRemoveFile(`${item.name}-${item.size}`)
              }
            />
          </Container.Horizontal>
        ))}
      </Animated.ScrollView>
    </>
  );
}
