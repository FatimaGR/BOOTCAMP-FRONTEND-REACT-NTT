import { FC, OptionHTMLAttributes } from "react";

interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement>{
  text: string;
}

export const SelectOption: FC<SelectOptionProps> = ({
  text, ...props
}) => {
  return(
    <option {...props}>
      {text}
    </option>
  )
};

export default SelectOption;