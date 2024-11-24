import SelectOption from "../../shared/SelectOption/SelectOption.tsx";
import { Category } from "../../domain/interfaces.ts";
import { FC, useState } from "react";

interface CategoriesSelectProps {
  categoriesList: Category[];
  productsCategoriesList: string[];
  filterByCategory: (categorySelected: string) => void;
}

const CategoriesSelect: FC<CategoriesSelectProps> = ({
  categoriesList, productsCategoriesList, filterByCategory
}: CategoriesSelectProps) => {
  const categoryDefault = "all-categories";
  const [categorySelected, setCategorySelected] = useState(categoryDefault);

  const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>): void => {
    const newCategorySelected = target.value.toLowerCase()
    setCategorySelected(newCategorySelected);
    filterByCategory(newCategorySelected);
  }

  return(
    <select value={categorySelected} onChange={handleChange} className="categories-select">
      <SelectOption
        key={categoryDefault}
        value={categoryDefault}
        text="All categories"
      />
      {categoriesList.map((categoryData) => {
        const categoryDataSlug = categoryData.slug;
        const isDisabled = productsCategoriesList.includes(categoryDataSlug) ? false : true;
        return (
          <SelectOption
            key={categoryData.slug}
            value={categoryData.slug}
            text={categoryData.name}
            disabled={isDisabled}
          />
        )
      })}
    </select>
  )
}

export default CategoriesSelect;