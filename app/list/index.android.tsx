import { Button } from "@mobilestock-native/button";
import { Img } from "@mobilestock-native/image";
import { List } from "@mobilestock-native/list";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { styled } from "styled-components/native";

const mockedData = [
  {
    id: "1",
    title: "Item 1",
    subtitle: "Subtitle for Item 1",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 1",
  },
  {
    id: "2",
    title: "Item 2",
    subtitle: "Subtitle for Item 2",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 2",
  },
  {
    id: "3",
    title: "Item 3",
    subtitle: "Subtitle for Item 3",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 3",
  },
  {
    id: "4",
    title: "Item 4",
    subtitle: "Subtitle for Item 4",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 4",
  },
  {
    id: "5",
    title: "Item 5",
    subtitle: "Subtitle for Item 5",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 5",
  },
  {
    id: "6",
    title: "Item 6",
    subtitle: "Subtitle for Item 6",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 6",
  },
  {
    id: "7",
    title: "Item 7",
    subtitle: "Subtitle for Item 7",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 7",
  },
  {
    id: "8",
    title: "Item 8",
    subtitle: "Subtitle for Item 8",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 8",
  },
  {
    id: "9",
    title: "Item 9",
    subtitle: "Subtitle for Item 9",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 9",
  },
  {
    id: "10",
    title: "Item 10",
    subtitle: "Subtitle for Item 10",
    photo: "https://picsum.photos/200/300",
    description: "Description for Item 10",
  },
];

export default function IndexAndroid() {
  return (
    <AndroidContainer>
      <Typography>Rota Android para list</Typography>
      <List
        data={mockedData}
        ItemSeparatorComponent={() => <Spacer size="XS" />}
        itemKey="id"
        renderItem={(item) => (
          <List.Item.Horizontal border="BOTTOM" align="CENTER">
            <List.Item.Graphic>
              <Img src={item.photo} alt={item.title} size="SM" />
            </List.Item.Graphic>
            <List.Item.Content.Vertical align="START">
              <List.Item.Title>Item {item.title}</List.Item.Title>
              <List.Item.Subtitle>{item.subtitle}</List.Item.Subtitle>
            </List.Item.Content.Vertical>
            <List.Item.Actions.Vertical>
              <Button icon="AddPhoto" size="XS" variant="TRANSPARENT" />
              <Button icon="Edit" size="XS" variant="TRANSPARENT" />
            </List.Item.Actions.Vertical>
            <List.Item.Footer.Vertical isExpansible>
              <List.Item.Text>{item.description}</List.Item.Text>
              <Spacer size="XS" />
              <List.Item.Actions.Horizontal>
                <Button icon="Trash" size="XS" text="Excluir" />
                <Button icon="Favorite" size="XS" text="Favoritar" />
                <Button icon="Share" size="XS" text="Compartilhar" />
              </List.Item.Actions.Horizontal>
            </List.Item.Footer.Vertical>
          </List.Item.Horizontal>
        )}
      />
    </AndroidContainer>
  );
}

const AndroidContainer = styled.View`
  height: 100%;
  padding: 0 5px;
`;
