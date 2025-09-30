import { Icon } from "@mobilestock-native/icons";

import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { List } from "@mobilestock-native/list";

import { Typography } from "@mobilestock-native/typography";
import { useState } from "react";
import { Dimensions, Modal, TouchableWithoutFeedback } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_MAX_HEIGHT = SCREEN_HEIGHT * 0.8; // 80% da tela
const MODAL_MIN_HEIGHT = 200; // Altura mínima do modal
const ITEM_HEIGHT = 45; // Altura estimada de cada item da lista

interface FormSelectModalProps<T> {
  data: (T & { id?: string | number })[];
  placeholder?: string;
}

export function FormSelectModal<
  T extends { name: string; id: string | number }
>({ data, placeholder = "Selecione um item" }: FormSelectModalProps<T>) {
  const MODAL_INITIAL_HEIGHT = Math.min(
    MODAL_MIN_HEIGHT,
    Math.min(SCREEN_HEIGHT * 0.8, data.length * ITEM_HEIGHT)
  );
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const modalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);

  const close = () => {
    "worklet";
    modalHeight.value = withTiming(0, {}, () => {
      runOnJS(setShowModal)(false);
    });
  };

  const initialModalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      initialModalHeight.value = modalHeight.value;
    })
    .onUpdate((e) => {
      const newHeight = initialModalHeight.value - e.translationY;
      modalHeight.value = Math.max(
        MODAL_MIN_HEIGHT,
        Math.min(MODAL_MAX_HEIGHT, newHeight)
      );
    })
    .onEnd((e) => {
      if (e.velocityY > 1000) {
        close();
      } else if (e.velocityY < -1000) {
        modalHeight.value = withTiming(MODAL_MAX_HEIGHT);
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
    () => showModal,
    (modalVisible) => {
      if (modalVisible) {
        modalHeight.value = withSpring(MODAL_INITIAL_HEIGHT, {
          damping: 20,
          stiffness: 90,
          mass: 0.3,
        });
      }
    },
    [showModal]
  );

  return (
    <>
      <Clickable onPress={() => setShowModal(true)}>
        <ContainerInputFake
          padding="NONE_MD"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Container.Horizontal style={{}}>
            <Typography color={selected ? "DEFAULT" : "DEFAULT_200"}>
              {selected?.name || placeholder}
            </Typography>
          </Container.Horizontal>
          <Container.Vertical>
            <Icon name="ChevronDown" size="XS" />
          </Container.Vertical>
        </ContainerInputFake>
      </Clickable>

      <Modal visible={showModal} transparent animationType="none">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => close()}>
            <Animated.View
              style={{
                flex: 1,
              }}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              animatedStyle,
              {
                position: "absolute",
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            ]}
          >
            <GestureDetector gesture={panGesture}>
              <Container.Horizontal
                style={{
                  paddingVertical: 15,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
                align="CENTER"
                padding="SM_XS_SM_XS"
              >
                <Container.Horizontal
                  style={{
                    width: 100,
                    height: 4,
                    borderRadius: 5,
                    backgroundColor: "#cecece",
                  }}
                />
              </Container.Horizontal>
            </GestureDetector>
            <Animated.View style={{ flex: 1, backgroundColor: "black" }}>
              <Container.Main>
                <Animated.View style={{ flex: 1 }}>
                  <List
                    data={data.map((item) => ({
                      ...item,
                    }))}
                    keyExtractor={(item) => item.id.toString()}
                    itemKey={(item) => item.id.toString()}
                    renderItem={(item) => (
                      <List.Item.Horizontal
                        isSelected={selected?.id === item.id}
                        padding="SM"
                        onPress={() => {
                          if (item.id === selected?.id) {
                            setSelected(null);
                          } else {
                            setSelected(item);
                          }
                          close();
                        }}
                      >
                        <List.Item.Title>{item.name}</List.Item.Title>
                      </List.Item.Horizontal>
                    )}
                  />
                </Animated.View>
              </Container.Main>
            </Animated.View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
}

interface ContainerInputFakeProps {
  error?: boolean;
}

const ContainerInputFake = styled(
  Container.Horizontal
)<ContainerInputFakeProps>`
  overflow: hidden;
  height: 45px;
  background-color: ${({ error, theme }) =>
    error ? theme.colors.input.error : theme.colors.input.default};
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.colors.alert.urgent : theme.colors.input.border};
  border-radius: 8px;
`;
