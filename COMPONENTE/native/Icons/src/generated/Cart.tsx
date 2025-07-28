import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Cart(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feCart0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feCart1" fill="currentColor">
          <Path
            id="feCart2"
            d="M8 16h8a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1V4H5a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1v2.001L8.073 5h9.854C19.072 5 20 5.895 20 7c0 .146-.017.291-.05.434l-1.151 5c-.21.915-1.052 1.566-2.024 1.566H8.073L8 13.999V16Zm-.5 6a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Zm9 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3ZM8 7v5h8.831L18 7H8Z"
          />
        </G>
      </G>
    </Svg>
  )
}
