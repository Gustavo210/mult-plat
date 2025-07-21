import { ReactNode } from 'react'
import styled, { DefaultTheme } from 'styled-components/native'

import { Container, ViewBaseProps } from '@mobilestock-native/container'

import { useFooterContext } from '../../../footerContext'

interface FloatAreaProps extends Omit<ViewBaseProps, 'align'> {
  children: ReactNode
  align?: 'LEFT' | 'RIGHT'
  padding?: Uppercase<keyof DefaultTheme['padding'] & string>
}

export function FloatArea({ children, align = 'LEFT', padding = '2XS', ...rest }: FloatAreaProps) {
  const { footerHeight } = useFooterContext()

  if (!footerHeight) return null

  return (
    <FloatAreaWrapper $align={align} $footerHeight={footerHeight} $padding={padding} {...rest}>
      {children}
    </FloatAreaWrapper>
  )
}

const FloatAreaWrapper = styled(Container.Vertical)<{
  $align: FloatAreaProps['align']
  $footerHeight: number
  $padding: NonNullable<FloatAreaProps['padding']>
}>`
  position: absolute;
  bottom: ${({ $footerHeight }) => $footerHeight + 12}px;
  padding: ${({ theme, $padding }) => theme.padding[$padding.toLowerCase()]};
  max-width: 25%;
  align-items: center;
  align-self: ${({ $align }) => ($align === 'RIGHT' ? 'flex-end' : 'flex-start')};
  overflow: hidden;
`
