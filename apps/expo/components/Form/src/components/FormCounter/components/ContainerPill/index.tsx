import styled, { css } from 'styled-components/native'

import { Container as ContainerRaw, ViewBaseProps } from '@mobilestock-native/container'

import { useCounter } from '../../hooks/useCount'

export function ContainerPill({ children, ...props }: ViewBaseProps) {
  const { groupElements, error } = useCounter()
  return (
    <Container align="CENTER" $groupElements={groupElements} $error={!!error} {...props}>
      {children}
    </Container>
  )
}

const Container = styled(ContainerRaw.Horizontal)<{
  $groupElements?: boolean
  $error?: boolean
}>`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  overflow: hidden;
  background-color: transparent;
  border: none;
  ${({ $groupElements, theme }) =>
    $groupElements &&
    css`
      background-color: ${theme.colors.input.default};

      border: 1px solid ${theme.colors.input.border};
    `}
  ${({ $error, theme }) =>
    $error &&
    css`
      background-color: ${theme.colors.input.error};
      border: 1px solid ${theme.colors.alert.urgent};
    `}
`
