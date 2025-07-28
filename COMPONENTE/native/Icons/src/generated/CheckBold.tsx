import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function CheckBold(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feCheck0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feCheck1" fill="currentColor">
          <Path id="feCheck2" d="m6 10l-2 2l6 6L20 8l-2-2l-8 8z" />
        </G>
      </G>
    </Svg>
  )
}
