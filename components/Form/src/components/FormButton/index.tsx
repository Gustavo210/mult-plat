import { GestureResponderEvent } from 'react-native'

import { Button, ButtonProps } from '@mobilestock-native/button'

import { useForm } from '../../hooks/useForm'

export interface FormButtonProps extends ButtonProps {
  type?: 'SUBMIT' | 'RESET' | 'BUTTON'
}

export function FormButton({ type = 'SUBMIT', disabled, isLoading, onPress, ...props }: FormButtonProps) {
  const { submitForm, clearForm, loading } = useForm()

  function handlePress(event: GestureResponderEvent) {
    switch (type) {
      case 'SUBMIT':
        submitForm()
        break
      case 'RESET':
        clearForm()
        break
      default:
        onPress?.(event)
    }
  }

  return (
    <Button
      size="LG"
      {...props}
      onPress={handlePress}
      isLoading={(type === 'SUBMIT' && loading) || isLoading}
      disabled={loading || isLoading || disabled}
    />
  )
}
