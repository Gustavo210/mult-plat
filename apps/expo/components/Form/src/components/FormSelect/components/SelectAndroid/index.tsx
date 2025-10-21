import { useField } from '@unform/core'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'

import { Clickable } from '@mobilestock-native/clickable'
import { Container } from '@mobilestock-native/container'
import { Icon } from '@mobilestock-native/icons'
import { Typography } from '@mobilestock-native/typography'

import { CustomOption, FormSelectPropsBase } from '../..'
import { useForm } from '../../../../hooks/useForm'
import { FormSheet } from './components/FormSheet'

interface ContainerInputFakeProps {
  error?: boolean
}

export function SelectAndroid({ options, placeholder, disabled, defaultValue, name }: FormSelectPropsBase) {
  const Theme = useTheme()
  const { loading } = useForm()
  const { fieldName, registerField, error, defaultValue: unformDefaultValue } = useField(name)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<CustomOption | null>(unformDefaultValue || defaultValue || null)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected?.value || '',
      setValue: (_, value) => {
        const item = options.find(option => option.value === value)
        if (item) {
          setSelected(item)
        }
      },
      clearValue: () => {
        setSelected(null)
      }
    })
  }, [fieldName, registerField, selected, options])

  return (
    <>
      <Clickable disabled={disabled || loading} onPress={() => setShowModal(true)} testID="select-android">
        <ContainerInputFake
          padding="NONE_XS_NONE_MD"
          error={!!error}
          testID="select-android-container"
          align="BETWEEN_CENTER"
        >
          <Container.Horizontal>
            <Typography color={selected ? 'DEFAULT' : 'DEFAULT_200'}>{selected?.label || placeholder}</Typography>
          </Container.Horizontal>
          <Container.Horizontal
            style={{
              opacity: 0.3
            }}
            gap="XS"
            align="CENTER"
          >
            <VerticalSeparator error={!!error} />
            <Icon name="ChevronDown" size="XS" color={error ? Theme.colors.alert.urgent : Theme.colors.text.default} />
          </Container.Horizontal>
        </ContainerInputFake>
      </Clickable>
      {!disabled && !loading && (
        <FormSheet
          options={options}
          onClose={() => setShowModal(false)}
          visible={showModal}
          placeholder={placeholder}
          selectValue={selected}
          onSelect={item => {
            setSelected(item)
          }}
        />
      )}
    </>
  )
}

const ContainerInputFake = styled(Container.Horizontal)<ContainerInputFakeProps>`
  overflow: hidden;
  height: 47px;
  background-color: ${({ error, theme }) => (error ? theme.colors.input.error : theme.colors.input.default)};
  border: 1px solid ${({ error, theme }) => (error ? theme.colors.alert.urgent : theme.colors.input.border)};
  border-radius: 5px;
`
const VerticalSeparator = styled(Container.Vertical)<{ error: boolean }>`
  width: 1px;
  height: 30px;
  background-color: ${({ theme, error }) => (error ? theme.colors.alert.urgent : theme.colors.text.default)};
`
