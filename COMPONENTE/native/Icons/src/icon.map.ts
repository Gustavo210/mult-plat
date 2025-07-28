import React from 'react'

import * as IconComponents from './generated'

type BaseIconProps = React.ComponentProps<typeof import('react-native-svg').Svg>

export const iconMap = IconComponents as Record<string, React.ComponentType<BaseIconProps>>

export type IconName = keyof typeof IconComponents
