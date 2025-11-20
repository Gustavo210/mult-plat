import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Clickable } from '@mobilestockweb/clickable'
import { Container } from '@mobilestockweb/container'
import { Typography } from '@mobilestockweb/typography'

import { useCounter } from '../../hooks/useCount'
import { Slot } from '../Slot'

export function Display() {
  const { count, editable, configureCount } = useCounter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(count.toString())

  useEffect(() => {
    setInputValue(count.toString())
  }, [count])

  function handleExitInput(event: React.FocusEvent<HTMLInputElement>) {
    const parsedValue = Number(event.target.value)
    configureCount(Number.isNaN(parsedValue) ? 0 : parsedValue)
    setIsEditing(false)
  }

  function handleKeyDownOnInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      inputRef.current?.blur()
    }
  }

  if (editable) {
    return (
      <Clickable onClick={() => setIsEditing(true)} type="button">
        <Container.Horizontal padding="NONE_2XS">
          <Slot>
            {isEditing ? (
              <Input
                data-testid="counter-input"
                ref={inputRef}
                value={inputValue}
                autoFocus
                onKeyDown={handleKeyDownOnInput}
                type="text"
                inputMode="numeric"
                onChange={event => setInputValue(event.target.value)}
                onFocus={event => event.target.select()}
                onBlur={handleExitInput}
              />
            ) : (
              <Typography weight="BOLD" size="LG">
                {count}
              </Typography>
            )}
          </Slot>
        </Container.Horizontal>
      </Clickable>
    )
  }

  return (
    <Container.Horizontal padding="NONE_2XS">
      <Slot>
        <Typography weight="BOLD" size="LG">
          {count}
        </Typography>
      </Slot>
    </Container.Horizontal>
  )
}

const Input = styled.input`
  &:focus {
    outline: none;
    box-shadow: none;
  }
  border: none;
  background-color: transparent;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
  -moz-appearance: textfield;
  font-weight: bold;
  font-size: ${({ theme }) => theme?.font?.size?.lg || 16}px;
  text-align: center;
  width: 40px;
  height: 34px;
`

Display.displayName = 'Form.FormCounter.Display'
