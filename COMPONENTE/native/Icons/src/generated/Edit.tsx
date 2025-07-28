import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Edit(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feEdit0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feEdit1" fill="currentColor">
          <Path
            id="feEdit2"
            d="M5 20h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm-1-5L14 5l3 3L7 18H4v-3ZM15 4l2-2l3 3l-2.001 2.001L15 4Z"
          />
        </G>
      </G>
    </Svg>
  )
}
