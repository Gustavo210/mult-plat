import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Calendar(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feCalendar0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feCalendar1" fill="currentColor">
          <Path
            id="feCalendar2"
            d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2v2ZM5 8v12h14V8H5Zm2 3h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm0 4h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm-4 0h2v2H7v-2Z"
          />
        </G>
      </G>
    </Svg>
  )
}
