import Svg, { Circle, G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function AlertCircle(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Circle cx={12} cy={12} r={10} />
        <Path d="M12 8v4m0 4h.01" />
      </G>
    </Svg>
  )
}
