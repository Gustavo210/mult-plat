import Svg, { Circle, G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function EyeOutline(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8z" />
        <Circle cx={12} cy={12} r={3} />
      </G>
    </Svg>
  )
}
