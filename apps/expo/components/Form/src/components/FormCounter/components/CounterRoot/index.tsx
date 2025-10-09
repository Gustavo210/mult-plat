import { CounterRootProps } from "../..";
import { CounterProvider } from "../../hooks/useCount";
import { CustomView } from "../CustomView";
import { DefaultView } from "../DefaultView";

export function CounterRoot({ children, ...props }: CounterRootProps) {
  return (
    <CounterProvider variant="DEFAULT" labelPosition="TOP_START" {...props}>
      {children ? <CustomView>{children}</CustomView> : <DefaultView />}
    </CounterProvider>
  );
}
