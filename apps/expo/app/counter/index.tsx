import { Typography } from "@mobilestock-native/typography";
import { ScrollView } from "react-native";
import z from "zod";
import { Form } from "../../components/Form/src";

export default function IndexWeb() {
  return (
    <ScrollView>
      <Typography size="LG" weight="BOLD">
        Rota para counter
      </Typography>
      <Form
        onSubmit={(data) => console.log(JSON.stringify(data.data, null, 2))}
        schema={z.object({
          counter: z.object({
            padrao: z.object({
              default: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              grouped: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              naked: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
            }),
            top_center: z.object({
              default: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              grouped: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              naked: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
            }),
            left: z.object({
              default: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              grouped: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
              naked: z.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
            }),
            children: z.number().min(1, "Mínimo 1").max(99, "Máximo 99"),
            children2: z.number().min(1, "Mínimo 1").max(99, "Máximo 99"),
            children3: z.number().min(1, "Mínimo 1").max(99, "Máximo 99"),
            children4: z.number().min(1, "Mínimo 1").max(99, "Máximo 99"),
          }),
        })}
      >
        <Form.Vertical gap="SM">
          <Form.Counter name="counter.padrao.default" label="DEFAULT" />
          <Form.Counter
            name="counter.padrao.grouped"
            label="GROUPED"
            groupElements
          />
          <Form.Counter
            name="counter.padrao.naked"
            label="NAKED"
            buttonTransparent
          />
        </Form.Vertical>

        <Typography size="LG" weight="BOLD">
          Rota para TOP_CENTER
        </Typography>
        <Form.Vertical gap="SM">
          <Form.Counter
            name="counter.top_center.default"
            labelPosition="TOP_CENTER"
            label="DEFAULT"
          />
          <Form.Counter
            name="counter.top_center.grouped"
            labelPosition="TOP_CENTER"
            label="GROUPED"
            groupElements
          />
          <Form.Counter
            name="counter.top_center.naked"
            labelPosition="TOP_CENTER"
            label="NAKED"
            buttonTransparent
          />
        </Form.Vertical>

        <Typography size="LG" weight="BOLD">
          Rota para LEFT
        </Typography>
        <Form.Vertical gap="SM">
          <Form.Counter
            name="counter.left.default"
            labelPosition="LEFT"
            label="DEFAULT"
          />
          <Form.Counter
            name="counter.left.grouped"
            labelPosition="LEFT"
            label="GROUPED"
            groupElements
          />
          <Form.Counter
            name="counter.left.naked"
            labelPosition="LEFT"
            label="NAKED"
            buttonTransparent
          />
        </Form.Vertical>
        <Form.Counter
          name="counter.children"
          editable
          onChange={(value) => console.log(value)}
        >
          <Form.Counter.Plus text="Adicionar" />
          <Form.Counter.Minus text="Remover" />
          <Form.Counter.Badge text="37" renderInsideThePill />
          <Form.Counter.Display />
        </Form.Counter>
        <Form.Counter
          name="counter.children2"
          groupElements
          onChange={(value) => console.log(value)}
        >
          <Form.Counter.Badge text="37" renderInsideThePill />
          <Form.Counter.Plus />
          <Form.Counter.Minus />
          <Form.Counter.Display />
        </Form.Counter>
        <Form.Counter
          name="counter.children3"
          groupElements
          labelPosition="LEFT"
          label="Counter com grouped"
          onChange={(value) => console.log(value)}
        >
          <Form.Counter.Badge text="37" renderInsideThePill />
          <Form.Counter.Minus />
          <Form.Counter.Display />
          <Form.Counter.Plus />
        </Form.Counter>
        <Form.Counter
          name="counter.children4"
          labelPosition="TOP_CENTER"
          label="Counter com grouped2"
          onChange={(value) => console.log(value)}
        >
          <Form.Counter.Badge text="37" />
          <Form.Counter.Minus />
          <Form.Counter.Display />
          <Form.Counter.Plus />
        </Form.Counter>
        {["37", "38", "39", "40"].map((value, index) => (
          <Form.Counter
            name={`counter.children4.[${index}]`}
            labelPosition="TOP_START"
            editable
            groupElements
            key={value}
            onChange={(value) => console.log(value)}
          >
            <Form.Counter.Badge text={value} />
            <Form.Counter.Minus />
            <Form.Counter.Display />
            <Form.Counter.Plus />
          </Form.Counter>
        ))}
        <Form.Button text="Enviar" />
      </Form>
    </ScrollView>
  );
}
