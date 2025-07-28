import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Plus(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="fePlus0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="fePlus1" fill="currentColor">
          <Path id="fePlus2" d="M13 13v7a1 1 0 0 1-2 0v-7H4a1 1 0 0 1 0-2h7V4a1 1 0 0 1 2 0v7h7a1 1 0 0 1 0 2h-7Z" />
        </G>
      </G>
    </Svg>
  )
}
