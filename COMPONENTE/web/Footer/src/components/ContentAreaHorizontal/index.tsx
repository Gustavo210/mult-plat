import { Container, ViewBaseProps } from '@mobilestockweb/container'

export interface ContentHorizontalProps extends ViewBaseProps {
  children: React.ReactNode
}

export function Horizontal({ children, ...rest }: ContentHorizontalProps) {
  return (
    <Container.Horizontal full {...rest}>
      {children}
    </Container.Horizontal>
  )
}
