"use client";

import { FormHandles, FormProps } from "@unform/core";
import { Form as UnformForm } from "@unform/web";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { RefObject, createContext, useContext, useRef, useState } from "react";
import { ZodError, ZodSchema } from "zod";

import { Container } from "@mobilestockweb/container";

import { SubmitParams } from "..";

export interface FormPropsWithHandler<T extends object> extends FormProps {
  onSubmit(params: SubmitParams<T>): Promise<void> | void;
  schema?: ZodSchema<T>;
}

interface PropsContext {
  submitForm(): void;
  clearForm(): void;
  formRef: RefObject<FormHandles>;
  loading?: boolean;
}

interface GenericIssue {
  message: string;
  path: (string | number)[];
}

const FormContext = createContext({} as PropsContext);

export function useForm() {
  return useContext(FormContext);
}

export function FormComponent<T extends object>({
  children,
  onSubmit,
  schema,
  ...props
}: FormPropsWithHandler<T>) {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function submitForm() {
    formRef.current?.submitForm();
  }

  function clearForm() {
    formRef.current?.setErrors({});
    formRef.current?.reset();
  }

  function handleUnformError(issues: GenericIssue[]) {
    const validationErrors: Record<string, string> = {};
    for (const issue of issues) {
      const key = issue.path
        .filter((path) => typeof path === "string" || typeof path === "number")
        .join(".");
      if (key) validationErrors[String(key)] = issue.message;
    }
    return validationErrors;
  }

  function getValidationErrors(err: unknown) {
    if (err instanceof ZodError)
      return handleUnformError(err.issues as GenericIssue[]);

    if (typeof err === "object" && err !== null && "errors" in err) {
      const element = (err as { errors: GenericIssue[] }).errors;
      if (
        Array.isArray(element) &&
        element.length > 0 &&
        "message" in element[0] &&
        "path" in element[0]
      )
        return handleUnformError(element);
    }

    return null;
  }

  async function handleSubmit(data: T, { reset }: { reset(): void }) {
    formRef.current?.setErrors({});
    if (schema) {
      const result = schema.safeParse(data);
      if (!result.success) {
        formRef.current?.setErrors(
          handleUnformError(result.error.issues as GenericIssue[])
        );
        return;
      }
    }
    try {
      setLoading(true);
      await onSubmit({ data, ref: formRef, reset });
    } catch (err) {
      const validation = getValidationErrors(err);
      if (validation) {
        formRef.current?.setErrors(validation);
      } else {
        let message = "Erro ao realizar operação";
        let status = 500;
        if (
          typeof err === "object" &&
          err !== null &&
          "isAxiosError" in err &&
          (err as AxiosError).isAxiosError
        ) {
          const axiosError = err as AxiosError;
          status = axiosError.response?.status || 500;
          const data = axiosError.response?.data as { message?: string };
          if (data?.message) message = data.message;
        } else if (err instanceof Error) {
          message = err.message || message;
        }

        enqueueSnackbar(message, {
          variant: status >= 500 ? "error" : "warning",
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <FormContext.Provider value={{ formRef, submitForm, clearForm, loading }}>
      <UnformForm {...props} ref={formRef} onSubmit={handleSubmit}>
        <Container.Vertical gap="2XS">{children}</Container.Vertical>
      </UnformForm>
    </FormContext.Provider>
  );
}
