import { useField } from '@unform/core'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { CounterRootProps } from '..'

export type CounterVariant = 'DEFAULT' | 'GROUPED' | 'NAKED'

export type CounterEventName = 'INCREMENT' | 'DECREMENT' | 'EDIT'

interface CounterContextType extends Omit<CounterRootProps, 'name'> {
  count: number
  increment(multiplier?: number): void
  decrement(multiplier?: number): void
  configureCount(value: number): void
  error?: string
}
const CounterContext = createContext<CounterContextType | undefined>(undefined)

export function CounterProvider(props: CounterRootProps) {
  const { fieldName, registerField, error, defaultValue } = useField(props.name)
  const [count, setCount] = useState(0)

  const prepareSetCount = useCallback(
    (value: number) => {
      let newVal = value
      if (props.maxCount !== undefined && newVal > props.maxCount) {
        newVal = props.maxCount
      }
      if (props.minCount !== undefined && newVal < props.minCount) {
        newVal = props.minCount
      }
      return newVal
    },
    [props.maxCount, props.minCount]
  )

  const configureCount = useCallback(
    (value: number) => {
      const newVal = prepareSetCount(value)
      setCount(newVal)
      props.onChange?.({
        value: newVal,
        event: 'EDIT'
      })
    },
    [prepareSetCount]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => count,
      setValue: (_, value) => configureCount(value),
      clearValue: () => configureCount(0)
    })
  }, [fieldName, count, registerField, configureCount])

  useEffect(() => {
    configureCount(Number(props.initialCount) || Number(defaultValue) || 0)
  }, [props.initialCount, configureCount, defaultValue])

  function increment(multiplier = 1) {
    setCount(lastVal => {
      const newVal = prepareSetCount(lastVal + 1 * multiplier)
      props.onChange?.({
        value: newVal,
        event: 'INCREMENT'
      })
      return newVal
    })
  }

  function decrement(multiplier = 1) {
    setCount(lastVal => {
      const newVal = prepareSetCount(lastVal - 1 * multiplier)
      props.onChange?.({
        value: newVal,
        event: 'DECREMENT'
      })
      return newVal
    })
  }

  return (
    <CounterContext.Provider
      value={{
        count,
        increment,
        decrement,
        configureCount,
        multiplier: props.multiplier,
        maxCount: props.maxCount,
        minCount: props.minCount,
        editable: props.editable,
        label: props.label,
        labelPosition: props.labelPosition,
        buttonTransparent: props.buttonTransparent,
        groupElements: props.groupElements,
        error
      }}
    >
      {props.children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}
