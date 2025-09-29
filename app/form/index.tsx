import { Form } from "@/components/Form/src";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Stack } from "expo-router";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Stack.Screen options={{ title: "Example Title" }} />
      <Typography>Rota para form</Typography>
      <Form onSubmit={(data) => console.log(data)}>
        <Form.Horizontal>
          <Form.Input full name="teste" label="Input" placeholder="Input" />
          <Form.Select
            full
            name="select"
            label="Opções"
            placeholder="Placeholder"
            options={[
              { label: "Opção 1", value: "1" },
              { label: "Opção 2", value: "2" },
              { label: "Opção 3", value: "3" },
            ]}
          />
        </Form.Horizontal>
        <Form.Select
          name="select2"
          label="Opções2"
          options={[
            { label: "Opção 12", value: "1" },
            { label: "Opção 22", value: "2" },
            { label: "Opção 32", value: "3" },
          ]}
        />
        <Form.Select
          name="select2"
          label="Opções2"
          options={[
            { label: "Opção 12", value: "1" },
            { label: "Opção 22", value: "2" },
            { label: "Opção 32", value: "3" },
          ]}
        />
        <Form.SelectModal
          data={[
            { id: 1, name: "item 1" },
            { id: 2, name: "item 2" },
            { id: 3, name: "item 3" },
            { id: 4, name: "item 4" },
            { id: 5, name: "item 5" },
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
        />
        <Form.Button text="Enviar" />
      </Form>
    </Container.Vertical>
  );
}
