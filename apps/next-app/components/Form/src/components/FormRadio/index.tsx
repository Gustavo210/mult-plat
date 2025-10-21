import { useField } from '@unform/core'
import { InputHTMLAttributes, useRef } from 'react'
import styled from 'styled-components'

import { Container } from '@mobilestockweb/container'
import { Typography } from '@mobilestockweb/typography'

import { useForm } from '../../hooks/useForm'

export interface PropsFormInputRadio extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  value: string
}

export function FormRadio(props: PropsFormInputRadio) {
  const { loading } = useForm()
  const { error, fieldName, registerField } = useField(props.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = `radio_${props.name}_${props.label}`

  function updateActiveRadio() {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => ref.current.value,
      clearValue: ref => {
        ref.current.checked = false
      }
    })
  }

  return (
    <Container.Vertical onClick={updateActiveRadio} gap="XS" padding="2XS_NONE">
      <Container.Horizontal align="START_CENTER" gap="XS">
        <Input id={id} ref={inputRef} {...props} type="radio" disabled={loading} />
        <Label htmlFor={id} size="MD">
          {props.label}
        </Label>
      </Container.Horizontal>
      {error && (
        <Typography color="DANGER" size="SM">
          {error}
        </Typography>
      )}
    </Container.Vertical>
  )
}

const Input = styled.input`
  width: 1rem;
  height: 1rem;
`
const Label = styled(Typography).attrs({ forwardedAs: 'label' })<{ htmlFor: string }>``
