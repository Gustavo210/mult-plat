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
const MODAL_INITIAL_HEIGHT = SCREEN_HEIGHT * 0.3; // 30% da tela
const MODAL_MAX_HEIGHT = SCREEN_HEIGHT * 0.8; // 80% da tela
const MODAL_MIN_HEIGHT = 200; // Altura mínima do modal

interface FormSelectModalProps<T> {
  data: (T & { id?: string | number })[];
  placeholder?: string;
}

export function FormSelectModal<T extends { name: string }>({
  data,
  placeholder = "Selecione um item",
}: FormSelectModalProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const [listContentHeight, setListContentHeight] = useState(0);
  const position = useSharedValue(SCREEN_HEIGHT);
  const offset = useSharedValue(0);
  const modalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);
  const isScrolling = useSharedValue(false);
  // const flatListRef = useRef<FlatList<any>>(null); // Removido, pois List não aceita ref

  const close = () => {
    "worklet";
    position.value = withTiming(SCREEN_HEIGHT, {}, () => {
      runOnJS(setShowModal)(false);
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = position.value;
    })
    .onUpdate((e) => {
      if (
        position.value <= SCREEN_HEIGHT - MODAL_MAX_HEIGHT &&
        e.translationY < 0
      ) {
        // Se o modal estiver no topo (ou acima) e o usuário arrastar para cima, a lista deve rolar
        isScrolling.value = true;
      } else if (
        position.value >= SCREEN_HEIGHT - MODAL_MAX_HEIGHT &&
        e.translationY > 0
      ) {
        // Se o modal estiver no topo e o usuário arrastar para baixo, o modal deve descer
        position.value = offset.value + e.translationY;
        isScrolling.value = false;
      } else {
        position.value = offset.value + e.translationY;
        isScrolling.value = false;
      }
      modalHeight.value = withSpring(
        Math.max(
          MODAL_MIN_HEIGHT,
          Math.min(SCREEN_HEIGHT - position.value, MODAL_MAX_HEIGHT)
        ),
        {
          damping: 20,
          stiffness: 90,
          mass: 0.3,
        }
      );
    })
    .onEnd((e) => {
      if (isScrolling.value) {
        // Se estava rolando a lista, não fazer nada com o modal
        isScrolling.value = false;
        return;
      }

      if (e.velocityY > 1000) {
        // Jogar para baixo
        close();
      } else if (e.velocityY < -1000) {
        // Jogar para cima
        position.value = withTiming(SCREEN_HEIGHT - MODAL_MAX_HEIGHT);
        modalHeight.value = withTiming(MODAL_MAX_HEIGHT);
      } else {
        // Ficar onde soltou
        if (position.value > SCREEN_HEIGHT / 2) {
          close();
        } else {
          position.value = withTiming(SCREEN_HEIGHT - modalHeight.value);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(position.value, 200) }],
    height: modalHeight.value,
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
        position.value = withTiming(SCREEN_HEIGHT - MODAL_INITIAL_HEIGHT);
      }
    },
    [showModal, listContentHeight]
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
            <Animated.View style={{ flex: 1 }}>
              <Container.Main>
                <Animated.View style={{ flex: 1 }}>
                  <List
                    data={data.map((item, key) => ({
                      id: item?.id || key,
                      ...item,
                    }))}
                    keyExtractor={(item) => item.id.toString()}
                    itemKey={(item) => item.id.toString()}
                    renderItem={(item) => (
                      <List.Item.Horizontal
                        padding="SM"
                        onPress={() => {
                          setSelected(item);
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
