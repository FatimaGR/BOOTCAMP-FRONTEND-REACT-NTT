import CategoryOption from "./CategoryOption.tsx";
import { Category } from "../types/interfaces.js";
import { FC } from "react";

interface CategoriesSelectProps {
  categoriesList: Category[];
  productsCategoriesList: string[];
  filterByCategory: (categorySelected: string) => void;
}

const CategoriesSelect: FC<CategoriesSelectProps> = ({
  categoriesList, productsCategoriesList, filterByCategory
}: CategoriesSelectProps) => {

  const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>): void => {
    const categorySelected: string = target.value.toLowerCase();
    filterByCategory(categorySelected);
  }

  return(
    <select onChange={handleChange} className="categories-select">
      <CategoryOption 
        value="all categories"
        text="All categories"
        selected={true}
      />
      {categoriesList.map((categoryData) => {
        const categoryDataSlug: string = categoryData.slug;
        const isDisabled: boolean = productsCategoriesList.includes(categoryDataSlug) ? false : true;
        return (
          <CategoryOption
            key={categoryData.name}
            value={categoryData.slug}
            text={categoryData.name}
            selected={false}
            disabled={isDisabled}
          />
        )
      })}
    </select>
  )
}

export default CategoriesSelect;