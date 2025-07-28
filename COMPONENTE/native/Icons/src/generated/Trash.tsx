import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Trash(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feTrash0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feTrash1" fill="currentColor" fillRule="nonzero">
          <Path
            id="feTrash2"
            d="M4 5h3V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h3a1 1 0 0 1 0 2h-1v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4a1 1 0 1 1 0-2Zm3 2v13h10V7H7Zm2-2h6V4H9v1Zm0 4h2v9H9V9Zm4 0h2v9h-2V9Z"
          />
        </G>
      </G>
    </Svg>
  )
}
