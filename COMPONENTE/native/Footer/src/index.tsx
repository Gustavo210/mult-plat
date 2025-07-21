import React from 'react'
import { Dimensions } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'

import { FooterProvider, useFooterContext } from '../footerContext'
import { ContentArea } from './components/ContentArea'
import { FloatArea } from './components/FloatArea'
import { Title } from './components/FooterTitle'

interface FooterProps {
  children?: React.ReactNode
  full?: boolean
  backGroundColor?: string
  padding?: Uppercase<keyof DefaultTheme['padding'] & string>
  bottomSpace?: Uppercase<keyof DefaultTheme['padding'] & string>
  gap?: Uppercase<keyof DefaultTheme['gaps'] & string>
}

export function FooterComponent({
  children,
  full = true,
  backGroundColor,
  padding = 'XS',
  bottomSpace,
  gap = 'NONE'
}: FooterProps) {
  return (
    <FooterProvider>
      <FooterWithContext
        full={full}
        backGroundColor={backGroundColor}
        padding={padding}
        bottomSpace={bottomSpace}
        gap={gap}
      >
        {children}
      </FooterWithContext>
    </FooterProvider>
  )
}

function FooterWithContext({
  children,
  full,
  backGroundColor = '',
  padding = 'XS',
  bottomSpace,
  gap = 'NONE'
}: FooterProps) {
  const { setFooterHeight, footerHeight } = useFooterContext()

  function returnFooterHeight(event: any) {
    const { height } = event.nativeEvent.layout
    setFooterHeight(height)
  }

  const childrenArray = React.Children.toArray(children)

  const FloatAreas = childrenArray.filter((child: any) => child.type === FloatArea)

  const regularChildren = childrenArray.filter((child: any) => child.type !== FloatArea)

  return (
    <>
      {FloatAreas}
      <AntiFooter height={footerHeight} />
      <FooterContainer
        onLayout={returnFooterHeight}
        $backGroundColor={backGroundColor}
        $padding={padding}
        $bottomSpace={bottomSpace ?? padding}
        $full={full}
        gap={gap}
      >
        {regularChildren}
      </FooterContainer>
    </>
  )
}

export const Footer = Object.assign(FooterComponent, {
  FloatArea,
  Title,
  ContentArea
})

const AntiFooter = styled.View<{ height: number }>`
  height: ${({ height }) => `${height}px`};
`

const FooterContainer = styled.View<{
  $backGroundColor?: string
  $padding: NonNullable<FooterProps['padding']>
  $bottomSpace: NonNullable<FooterProps['bottomSpace']>
  $full?: boolean
  gap: NonNullable<FooterProps['gap']>
}>`
  position: absolute;
  bottom: 0;
  justify-self: center;
  width: ${({ $full }) => ($full ? `${Dimensions.get('window').width}px` : '100%')};
  min-height: 16px;
  padding: ${({ $padding, theme }) => theme.padding[$padding.toLocaleLowerCase()]};
  gap: ${({ gap, theme }) => theme.gaps[gap.toLocaleLowerCase()]};
  z-index: 10;
  background-color: ${({ $backGroundColor }) => $backGroundColor || ''};
  padding-bottom: ${({ $bottomSpace, theme }) => theme.padding[$bottomSpace.toLocaleLowerCase()]};
  margin-bottom: 12px;
`
