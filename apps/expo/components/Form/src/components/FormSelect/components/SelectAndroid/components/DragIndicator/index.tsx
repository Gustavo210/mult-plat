import { useTheme } from 'styled-components/native'

import { Container, ViewBaseProps } from '@mobilestock-native/container'

export function DragIndicator(props: ViewBaseProps) {
  const Theme = useTheme()
  return (
    <Container.Horizontal
      style={{
        width: 100,
        height: 4,
        borderRadius: 5,
        backgroundColor: Theme.colors.container.shadow
      }}
      {...props}
    />
  )
}
