import { Category } from "../../domain/interfaces.ts";
import { FC, useState } from "react";
import Select from "../../shared/components/Select/Select.tsx";
import { CategoriesEnum } from "../../enums/categories.ts";

interface CategoriesSelectProps {
  categoriesList: Category[];
  productsCategoriesList: string[];
  filterByCategory: (categorySelected: string) => void;
}

const CategoriesSelect: FC<CategoriesSelectProps> = ({
  categoriesList, productsCategoriesList, filterByCategory
}: CategoriesSelectProps) => {
  const categoryDefault: string = CategoriesEnum.DefaultCategory;
  const [categorySelected, setCategorySelected] = useState(categoryDefault);

  const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>): void => {
    const newCategorySelected = target.value.toLowerCase()
    setCategorySelected(newCategorySelected);
    filterByCategory(newCategorySelected);
  }

  return(
    <Select 
      options={categoriesList.map((categoryData) => {
        const isDisabled = !productsCategoriesList.includes(categoryData.slug);

        return({
          value: categoryData.slug,
          text: categoryData.name,
          disabled: isDisabled
        })
      })}
      value={categorySelected}
      onChange={handleChange}
      className="categories-select"
      defaultValue={categoryDefault}
      defaultValueText={"All categories"}
    />
  )
}

export default CategoriesSelect;