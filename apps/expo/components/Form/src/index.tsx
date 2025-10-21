import { FormHandles } from "@unform/core";
import { RefObject } from "react";

import { FormButton } from "./components/FormButton";
import { FormCounter } from "./components/FormCounter";
import { FormHorizontal } from "./components/FormHorizontal";
import { FormInput } from "./components/FormInput";
import { FormSelect } from "./components/FormSelect";
import { FormVertical } from "./components/FormVertical";
import { FormComponent, useForm } from "./hooks/useForm";

interface SubmitParams<T extends object> {
  data: T;
  ref: RefObject<FormHandles>;
  reset(): void;
}
const Form = Object.assign(FormComponent, {
  Input: FormInput,
  Button: FormButton,
  Select: FormSelect,
  Counter: FormCounter,
  Vertical: FormVertical,
  Horizontal: FormHorizontal,
});

export { Form, SubmitParams, useForm };
