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
        <Form.SelectModal />
        <Form.Button text="Enviar" />
      </Form>
    </Container.Vertical>
  );
}
