import Svg, { Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function LightningBolt(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <Path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14v-8Z" />
    </Svg>
  )
}
