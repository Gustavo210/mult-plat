import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function MapPinX(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <Path d="M13.024 21.204a2 2 0 0 1-2.437-.304l-4.244-4.243a8 8 0 1 1 13.119-2.766M22 22l-5-5m0 5l5-5" />
      </G>
    </Svg>
  )
}
