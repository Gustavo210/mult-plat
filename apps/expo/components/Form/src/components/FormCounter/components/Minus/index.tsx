import { Button, TypeButton } from '../Button'

export function Minus(props: Partial<Omit<TypeButton, 'type'>>) {
  return <Button {...props} type="MINUS" />
}

Minus.displayName = 'Form.FormCounter.Minus'
