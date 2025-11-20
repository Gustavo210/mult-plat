"use client";

import { File } from "./File";
import { Form } from "./Form/src";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <File.PhotoInput />
      <Form onSubmit={(data) => console.log(data)}>
        <Form.MultipleArchive name="documents" />
        <Form.Button type="SUBMIT" text="teste" />
      </Form>
    </main>
  );
}
