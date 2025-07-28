import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Transfer(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="m15 12l5-4l-5-4v2.999H2v2h13zm7 3H9v-3l-5 4l5 4v-3h13z" />
    </Svg>
  )
}
