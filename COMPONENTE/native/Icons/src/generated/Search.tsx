import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Search(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feSearch0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feSearch1" fill="currentColor">
          <Path
            id="feSearch2"
            d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
          />
        </G>
      </G>
    </Svg>
  )
}
