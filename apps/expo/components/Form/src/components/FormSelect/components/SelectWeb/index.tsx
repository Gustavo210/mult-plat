import { useField } from '@unform/core'
import { mergeWith } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import ReactSelect, { CSSObjectWithLabel } from 'react-select'
import { useTheme } from 'styled-components'

import { CustomOption, FormSelectPropsBase } from '../..'
import { useForm } from '../../../../hooks/useForm'

export function SelectWeb({ options, placeholder, disabled, name, defaultValue }: FormSelectPropsBase) {
  const Theme = useTheme()
  const { loading } = useForm()
  const { fieldName, defaultValue: unformDefaultValue, registerField, error } = useField(name)
  const selectRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        const selectValue: CustomOption[] = ref?.state?.selectValue?.[0]?.value || ''
        return selectValue
      }
    })
  }, [fieldName, registerField])

  const performStyles = useCallback((base: CSSObjectWithLabel) => {
    return function (style: CSSObjectWithLabel): CSSObjectWithLabel {
      return mergeWith(style, base)
    }
  }, [])
  return (
    <ReactSelect<CustomOption>
      options={[
        {
          label: placeholder,
          options
        }
      ]}
      placeholder={placeholder}
      defaultInputValue={defaultValue?.label ?? unformDefaultValue?.label ?? undefined}
      menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
      menuPosition="fixed"
      styles={{
        container: performStyles({
          width: '100%',
          display: 'flex',
          height: '3rem'
        }),
        control: performStyles({
          width: '100%',
          backgroundColor: error ? Theme.colors.input.error : undefined,
          borderColor: error ? Theme.colors.alert.urgent : undefined
        }),
        indicatorSeparator: performStyles({
          backgroundColor: error ? Theme.colors.alert.urgent : undefined
        }),
        dropdownIndicator: performStyles({
          color: error ? Theme.colors.alert.urgent : undefined
        }),
        option: (data, state) => ({
          ...data,
          backgroundColor: state.isSelected ? Theme.colors.listItem.selected : Theme.colors.listItem.default
        })
      }}
      defaultValue={defaultValue}
      ref={selectRef}
      isDisabled={disabled || loading}
    />
  )
}
