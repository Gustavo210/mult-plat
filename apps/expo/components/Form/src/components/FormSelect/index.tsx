import { useField } from '@unform/core'
import { Platform } from 'react-native'

import { Container } from '@mobilestock-native/container'
import { Typography } from '@mobilestock-native/typography'

import { SelectAndroid } from './components/SelectAndroid'
import { SelectWeb } from './components/SelectWeb'

export interface CustomOption {
  label: string
  value: string
}
export interface FormSelectPropsBase {
  name: string
  options: CustomOption[]
  disabled: boolean
  placeholder: string
  defaultValue?: CustomOption
}

export interface FormSelectProps extends Omit<FormSelectPropsBase, 'placeholder' | 'disabled'> {
  placeholder?: string
  label?: string
  disabled?: boolean
  full?: boolean
}
export function FormSelect({
  name,
  label,
  disabled = false,
  options,
  placeholder = 'Selecione um item',
  full = false,
  defaultValue
}: FormSelectProps) {
  const { error } = useField(name)

  return (
    <Container.Vertical full={full}>
      {label && <Typography testID="label">{label}</Typography>}
      {Platform.OS === 'web' ? (
        <SelectWeb
          disabled={disabled}
          options={options}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      ) : (
        <SelectAndroid
          name={name}
          disabled={disabled}
          options={options}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      )}
      {error && (
        <Typography color="DANGER" size="SM" testID="error">
          {error}
        </Typography>
      )}
    </Container.Vertical>
  )
}
