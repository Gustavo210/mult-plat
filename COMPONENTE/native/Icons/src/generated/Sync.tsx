import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Sync(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feSync0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feSync1" fill="currentColor">
          <Path
            id="feSync2"
            d="M6.876 15.124A6.002 6.002 0 0 0 17.658 14h2.09a8.003 8.003 0 0 1-14.316 2.568L3 19v-6h6l-2.124 2.124Zm10.249-6.249A6.004 6.004 0 0 0 6.34 10H4.25a8.005 8.005 0 0 1 14.32-2.57L21 5v6h-6l2.125-2.125Z"
          />
        </G>
      </G>
    </Svg>
  )
}
