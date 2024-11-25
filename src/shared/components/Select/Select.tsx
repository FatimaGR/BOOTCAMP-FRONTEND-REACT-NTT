import { FC, SelectHTMLAttributes } from "react";
import { SelectOption } from "../SelectOption/SelectOption";

interface SelectOptionProps{
  value: string;
  text: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  options: SelectOptionProps[] | undefined;
  defaultValue?: string;
  defaultValueText?: string;
  defaultValueDisabled?: boolean;
  error?: string;
  confirmed?: boolean;
  label?: string;
  containerClassName?: string;
}

const Select: FC<SelectProps> = ({
  options, 
  defaultValue, 
  defaultValueText, 
  defaultValueDisabled, 
  error, 
  confirmed, 
  label, 
  containerClassName = "", 
  ...props
}) => {

  const className = error
    ? `error-${containerClassName}`
    : confirmed
    ? `confirmed-${containerClassName}`
    : containerClassName;

  let defaultOption = null;

  if (defaultValue || defaultValue === "") {
    defaultOption = (<SelectOption 
      key={defaultValue} 
      value={defaultValue} 
      text={defaultValueText || ""}
      disabled={defaultValueDisabled}
    />)
  }

  return(
    <div className={className}>
      <label htmlFor={props.id}>{label}</label>
      <select {...props}>
        {defaultOption}
        {options?.map((option) => (
          <SelectOption 
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            text={option.text}
          />
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Select;