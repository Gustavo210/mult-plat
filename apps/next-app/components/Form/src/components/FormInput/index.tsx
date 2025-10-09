import { useField } from '@unform/core'
import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'

import { Button } from '@mobilestockweb/button'
import { Container } from '@mobilestockweb/container'
import tools from '@mobilestockweb/tools'
import { Typography } from '@mobilestockweb/typography'

import { useForm } from '../../hooks/useForm'

type InputType = 'text' | 'password' | 'tel' | 'email' | 'number' | 'url' | 'zipcode' | 'hidden'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string
  label?: string
  type?: InputType
  autoSubmit?: boolean
  full?: boolean
  error?: string
  format?(value: string): string
}

export interface InputRef {
  focus(): void
  blur(): void
}

export const FormInput = forwardRef<InputRef, InputProps>(function FormInputRef(
  { name, label, defaultValue, type, autoSubmit, full, error, format, onChange, maxLength, ...props },
  formRef
) {
  const { loading } = useForm()
  const unformField = useField(name)
  const inputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const isPassword = type === 'password'
  const maxInputLength = type === 'tel' ? 15 : type === 'zipcode' ? 9 : maxLength
  const objectId = name + '-input' + useId()

  useEffect(() => {
    const initialValue = value || defaultValue || unformField?.defaultValue || ''
    inputRef.current.value = initialValue
    setValue(initialValue)

    unformField.registerField<string>({
      name: unformField.fieldName,
      ref: inputRef,
      getValue: ref => ref.current?.value || '',
      setValue: (ref, newValue) => {
        if (ref.current) {
          ref.current.value = newValue
          setValue(newValue)
        }
      },
      clearValue: ref => {
        if (ref.current) {
          ref.current.value = ''
          setValue('')
        }
      }
    })
  }, [unformField?.fieldName, unformField?.registerField])

  useImperativeHandle(formRef, () => ({
    focus() {
      inputRef.current?.focus()
    },
    blur() {
      inputRef.current?.blur()
    }
  }))

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let formattedValue: string = event.target.value

      switch (type) {
        case 'tel':
          formattedValue = tools.phoneNumberFormatter(formattedValue)
          break
        case 'email':
        case 'url':
          formattedValue = formattedValue.trim()
          break
        case 'zipcode':
          formattedValue = tools.formatZipcode(formattedValue)
          break
      }

      if (format) {
        formattedValue = format(formattedValue)
      }

      setValue(formattedValue)
      event.target.value = formattedValue
      inputRef.current.value = formattedValue

      onChange?.(event)

      if (type === 'tel' && autoSubmit && formattedValue.length === 15 && inputRef.current.form) {
        inputRef.current.form.requestSubmit()
        inputRef.current.blur()
      }

      if (type === 'zipcode' && autoSubmit && formattedValue.length === 9 && inputRef.current.form) {
        inputRef.current.form.requestSubmit()
        inputRef.current.blur()
      }
    },
    [type, format, autoSubmit, onChange, unformField]
  )

  function getInputType() {
    if (type === 'password') {
      return showPassword ? 'text' : 'password'
    }
    return type
  }

  return (
    <InputContainer full={full} $show={type !== 'hidden'}>
      {label && (
        <Label htmlFor={objectId} size="SM">
          {label}
        </Label>
      )}
      <ContainerInput
        align="CENTER"
        padding="XS_NONE"
        gap="SM"
        $isError={!!unformField?.error}
        $isPassword={isPassword}
      >
        <InputField
          {...props}
          ref={inputRef}
          id={objectId}
          value={value}
          onChange={handleChange}
          maxLength={maxInputLength}
          type={getInputType()}
          disabled={loading || props.disabled}
        />
        {isPassword && (
          <Button
            size="SM"
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? 'EyeOutline' : 'EyeOff'}
            variant="TRANSPARENT"
            type="button"
          />
        )}
      </ContainerInput>
      {unformField?.error && (
        <Typography color="DANGER" size="SM">
          {unformField?.error}
        </Typography>
      )}
    </InputContainer>
  )
})

const InputContainer = styled(Container.Vertical)<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
`

const Label = styled(Typography).attrs({ forwardedAs: 'label' })<{ htmlFor: string }>``

const ContainerInput = styled(Container.Horizontal)<{ $isError: boolean; $isPassword: boolean }>`
  padding: ${({ $isPassword }) => ($isPassword ? '0 0 0 10px' : '0 10px')};
  background-color: ${({ $isError, theme }) => ($isError ? theme.colors.input.error : theme.colors.input.default)};
  border: 1px solid ${({ $isError, theme }) => ($isError ? theme.colors.alert.urgent : theme.colors.input.border)};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`

const InputField = styled.input`
  width: 100%;
  border: none;
  height: 2.5rem;
  outline: none;
  background-color: transparent;
`
