import { Button, TypeButton } from '../Button'

export function Plus(props: Partial<Omit<TypeButton, 'type'>>) {
  return <Button {...props} type="PLUS" />
}

Plus.displayName = 'Form.FormCounter.Plus'
