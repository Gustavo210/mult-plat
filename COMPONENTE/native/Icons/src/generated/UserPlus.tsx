import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function UserPlus(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feUserPlus0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feUserPlus1" fill="currentColor">
          <Path
            id="feUserPlus2"
            d="M12 15c3.186 0 6.045.571 8 3.063V20H4v-1.937C5.955 15.57 8.814 15 12 15Zm0-3a4 4 0 1 1 0-8a4 4 0 0 1 0 8Zm8 2a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1v1Z"
          />
        </G>
      </G>
    </Svg>
  )
}
