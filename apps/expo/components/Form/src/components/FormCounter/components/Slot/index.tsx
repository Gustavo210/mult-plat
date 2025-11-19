import styled from 'styled-components/native'

import { Container, ViewBaseProps } from '@mobilestock-native/container'

export function Slot(props: ViewBaseProps) {
  return <SlotContainer align="CENTER" {...props} />
}

const SlotContainer = styled(Container.Vertical)`
  min-width: 40px;
  height: 34px;
  user-select: none;
`
