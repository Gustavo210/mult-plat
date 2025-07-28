import Svg, { Circle, G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function UserCheck(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <Circle cx={9} cy={7} r={4} />
        <Path d="m16 11l2 2l4-4" />
      </G>
    </Svg>
  )
}
