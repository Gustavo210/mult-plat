import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function CreditCard(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feCreditCard0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feCreditCard1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feCreditCard2"
            d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v3h16V6H4Zm0 5v7h16v-7H4Zm2 3v2h4v-2H6Zm6 0v2h4v-2h-4Z"
          />
        </G>
      </G>
    </Svg>
  )
}
