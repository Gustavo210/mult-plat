import Svg, { Circle, G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function PlayCircle(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Circle cx={12} cy={12} r={10} />
        <Path d="m10 8l6 4l-6 4V8z" />
      </G>
    </Svg>
  )
}
