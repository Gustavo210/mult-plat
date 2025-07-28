import Svg, { Circle, G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function UserX(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <Circle cx={8.5} cy={7} r={4} />
        <Path d="m18 8l5 5m0-5l-5 5" />
      </G>
    </Svg>
  )
}
