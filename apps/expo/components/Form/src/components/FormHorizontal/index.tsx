import { Container, ViewBaseProps } from '@mobilestock-native/container'

export function FormHorizontal({ children, ...props }: ViewBaseProps) {
  return (
    <Container.Horizontal gap="SM" {...props}>
      {children}
    </Container.Horizontal>
  )
}
