import { Icon } from "@mobilestock-native/icons";

import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { List } from "@mobilestock-native/list";

import { Typography } from "@mobilestock-native/typography";
import { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import {
  FlatList,
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
const MODAL_FULL_HEIGHT = SCREEN_HEIGHT;

export function FormSelectModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const position = useSharedValue(SCREEN_HEIGHT);
  const offset = useSharedValue(0);
  const modalHeight = useSharedValue(MODAL_INITIAL_HEIGHT);
  const isScrolling = useSharedValue(false);
  const flatListRef = useRef<FlatList<any>>(null);

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
      if (position.value === 0 && e.translationY < 0) {
        // Se o modal estiver no topo e o usuário arrastar para cima, a lista deve rolar
        if (flatListRef.current && flatListRef.current.scrollToOffset) {
          runOnJS(flatListRef.current.scrollToOffset)({
            offset: -e.translationY,
            animated: false,
          });
        }
        isScrolling.value = true;
      } else {
        position.value = offset.value + e.translationY;
        isScrolling.value = false;
      }
      modalHeight.value = withSpring(MODAL_FULL_HEIGHT, {
        damping: 20,
        stiffness: 90,
        mass: 0.3,
      });
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
        position.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
          mass: 0.3,
        });
      } else {
        // Ficar onde soltou
        if (position.value > SCREEN_HEIGHT / 2) {
          close();
        } else {
          position.value = withSpring(SCREEN_HEIGHT - modalHeight.value, {
            damping: 20,
            stiffness: 90,
            mass: 0.3,
          });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
    height: modalHeight.value,
  }));

  useAnimatedReaction(
    () => showModal,
    (modalVisible) => {
      if (modalVisible) {
        position.value = withSpring(SCREEN_HEIGHT - MODAL_INITIAL_HEIGHT, {
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
        <ContainerInputFake padding="NONE_MD" align="BETWEEN_CENTER">
          <Container.Horizontal style={{}}>
            <Typography color={selectedItem ? "DEFAULT" : "DEFAULT_200"}>
              {selectedItem || "Selecione um item"}
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
                  // backgroundColor: "red",
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
            <List
              ref={flatListRef}
              data={[
                {
                  id: 1,
                  name: "item 1",
                },
                {
                  id: 2,
                  name: "item 2",
                },
                {
                  id: 3,
                  name: "item 3",
                },
                {
                  id: 4,
                  name: "item 4",
                },
                {
                  id: 5,
                  name: "item 5",
                },
                { id: 6, name: "item 6" },
                { id: 7, name: "item 7" },
                { id: 8, name: "item 8" },
                { id: 9, name: "item 9" },
                { id: 10, name: "item 10" },
                { id: 11, name: "item 11" },
                { id: 12, name: "item 12" },
                { id: 13, name: "item 13" },
                { id: 14, name: "item 14" },
                { id: 15, name: "item 15" },
                { id: 16, name: "item 16" },
                { id: 17, name: "item 17" },
                { id: 18, name: "item 18" },
                { id: 19, name: "item 19" },
                { id: 20, name: "item 20" },
              ]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => {
                return (
                  <Clickable
                    onPress={() => {
                      console.log("Clicou", item.name);
                      if (selectedItem === item.name) {
                        setSelectedItem(null);
                      } else {
                        setSelectedItem(item.name);
                      }
                      close();
                    }}
                    style={[
                      {
                        padding: 20,
                        borderWidth: 1,
                        borderColor: "#eee",
                      },
                      selectedItem === item.name
                        ? { backgroundColor: "#ddd" }
                        : {},
                    ]}
                  >
                    <Text>{item.name}</Text>
                  </Clickable>
                );
              }}
            />
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
