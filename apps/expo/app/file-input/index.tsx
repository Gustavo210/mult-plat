import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Form } from "../../components/Form/src";

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
      const serverResponse = await fetch(
        "http://192.168.0.115:3333/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Container.Vertical>
      <Typography>Rota para file-input</Typography>
      <Form onSubmit={onSubmit}>
        <Form.Input name="fileInput" label="File Input" />
        <Form.PhotoList name="photoList" />
        <Form.MultipleArchive name="multipleArchive" />
        <Form.Button text="Enviar" />
      </Form>
    </Container.Vertical>
  );
}
