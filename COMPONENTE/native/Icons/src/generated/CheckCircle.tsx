import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function CheckCircle(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feCheckCircle0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feCheckCircle1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feCheckCircle2"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10ZM8 10l-2 2l5 5l7-7l-2-2l-5 5l-3-3Z"
          />
        </G>
      </G>
    </Svg>
  )
}
