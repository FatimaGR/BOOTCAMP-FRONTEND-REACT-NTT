import { FC, OptionHTMLAttributes } from "react";

interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement>{
  text: string;
}
const SelectOption: FC<SelectOptionProps> = ({
  text, className = "", ...props
}) => {
  return(
    <option {...props}>
      {text}
    </option>
  )
}

export default SelectOption;