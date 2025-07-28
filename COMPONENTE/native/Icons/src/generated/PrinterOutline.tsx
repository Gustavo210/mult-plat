import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function PrinterOutline(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <Path d="M6 14h12v8H6z" />
      </G>
    </Svg>
  )
}
