import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function DocumentVerified(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="none" stroke="currentColor" strokeWidth={2} d="M2.998 1H17.5L21 4.5V23H3zM16 1v5h5M7.5 15l3 3l6-6" />
    </Svg>
  )
}
