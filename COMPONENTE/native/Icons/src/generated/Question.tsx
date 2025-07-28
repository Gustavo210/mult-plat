import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Question(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feQuestion0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feQuestion1" fill="currentColor">
          <Path
            id="feQuestion2"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm-1-4h2v2h-2v-2Zm0-1.992s2-.008 2 0C13 13.006 16 12 16 10c0-2.21-1.773-4-3.991-4A4 4 0 0 0 8 10h2c0-1.1.9-2 2-2s2 .9 2 2c0 .9-3 2.367-3 4.008Z"
          />
        </G>
      </G>
    </Svg>
  )
}
