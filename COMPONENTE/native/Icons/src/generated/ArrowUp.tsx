import Svg, { Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ArrowUp(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19V5m-7 7l7-7l7 7"
      />
    </Svg>
  )
}
