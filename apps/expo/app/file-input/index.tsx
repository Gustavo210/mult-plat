import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import z from "zod";
import { Form } from "../../components/Form/src";

const schema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
  photoList: z.array(z.instanceof(File), {
    error: "É necessário enviar ao menos uma foto",
  }),
  multipleArchive: z.array(z.instanceof(File), {
    error: "É necessário enviar ao menos um arquivo",
  }),
});

export default function Index() {
  async function onSubmit({ data }: any) {
    try {
      console.log(JSON.stringify(data, null, 2));

      const formData = new FormData();
      if (data.fileInput) {
        formData.append("fileInput", data.fileInput);
      }
      if (data.photoList && data.photoList.length > 0) {
        data.photoList.forEach((file: File, index: number) => {
          formData.append(`files`, file);
        });
      }
      if (data.multipleArchive && data.multipleArchive.length > 0) {
        data.multipleArchive.forEach((file: File, index: number) => {
          formData.append(`files`, file);
        });
      }
      await fetch("http://192.168.0.115:3333/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Container.Vertical>
      <Typography>Rota para file-input</Typography>
      <Form onSubmit={onSubmit} schema={schema}>
        <Form.Input name="name" label="File Input" />
        <Form.PhotoList
          name="photoList"
          multiple
          onChange={console.log}
          label="Photo List"
        />
        <Container.Horizontal>
          <Form.MultipleArchive
            name="multipleArchive"
            label="Multiple Archive"
            accept={["jpeg"]}
            onChange={console.log}
          />
        </Container.Horizontal>
        <Form.Button text="Enviar" />
      </Form>
    </Container.Vertical>
  );
}
