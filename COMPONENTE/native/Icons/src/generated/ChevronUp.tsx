import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ChevronUp(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feArrowUp0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feArrowUp1" fill="currentColor">
          <Path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6z" />
        </G>
      </G>
    </Svg>
  )
}
