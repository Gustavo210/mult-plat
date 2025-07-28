import Svg, { G, Path, Rect } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function Lock(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Rect rx={8} fill="none" />
      <G id="feLock0" fill="none" fillRule="evenodd" stroke="none" strokeWidth={1}>
        <G id="feLock1" fill="currentColor">
          <Path
            id="feLock2"
            d="M7 10V7a5 5 0 1 1 10 0v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm-1 2v8h12v-8H6Zm3-2h6V7a3 3 0 0 0-6 0v3Zm5 4h2v4h-2v-4Z"
          />
        </G>
      </G>
    </Svg>
  )
}
