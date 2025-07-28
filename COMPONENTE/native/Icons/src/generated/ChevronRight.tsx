import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ChevronRight(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feArrowRight0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feArrowRight1" fill="currentColor">
          <Path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z" />
        </G>
      </G>
    </Svg>
  )
}
