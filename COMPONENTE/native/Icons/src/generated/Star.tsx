import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Star(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feStar0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feStar1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feStar2"
            d="M12.5 17.925L6.629 21l1.121-6.512L3 9.875l6.564-.95L12.5 3l2.936 5.925l6.564.95l-4.75 4.613L18.371 21z"
          />
        </G>
      </G>
    </Svg>
  )
}
