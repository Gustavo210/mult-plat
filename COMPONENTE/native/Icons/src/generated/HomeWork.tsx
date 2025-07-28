import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function HomeWork(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1 11v10h6v-5h2v5h6V11L8 6zm12 8h-2v-5H5v5H3v-6.97l5-3.57l5 3.57zm4-12h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"
      />
      <Path fill="currentColor" d="M10 3v1.97l2 1.43V5h9v14h-4v2h6V3z" />
    </Svg>
  )
}
