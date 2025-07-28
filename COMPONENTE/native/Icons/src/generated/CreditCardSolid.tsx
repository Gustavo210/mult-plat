import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function CreditCardSolid(props: SvgProps) {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <G fill="currentColor">
        <Path d="M2.5 3A1.5 1.5 0 0 0 1 4.5V5h14v-.5A1.5 1.5 0 0 0 13.5 3z" />
        <Path
          fillRule="evenodd"
          d="M15 7H1v4.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5zM3 10.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75m3.75-.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </G>
    </Svg>
  )
}
