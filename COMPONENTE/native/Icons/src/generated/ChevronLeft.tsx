import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ChevronLeft(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feArrowLeft0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feArrowLeft1" fill="currentColor">
          <Path id="feArrowLeft2" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z" />
        </G>
      </G>
    </Svg>
  )
}
