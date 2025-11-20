import { FormHandles } from "@unform/core";
import { RefObject } from "react";

import { FormButton } from "./components/FormButton";
import { FormMultipleArchive } from "./components/FormMultipleArchive";
import { FormComponent, useForm } from "./hooks/useForm";

interface SubmitParams<T extends object> {
  data: T;
  ref: RefObject<FormHandles>;
  reset(): void;
}

const Form = Object.assign(FormComponent, {
  Button: FormButton,
  MultipleArchive: FormMultipleArchive,
});

export { Form, SubmitParams, useForm };
