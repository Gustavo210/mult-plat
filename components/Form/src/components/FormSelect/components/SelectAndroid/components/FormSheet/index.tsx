import { Container } from "@mobilestock-native/container";
import { List } from "@mobilestock-native/list";

import { useMemo } from "react";
import { Dimensions, Modal, TouchableWithoutFeedback } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CustomOption } from "../../../..";
import { FormSheetHeader } from "../FormSheetHeader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_MAX_HEIGHT = SCREEN_HEIGHT * 0.8; // 80% da tela
const MODAL_MIN_HEIGHT = 200; // Altura mínima do modal
const ITEM_HEIGHT = 45; // Altura estimada de cada item da lista

interface FormSheetProps {
  visible: boolean;
  options: CustomOption[];
  placeholder: string;
  onClose: () => void;
  onSelect: (item: CustomOption | null) => void;
  selectValue: CustomOption | null;
}
export function FormSheet(props: FormSheetProps) {
  const MIN_HEIGHT_AVAILABLE = useMemo(() => {
    return Math.min(
      MODAL_MAX_HEIGHT,
      props.options.length * ITEM_HEIGHT + ITEM_HEIGHT
    );
  }, [props.options]);

  const MODAL_INITIAL_HEIGHT = Math.min(MODAL_MIN_HEIGHT, MIN_HEIGHT_AVAILABLE);

  const modalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);
  const initialModalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      initialModalHeight.value = modalHeight.value;
    })
    .onUpdate((e) => {
      const newHeight = initialModalHeight.value - e.translationY;
      modalHeight.value = Math.max(
        MODAL_MIN_HEIGHT,
        Math.min(newHeight, MIN_HEIGHT_AVAILABLE)
      );
    })
    .onEnd((e) => {
      if (e.velocityY < -1000) {
        modalHeight.value = withTiming(MIN_HEIGHT_AVAILABLE);
      } else {
        if (modalHeight.value > MODAL_MAX_HEIGHT / 2) {
          modalHeight.value = withTiming(MODAL_MAX_HEIGHT);
        } else {
          modalHeight.value = withTiming(MODAL_MIN_HEIGHT);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
    bottom: 0,
  }));

  useAnimatedReaction(
    () => props.visible,
    (modalVisible) => {
      if (modalVisible) {
        modalHeight.value = withSpring(MODAL_INITIAL_HEIGHT, {
          damping: 20,
          stiffness: 90,
          mass: 0.3,
        });
      }
    },
    [props.visible]
  );

  function close() {
    "worklet";
    modalHeight.value = withTiming(0, {}, () => {
      runOnJS(props.onClose)();
    });
  }

  return (
    <Modal visible={props.visible} transparent animationType="none">
      <GestureHandlerRootView>
        <TouchableWithoutFeedback onPress={close}>
          <Container.Vertical full />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderWidth: 1,
              borderColor: "#ddd",
              borderTopRightRadius: 20,
            },
          ]}
        >
          <FormSheetHeader
            placeholder={props.placeholder}
            panGesture={
              props.options.length * ITEM_HEIGHT + ITEM_HEIGHT >
              MODAL_MIN_HEIGHT
                ? panGesture
                : undefined
            }
          />
          <Container.Main>
            <List
              data={props.options}
              itemKey="value"
              ItemSeparatorComponent={() => {
                return (
                  <Container.Horizontal
                    style={{
                      backgroundColor: "#eee",
                      height: 1,
                      width: "100%",
                    }}
                  />
                );
              }}
              renderItem={(item) => (
                <>
                  <List.Item.Horizontal
                    isSelected={props.selectValue?.value === item.value}
                    padding="SM"
                    onPress={() => {
                      if (item.value === props.selectValue?.value) {
                        props.onSelect(null);
                      } else {
                        props.onSelect(item);
                      }
                      close();
                    }}
                  >
                    <List.Item.Title>{item.label}</List.Item.Title>
                  </List.Item.Horizontal>
                </>
              )}
            />
          </Container.Main>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}
