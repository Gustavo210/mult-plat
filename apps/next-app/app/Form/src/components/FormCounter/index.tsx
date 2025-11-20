import { Badge } from './components/Badge'
import { CounterRoot } from './components/CounterRoot'
import { Display } from './components/Display'
import { Minus } from './components/Minus'
import { Plus } from './components/Plus'
import { CounterEventName } from './hooks/useCount'

export interface CounterRootProps {
  children?: React.ReactNode
  initialCount?: number
  maxCount?: number
  minCount?: number
  label?: string
  name: string
  /**
   * @default false
   * @description if true, the Display component will be editable, allowing the user to type a number directly into it.
   */
  editable?: boolean
  /**
   * @default 1
   * @description The value by which the counter increments or decrements when the buttons are pressed in long press mode.
   */
  multiplier?: number

  /**
   * @default 'TOP_START'
   * @description Position of the label relative to the counter.
   */
  labelPosition?: 'TOP_START' | 'LEFT' | 'TOP_CENTER'
  /**
   * @default false
   * @description If true, the buttons will have a transparent background.
   */
  buttonTransparent?: boolean
  /**
   * @default false
   * @description If true, the counter elements (buttons and display) will be grouped together.
   */
  groupElements?: boolean
  onChange?(data: { value: number; event: CounterEventName }): void
}

export const FormCounter = Object.assign(CounterRoot, {
  Display,
  Plus,
  Minus,
  Badge
})
