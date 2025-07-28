import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Tag(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feTag0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feTag1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feTag2"
            d="m4.981 14.887l4.132 4.132l9.906-9.906V4.981h-4.132L4.98 14.887ZM13.486 3.58a1.98 1.98 0 0 1 1.4-.58h4.133C20.113 3 21 3.887 21 4.981v4.132c0 .526-.209 1.03-.58 1.401l-9.906 9.906a1.981 1.981 0 0 1-2.802 0L3.58 16.288a1.981 1.981 0 0 1 0-2.802l9.906-9.906ZM16 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
          />
        </G>
      </G>
    </Svg>
  )
}
