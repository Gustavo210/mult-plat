import { Container, ViewBaseProps } from '@mobilestock-native/container'

export function FormVertical({ children, ...props }: ViewBaseProps) {
  return (
    <Container.Vertical gap="SM" {...props}>
      {children}
    </Container.Vertical>
  )
}
