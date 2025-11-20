import { useMemo, useRef } from 'react'
import styled from 'styled-components'

import { ButtonProps, Button as ButtonRaw } from '@mobilestockweb/button'

import { useForm } from '../../../../hooks/useForm'
import { useCounter } from '../../hooks/useCount'
import { Slot } from '../Slot'

type ButtonType = 'PLUS' | 'MINUS'

export interface TypeButton extends Pick<ButtonProps, 'disabled' | 'text' | 'backgroundColor'> {
  type: ButtonType
  disabled?: boolean
}

export function Button({ type, disabled, ...props }: TypeButton) {
  const { loading } = useForm()
  const Counter = useCounter()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const disabledPress = useMemo(() => {
    if (type === 'PLUS' && Counter.maxCount !== undefined) {
      return Counter.count >= Counter.maxCount
    }
    if (type === 'MINUS' && Counter.minCount !== undefined) {
      return Counter.count <= Counter.minCount
    }
    return false
  }, [type, Counter.count, Counter.maxCount, Counter.minCount])

  function handlePress() {
    if (type === 'PLUS') {
      Counter.increment()
    } else {
      Counter.decrement()
    }
  }

  function startPress() {
    timerRef.current = setTimeout(() => {
      if ('vibrate' in navigator) {
        navigator.vibrate(500)
      }
      if (type === 'PLUS') {
        Counter.increment(Counter.multiplier)
      } else {
        Counter.decrement(Counter.multiplier)
      }
    }, 500)
  }

  function endPress() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <Slot>
      <CustomButton
        type="button"
        icon={type === 'PLUS' ? 'Plus' : 'Minus'}
        backgroundColor={type === 'PLUS' ? 'DEFAULT_DARK' : 'CANCEL_DARK'}
        {...props}
        size="SM"
        variant={Counter.buttonTransparent ? 'TRANSPARENT' : 'DEFAULT'}
        $grouped={Counter.groupElements}
        disabled={disabledPress || disabled || loading}
        onClick={handlePress}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
      />
    </Slot>
  )
}
const CustomButton = styled(ButtonRaw)<{ $grouped?: boolean }>`
  border-radius: ${({ $grouped, theme }) => ($grouped ? theme.borderRadius.none : theme.borderRadius.default)};
`
