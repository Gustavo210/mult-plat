import Svg, { Circle, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Adjustments(props: SvgProps) {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M368 128h80m-384 0h240m64 256h80m-384 0h240m-96-128h240m-384 0h80"
      />
      <Circle
        cx={336}
        cy={128}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Circle
        cx={176}
        cy={256}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Circle
        cx={336}
        cy={384}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </Svg>
  )
}
