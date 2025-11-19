import { useEffect, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputEndEditingEventData, TextInputFocusEventData } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Clickable } from '@mobilestock-native/clickable'
import { Container } from '@mobilestock-native/container'
import { Typography } from '@mobilestock-native/typography'

import { useCounter } from '../../hooks/useCount'
import { Slot } from '../Slot'

export function Display() {
  const Theme = useTheme()
  const { count, editable, configureCount } = useCounter()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(count.toString())

  useEffect(() => {
    setInputValue(count.toString())
  }, [count])

  function handleEndEditing(event: NativeSyntheticEvent<TextInputFocusEventData | TextInputEndEditingEventData>) {
    configureCount(Number(event.nativeEvent.text) || 0)
    setIsEditing(false)
  }

  if (editable) {
    return (
      <Clickable onPress={() => setIsEditing(true)}>
        <Container.Horizontal padding="NONE_2XS">
          <Slot>
            {isEditing ? (
              <TextInput
                testID="counter-input"
                value={inputValue}
                keyboardType="numeric"
                style={{
                  fontWeight: 'bold',
                  fontSize: Number(Theme.font.size.lg) || 16,
                  textAlign: 'center',
                  width: 40,
                  height: 40
                }}
                autoFocus
                selectTextOnFocus
                onBlur={handleEndEditing}
                onChangeText={setInputValue}
                onEndEditing={handleEndEditing}
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

Display.displayName = 'Form.FormCounter.Display'
