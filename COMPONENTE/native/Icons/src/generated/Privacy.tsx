import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Privacy(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm-1 6h2v2h-2zm0 4h2v6h-2z"
      />
    </Svg>
  )
}
