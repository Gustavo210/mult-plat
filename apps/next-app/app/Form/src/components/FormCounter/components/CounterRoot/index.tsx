import { CounterRootProps } from '../..'
import { CounterProvider } from '../../hooks/useCount'
import { CustomView } from '../CustomView'
import { DefaultView } from '../DefaultView'

export function CounterRoot({ children, ...props }: CounterRootProps) {
  return (
    <CounterProvider buttonTransparent={false} labelPosition="TOP_START" multiplier={1} {...props}>
      {children ? <CustomView>{children}</CustomView> : <DefaultView />}
    </CounterProvider>
  )
}
