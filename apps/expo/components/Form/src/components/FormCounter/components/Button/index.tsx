import { useMemo } from 'react'
import { Vibration } from 'react-native'
import styled from 'styled-components/native'

import { ButtonProps, Button as ButtonRaw } from '@mobilestock-native/button'

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

  function handleLongPress() {
    Vibration.vibrate(50)

    if (type === 'PLUS') {
      Counter.increment(Counter.multiplier)
    } else {
      Counter.decrement(Counter.multiplier)
    }
  }

  return (
    <Slot>
      <CustomButton
        backgroundColor={type === 'PLUS' ? 'DEFAULT_DARK' : 'CANCEL_DARK'}
        {...props}
        size="SM"
        icon={type === 'PLUS' ? 'Plus' : 'Minus'}
        variant={Counter.buttonTransparent ? 'TRANSPARENT' : 'DEFAULT'}
        $grouped={Counter.groupElements}
        disabled={disabledPress || disabled || loading}
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={500}
      />
    </Slot>
  )
}
const CustomButton = styled(ButtonRaw)<{ $grouped?: boolean }>`
  border-radius: ${({ $grouped, theme }) => ($grouped ? theme.borderRadius.none : theme.borderRadius.default)};
`
