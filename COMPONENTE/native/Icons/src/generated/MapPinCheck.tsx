import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function MapPinCheck(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <Path d="M11.87 21.48a2 2 0 0 1-1.283-.58l-4.244-4.243a8 8 0 1 1 13.355-3.474M15 19l2 2l4-4" />
      </G>
    </Svg>
  )
}
