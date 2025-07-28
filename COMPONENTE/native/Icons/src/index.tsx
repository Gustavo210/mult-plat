import { ViewProps } from 'react-native'
import styled, { DefaultTheme, css, useTheme } from 'styled-components/native'

import { IconName, iconMap } from './icon.map'

export type IconSize = Uppercase<keyof DefaultTheme['sizeIcons'] & string>

export interface IconProps extends ViewProps {
  name: IconName
  size?: IconSize
  color?: string
}

export function Icon({ size = 'MD', name, color, ...rest }: IconProps) {
  const theme = useTheme()
  const SpecificIconComponent = iconMap[name]

  return (
    <IconComponent $size={size} {...rest}>
      <SpecificIconComponent
        fill={color ?? theme.colors.text.default}
        color={color ?? theme.colors.text.default}
        width="100%"
        height="100%"
        title={name}
      />
    </IconComponent>
  )
}

const IconComponent = styled.View<{
  $size: IconSize
}>`
  ${({ theme, $size }) => css`
    width: ${theme.sizeIcons[$size.toLowerCase()]};
    height: ${theme.sizeIcons[$size.toLowerCase()]};
  `}
`
