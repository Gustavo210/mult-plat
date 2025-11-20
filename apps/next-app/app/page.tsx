"use client";

import { Form } from "./Form/src";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <Form onSubmit={(data) => console.log(data)}>
        <Form.MultipleArchive name="documents" />
        <Form.PhotoList name="photos" />
        <Form.Button type="SUBMIT" text="teste" />
      </Form>
    </main>
  );
}
