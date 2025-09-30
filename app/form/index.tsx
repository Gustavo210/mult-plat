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
              { label: "Opção 4", value: "4" },
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
        <Form.Select
          name="select3"
          label="Opções3"
          options={[
            { value: "1", label: "item 1" },
            { value: "2", label: "item 2" },
            { value: "3", label: "item 3" },
            { value: "4", label: "item 4" },
            { value: "5", label: "item 5" },
            { value: "6", label: "item 6" },
            { value: "7", label: "item 7" },
            { value: "8", label: "item 8" },
            { value: "9", label: "item 9" },
            { value: "10", label: "item 10" },
            { value: "11", label: "item 11" },
            { value: "12", label: "item 12" },
            { value: "13", label: "item 13" },
            { value: "14", label: "item 14" },
            { value: "15", label: "item 15" },
            { value: "16", label: "item 16" },
            { value: "17", label: "item 17" },
            { value: "18", label: "item 18" },
            { value: "19", label: "item 19" },
            { value: "20", label: "item 20" },
          ]}
        />
        <Form.Button text="Enviar" />
      </Form>
    </Container.Vertical>
  );
}
