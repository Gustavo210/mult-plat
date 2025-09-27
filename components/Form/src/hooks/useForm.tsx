import { FormHandles } from '@unform/core'
import { FormProps, Form as UnformForm } from '@unform/mobile'
import { AxiosError } from 'axios'
import { RefObject, createContext, useContext, useRef, useState } from 'react'
import { ZodError, ZodSchema } from 'zod'

import { Container } from '@mobilestock-native/container'
import { ModalAlert } from '@mobilestock-native/modalalert'

import { SubmitParams } from '..'

interface FormPropsWithHandler<T extends object> extends FormProps {
  onSubmit(params: SubmitParams<T>): Promise<void> | void
  schema?: ZodSchema<T>
}

interface PropsContext {
  submitForm(): void
  clearForm(): void
  formRef: RefObject<FormHandles>
  loading?: boolean
}

interface ErrorProps {
  message: string
  status: number
}

interface GenericIssue {
  message: string
  path: (string | number)[]
}

const FormContext = createContext({} as PropsContext)

export function useForm() {
  return useContext(FormContext)
}

export function FormComponent<T extends object>({ children, onSubmit, schema, ...props }: FormPropsWithHandler<T>) {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorProps | undefined>(undefined)

  function submitForm() {
    formRef.current?.submitForm()
  }

  function clearForm() {
    formRef.current?.setErrors({})
    formRef.current?.reset()
  }

  function handleUnformError(issues: GenericIssue[]) {
    const validationErrors: Record<string, string> = {}
    for (const issue of issues) {
      const key = issue.path.filter(path => typeof path === 'string' || typeof path === 'number').join('.')
      if (key) validationErrors[String(key)] = issue.message
    }
    return validationErrors
  }

  function getValidationErrors(err: unknown) {
    if (err instanceof ZodError) return handleUnformError(err.issues as GenericIssue[])

    if (typeof err === 'object' && err !== null && 'errors' in err) {
      const element = (err as { errors: GenericIssue[] }).errors
      if (Array.isArray(element) && element.length > 0 && 'message' in element[0] && 'path' in element[0])
        return handleUnformError(element)
    }

    return null
  }

  async function handleSubmit(data: T, { reset }: { reset(): void }) {
    formRef.current?.setErrors({})
    if (schema) {
      const result = schema.safeParse(data)
      if (!result.success) {
        formRef.current?.setErrors(handleUnformError(result.error.issues as GenericIssue[]))
        return
      }
    }
    try {
      setLoading(true)
      await onSubmit({ data, ref: formRef, reset })
    } catch (err) {
      const validation = getValidationErrors(err)
      if (validation) {
        formRef.current?.setErrors(validation)
      } else {
        let message = 'Erro ao realizar operação'
        let status = 500
        if (typeof err === 'object' && err !== null && 'isAxiosError' in err && (err as AxiosError).isAxiosError) {
          const axiosError = err as AxiosError
          status = axiosError.response?.status || 500
          const data = axiosError.response?.data as { message?: string }
          if (data?.message) message = data.message
        } else if (err instanceof Error) {
          message = err.message || message
        }

        setError({ message, status })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormContext.Provider value={{ formRef, submitForm, clearForm, loading }}>
      <UnformForm ref={formRef} onSubmit={handleSubmit} {...props}>
        <Container.Vertical gap="2XS">{children}</Container.Vertical>
      </UnformForm>
      <ModalAlert
        visible={!!error}
        message={error?.message}
        type={error && error.status >= 500 ? 'FATAL_ERROR' : 'ERROR_NOTICE'}
        title="Erro ao enviar o formulário"
        onClose={() => setError(undefined)}
      />
    </FormContext.Provider>
  )
}
