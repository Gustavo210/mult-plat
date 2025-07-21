import React from 'react'
import styled, { DefaultTheme } from 'styled-components/native'

import { Container } from '@mobilestock-native/container'

interface ContentAreaProps {
  children: React.ReactNode
  direction?: 'ROW' | 'COLUMN'
  padding?: Uppercase<keyof DefaultTheme['padding'] & string>
  gap?: Uppercase<keyof DefaultTheme['gaps'] & string>
  noFlex?: boolean
}

export function ContentArea({ children, direction = 'ROW', noFlex = false, padding = 'NONE', gap }: ContentAreaProps) {
  if (direction === 'ROW') {
    return (
      <RowContainer $noFlex={noFlex} $padding={padding} $gap={gap}>
        {children}
      </RowContainer>
    )
  }
  return (
    <ColumnContainer $noFlex={noFlex} $gap={gap}>
      {children}
    </ColumnContainer>
  )
}

const RowContainer = styled(Container)<{
  $noFlex?: boolean
  $padding?: ContentAreaProps['padding']
  $gap?: ContentAreaProps['gap']
}>`
  flex-direction: row;
  width: 100%;
  padding: ${({ $padding, theme }) => ($padding ? theme.padding[$padding.toLowerCase()] : 0)};
  gap: ${({ $gap, theme }) => ($gap ? theme.gaps[$gap.toLowerCase()] : theme.gaps.md)};
  justify-content: space-around;
  flex: ${({ $noFlex }) => ($noFlex ? 'none' : 1)};
`

const ColumnContainer = styled.View<{
  $noFlex?: boolean
  $padding?: ContentAreaProps['padding']
  $gap?: ContentAreaProps['gap']
}>`
  flex-direction: column;
  width: 100%;
  padding: ${({ $padding, theme }) => ($padding ? theme.padding[$padding.toLowerCase()] : 0)};
  gap: ${({ $gap, theme }) => ($gap ? theme.gaps[$gap.toLowerCase()] : theme.gaps.none)};
  height: auto;
  align-items: stretch;
  justify-content: space-around;
  flex: ${({ $noFlex }) => ($noFlex ? 'none' : 1)};
`
