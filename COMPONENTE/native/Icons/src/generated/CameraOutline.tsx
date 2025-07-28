import Svg, { Circle, G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function CameraOutline(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <Circle cx={12} cy={13} r={4} />
      </G>
    </Svg>
  )
}
