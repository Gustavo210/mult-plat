import Svg, { Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ArrowRight(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14m-7-7l7 7l-7 7"
      />
    </Svg>
  )
}
