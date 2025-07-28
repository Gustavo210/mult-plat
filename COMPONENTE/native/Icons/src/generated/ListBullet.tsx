import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function ListBullet(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feListBullet0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feListBullet1" fill="currentColor">
          <Path
            id="feListBullet2"
            d="M10 4h10a1 1 0 0 1 0 2H10a1 1 0 1 1 0-2Zm0 7h10a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2Zm0 7h10a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2ZM5 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
          />
        </G>
      </G>
    </Svg>
  )
}
