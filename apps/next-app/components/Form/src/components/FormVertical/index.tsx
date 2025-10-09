import { Container, ViewBaseProps } from '@mobilestockweb/container'

export function FormVertical({ children, ...props }: ViewBaseProps) {
  return (
    <Container.Vertical gap="SM" {...props}>
      {children}
    </Container.Vertical>
  )
}
