import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Login(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feLogin0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feLogin1" fill="currentColor">
          <Path
            id="feLogin2"
            d="M9.586 11L7.05 8.464L8.464 7.05l4.95 4.95l-4.95 4.95l-1.414-1.414L9.586 13H3v-2h6.586ZM11 3h8c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-8v-2h8V5h-8V3Z"
          />
        </G>
      </G>
    </Svg>
  )
}
