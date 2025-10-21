import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import ReactSelect, { GroupBase, Props } from 'react-select'
import styled from 'styled-components'

import { Container } from '@mobilestockweb/container'
import { Typography } from '@mobilestockweb/typography'

import { useForm } from '../../hooks/useForm'

interface CustomOption {
  label: string
  value: string
}

interface SelectProps<Option extends CustomOption, IsMulti extends boolean, Group extends GroupBase<Option>>
  extends Omit<Props<Option, IsMulti, Group>, 'isDisabled'> {
  name: string
  disabled?: boolean
  label?: string
}

export function FormSelect<
  Option extends CustomOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
  const { loading } = useForm()
  const { fieldName, defaultValue, registerField, error } = useField(props.name)
  const selectRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        const selectValue: Option[] = ref?.state?.selectValue
        if (!selectValue) return props?.isMulti ? [] : ''

        return props?.isMulti ? selectValue.map((item: Option) => item.value) : selectValue[0]?.value
      }
    })
  }, [fieldName, registerField, props.isMulti])

  return (
    <ContainerSelect $isWrong={!!error}>
      {props?.label && (
        <Label htmlFor={fieldName} size="MD">
          {props.label}
        </Label>
      )}
      <ReactSelect
        defaultValue={defaultValue}
        {...props}
        className="react-select"
        classNamePrefix="react-select"
        ref={selectRef}
        isDisabled={loading || props.disabled}
      />
      {error && (
        <Typography color="DANGER" size="SM">
          {error}
        </Typography>
      )}
    </ContainerSelect>
  )
}

export const ContainerSelect = styled(Container.Vertical)<{ $isWrong: boolean }>`
  .react-select {
    background-color: ${({ $isWrong, theme }) => ($isWrong ? theme.colors.input.error : theme.colors.input.default)};
    border: 1px solid ${({ $isWrong, theme }) => ($isWrong ? theme.colors.alert.urgent : theme.colors.input.border)};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    height: 2.7rem;
    width: 100%;
  }
  .react-select__control {
    background-color: ${({ $isWrong, theme }) => ($isWrong ? theme.colors.input.error : theme.colors.input.default)};
    border: none;
    height: 100%;
  }
  .react-select__placeholder {
    padding: 0.3rem;
  }
  .react-select__menu {
    color: ${({ theme }) => theme.colors.select.text};
    background-color: ${({ theme }) => theme.colors.select.default};
    height: auto;
  }
  .react-select__option--is-focused {
    color: ${({ theme }) => theme.colors.text.contrast};
    background-color: ${({ theme }) => theme.colors.select.focused};
  }
`

const Label = styled(Typography).attrs({ forwardedAs: 'label' })<{ htmlFor: string }>``
