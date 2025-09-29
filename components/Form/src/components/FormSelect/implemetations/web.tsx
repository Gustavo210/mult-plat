import { mergeWith } from "lodash";
import { useCallback } from "react";
import ReactSelect, { CSSObjectWithLabel } from "react-select";
interface CustomOption {
  label: string;
  value: string;
}
export function SelectWeb({
  options,
  placeholder,
  selectRef,
  defaultValue,
  value,
  disabled,
}: {
  options: CustomOption[];
  placeholder?: string;
  selectRef: any;
  defaultValue?: CustomOption;
  value?: CustomOption;
  disabled?: boolean;
}) {
  const performStyles = useCallback((base: CSSObjectWithLabel) => {
    return function (style: CSSObjectWithLabel): CSSObjectWithLabel {
      return mergeWith(base, style);
    };
  }, []);
  return (
    <ReactSelect<CustomOption>
      options={[
        {
          label: placeholder || "Selecione",
          options: options,
        },
      ]}
      placeholder={placeholder || "Selecione"}
      defaultInputValue={defaultValue?.label}
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
      isDisabled={disabled}
    />
  );
}
