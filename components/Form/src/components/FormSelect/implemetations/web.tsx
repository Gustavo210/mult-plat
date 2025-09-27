import { mergeWith } from "lodash";
import { useCallback } from "react";
import ReactSelect, { CSSObjectWithLabel } from "react-select";
interface CustomOption {
  label: string;
  value: string;
}
export function SelectWeb({
  label,
  options,
  placeholder,
  selectRef,
  defaultValue,
  value,
  disabled,
  menuIsOpen,
}: {
  label?: string;
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
      menuIsOpen={menuIsOpen}
      placeholder={placeholder || "Selecione"}
      defaultInputValue={defaultValue?.label}
      value={value}
      styles={{
        container: performStyles({
          width: "100%",
          display: "flex",
          height: "3rem",
          zIndex: 0,
        }),
        control: performStyles({
          width: "100%",
          zIndex: 0,
        }),
        menu: performStyles({
          zIndex: 1000,
        }),
        menuList: performStyles({
          zIndex: 1000,
        }),
        clearIndicator: performStyles({
          zIndex: 0,
        }),
        dropdownIndicator: performStyles({
          zIndex: 0,
        }),
        group: performStyles({
          zIndex: 1000,
        }),
        groupHeading: performStyles({
          zIndex: 0,
        }),
        indicatorsContainer: performStyles({
          zIndex: 0,
        }),
        indicatorSeparator: performStyles({
          zIndex: 0,
        }),
        input: performStyles({
          zIndex: 0,
        }),
        loadingIndicator: performStyles({
          zIndex: 0,
        }),
        loadingMessage: performStyles({
          zIndex: 0,
        }),
        menuPortal: performStyles({
          zIndex: 1000,
        }),
        multiValue: performStyles({
          zIndex: 0,
        }),
        multiValueLabel: performStyles({
          zIndex: 0,
        }),
        multiValueRemove: performStyles({
          zIndex: 0,
        }),
        noOptionsMessage: performStyles({
          zIndex: 0,
        }),
        option: performStyles({
          zIndex: 0,
        }),
        placeholder: performStyles({
          zIndex: 0,
        }),
        singleValue: performStyles({
          zIndex: 0,
        }),
        valueContainer: performStyles({
          zIndex: 1000,
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
