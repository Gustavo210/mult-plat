import { Badge } from "./components/Badge";
import { CounterRoot } from "./components/CounterRoot";
import { Display } from "./components/Display";
import { Minus } from "./components/Minus";
import { Plus } from "./components/Plus";
import { CounterEventName } from "./hooks/useCount";

export interface CounterRootProps {
  children?: React.ReactNode;
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  editable?: boolean;
  label?: string;
  labelPosition?: "TOP_START" | "LEFT" | "TOP_CENTER";
  buttonTransparent?: boolean;
  groupElements?: boolean;
  name: string;
  onChange?: (data: { value: number; event: CounterEventName }) => void;
}

export const FormCounter = Object.assign(CounterRoot, {
  Display,
  Plus,
  Minus,
  Badge,
});
