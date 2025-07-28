import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Logout(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feLogout0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feLogout1" fill="currentColor">
          <Path
            id="feLogout2"
            d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2V5Zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2h6.586Z"
          />
        </G>
      </G>
    </Svg>
  )
}
