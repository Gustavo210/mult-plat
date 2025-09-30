import { useForm } from "@/components/Form/src/hooks/useForm";
import { useField } from "@unform/core";
import { mergeWith } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import ReactSelect, { CSSObjectWithLabel } from "react-select";
import { CustomOption } from "../..";

interface SelectWebProps {
  options: CustomOption[];
  placeholder?: string;
  defaultValue?: CustomOption;
  value?: CustomOption;
  disabled?: boolean;
  name: string;
}

export function SelectWeb({
  options,
  placeholder,
  value,
  disabled,
  name,
  defaultValue,
}: SelectWebProps) {
  const { loading } = useForm();
  const {
    fieldName,
    defaultValue: unformDefaultValue,
    registerField,
  } = useField(name);
  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        const selectValue: CustomOption[] = ref?.state?.selectValue;

        return selectValue[0]?.value;
      },
    });
  }, [fieldName, registerField]);

  const performStyles = useCallback((base: CSSObjectWithLabel) => {
    return function (style: CSSObjectWithLabel): CSSObjectWithLabel {
      return mergeWith(base, style);
    };
  }, []);
  return (
    <ReactSelect<CustomOption>
      options={[
        {
          label: placeholder,
          options: options,
        },
      ]}
      placeholder={placeholder}
      defaultInputValue={
        defaultValue?.label ?? unformDefaultValue?.label ?? undefined
      }
      value={value}
      menuPortalTarget={
        typeof document !== "undefined" ? document.body : undefined
      }
      menuPosition="fixed"
      styles={{
        container: performStyles({
          width: "100%",
          display: "flex",
          height: "3rem",
        }),
        control: performStyles({
          width: "100%",
        }),
      }}
      className="react-select"
      classNamePrefix="react-select"
      defaultValue={defaultValue}
      ref={selectRef}
      isDisabled={disabled || loading}
    />
  );
}
