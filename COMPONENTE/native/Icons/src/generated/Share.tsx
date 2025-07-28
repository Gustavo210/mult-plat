import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Share(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feShare0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feShare1" fill="currentColor">
          <Path
            id="feShare2"
            d="M14.839 14.92a3 3 0 1 1-.8 1.599l-4.873-2.443a3 3 0 1 1 0-4.151l4.873-2.443a3 3 0 1 1 .8 1.599l-4.877 2.438a3.022 3.022 0 0 1 0 .962l4.877 2.438ZM17 8a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0 10a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM7 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
          />
        </G>
      </G>
    </Svg>
  )
}
