import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function DoubleCheck(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
      />
    </Svg>
  )
}
