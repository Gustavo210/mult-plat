import { Container, ViewBaseProps } from '@mobilestockweb/container'

export function FormHorizontal({ children, ...props }: ViewBaseProps) {
  return (
    <Container.Horizontal gap="SM" {...props}>
      {children}
    </Container.Horizontal>
  )
}
