import { FC } from "react";

interface CategoryOptionProps {
  value: string;
  text: string;
  selected?: boolean;
  disabled?: boolean;
}
const CategoryOption: FC<CategoryOptionProps> = ({
  value, text, selected = false, disabled = false
}: CategoryOptionProps) => {
  return(
    <option 
      value={value} 
      selected={selected? selected : false} 
      disabled={disabled? disabled : false}
    >
      {text}
    </option>
  )
}

export default CategoryOption;