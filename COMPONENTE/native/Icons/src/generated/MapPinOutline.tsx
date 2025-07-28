import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function MapPinOutline(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <Path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0" />
      </G>
    </Svg>
  )
}
