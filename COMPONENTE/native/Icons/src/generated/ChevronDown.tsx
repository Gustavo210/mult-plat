import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ChevronDown(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feArrowDown0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feArrowDown1" fill="currentColor">
          <Path id="feArrowDown2" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z" />
        </G>
      </G>
    </Svg>
  )
}
