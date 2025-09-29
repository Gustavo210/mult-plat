import { FormHandles } from "@unform/core";
import { RefObject } from "react";

import { Platform } from "react-native";
import { FormButton } from "./components/FormButton";
import { FormHorizontal } from "./components/FormHorizontal";
import { FormInput } from "./components/FormInput";
import { FormSelect } from "./components/FormSelect";
import { FormSelect2 } from "./components/FormSelect2";
import { FormSelectModal } from "./components/FormSelectModal";
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
  Select2: FormSelect2,
  SelectModal: Platform.OS === "android" ? FormSelectModal : () => <></>,
  Vertical: FormVertical,
  Horizontal: FormHorizontal,
});

export { Form, SubmitParams, useForm };
