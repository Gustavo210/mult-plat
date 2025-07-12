import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ion from "react-native-vector-icons/Ionicons";
import MD from "react-native-vector-icons/MaterialCommunityIcons";
import MI from "react-native-vector-icons/MaterialIcons";
import { styled } from "styled-components/native";
import { Footer } from "./Footer";

export default function IndexAndroid() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Container.Vertical full>
        <FlatList
          data={Array.from({ length: 50 }, (_, i) => ({
            id: i,
            title: `Item ${i + 1}`,
          }))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Item color="#B5E48C">
              <Typography>{item.title}</Typography>
            </Item>
          )}
        />
      </Container.Vertical>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay>
          <DialogContainer>
            <ModalHeader>
              <HeaderText>ALERTA</HeaderText>
            </ModalHeader>
            <ModalBody>
              <BodyText>
                Este cliente não possui nenhuma troca ou entrega disponível para
                coleta
              </BodyText>
            </ModalBody>
            <Footer backGroundColor="red" full>
              <Footer.FloatArea>
                <DialogButton>
                  <MD name="check" size={24} color="white" />
                </DialogButton>
                <DialogButton>
                  <MD name="check" size={24} color="white" />
                </DialogButton>
              </Footer.FloatArea>
              <Footer.ContentArea padding="SM">
                <CloseButtonArea onPress={() => setModalVisible(false)}>
                  <CloseButtonText>Fechar</CloseButtonText>
                </CloseButtonArea>
              </Footer.ContentArea>
            </Footer>
          </DialogContainer>
        </ModalOverlay>
      </Modal>
      <Footer full padding="2XS" backGroundColor="red">
        <Footer.FloatArea align="RIGHT">
          <FloatButton>
            <Typography size="XS">Float</Typography>
          </FloatButton>
          <FloatButton>
            <Typography size="XS">Float</Typography>
          </FloatButton>
        </Footer.FloatArea>
        <Footer.ContentArea>
          <ItemFooter>
            <MD name="shopping-outline" size={24} color="black" />
            <Text style={{ fontSize: 12 }}>Produtos</Text>
          </ItemFooter>
          <ItemFooter>
            <Ion name="cart-outline" size={24} color="black" />
            <Text style={{ fontSize: 12 }}>Pedido</Text>
          </ItemFooter>
          <ItemFooter>
            <Feather name="credit-card" size={24} color="black" />
            <Text style={{ fontSize: 12 }}>Look Pay</Text>
          </ItemFooter>
          <ItemFooter>
            <MI name="storefront" size={24} color="black" />
            <Text style={{ fontSize: 12 }}>Minha Loja</Text>
          </ItemFooter>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(true)}
          >
            <ItemFooter>
              <Feather name="menu" size={24} color="black" />
              <Text>Menu</Text>
            </ItemFooter>
          </TouchableOpacity>
        </Footer.ContentArea>
      </Footer>
    </>
  );
}

const DialogContainer = styled.View`
  width: 100%;
  height: 100%;
  /* flex: 1; */
  background-color: #ffcc00; /* amarelo principal */
  border-radius: 8px;
  /* overflow: hidden; */
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.View`
  background-color: #ff6f00; /* topo laranja */
  padding: 16px;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const ModalBody = styled.View`
  padding: 24px 16px;
  align-items: center;
  height: 80%;
`;

const BodyText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
`;

const CloseButtonArea = styled.TouchableOpacity`
  background-color: #ff6f00;
  padding: 16px;
  align-items: center;
  border-radius: 10px;
  flex: 1;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const FloatButton = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  padding: 16px;
  background-color: #7a6695;
  border-radius: 100%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const DialogButton = styled.TouchableOpacity`
  height: 10px;
  width: 10px;
  padding: 16px;
  background-color: #7a6695;
  border-radius: 100%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ItemFooter = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Item = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 12px;
  border-radius: 6px;
`;
