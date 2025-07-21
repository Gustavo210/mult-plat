import { Container, ViewBaseProps } from '@mobilestockweb/container'

export interface ContentVerticalProps extends ViewBaseProps {
  children: React.ReactNode
}

export function Vertical({ children, ...rest }: ContentVerticalProps) {
  return (
    <Container.Vertical full {...rest}>
      {children}
    </Container.Vertical>
  )
}
