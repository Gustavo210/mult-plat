import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ShoppingBag(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feShoppingBag0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feShoppingBag1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feShoppingBag2"
            d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h3Zm-3 2v9h14v-9h-3.002v3H14v-3h-4v3H8v-3H5Zm5-2h4V5h-4v3Z"
          />
        </G>
      </G>
    </Svg>
  )
}
