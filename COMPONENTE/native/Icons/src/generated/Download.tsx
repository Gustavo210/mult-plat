import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Download(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feDownload0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feDownload1" fill="currentColor">
          <Path
            id="feDownload2"
            d="M5 19h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm8-5.825l3.243-3.242l1.414 1.414L12 17.004l-5.657-5.657l1.414-1.414L11 13.175V2h2v11.175Z"
          />
        </G>
      </G>
    </Svg>
  )
}
