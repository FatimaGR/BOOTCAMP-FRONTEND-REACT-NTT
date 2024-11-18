import { createElement } from "../utils/utils.js";
import { categoryOption } from "./CategoryOption.js";
import { Category } from "../types/interfaces.js";

interface CategoriesSelectProps {
  categoriesList: Category[];
  productsCategoriesList: string[];
  filterByCategory: (categorySelected: string) => void;
}

export function createCategoriesSelect({
  categoriesList, productsCategoriesList, filterByCategory
}: CategoriesSelectProps): void{
  // elements variables
  const productsListOptions = document.querySelector(".products-list-options");
  const categoriesSelect = createElement("select", "categories-select");

  const categoriesData = categoriesList;
  const productsCategories = productsCategoriesList;

  // select options
  const defaultOption = categoryOption({
    value: "all categories", 
    text: "All categories", 
    selected: true
  });
  categoriesSelect.append(defaultOption);
  
  categoriesData.forEach((categoryData) => {
    const categoryDataSlug: string = categoryData.slug;
    const isDisabled: boolean = productsCategories.includes(categoryDataSlug) ? false : true;
    const option = categoryOption({
      value: categoryData.slug, 
      text: categoryData.name, 
      selected: false, 
      disabled: isDisabled
    });
    
    categoriesSelect.append(option);
  })

  // elements events
  categoriesSelect.addEventListener("change", function(){
    const categorySelected: string = categoriesSelect.value.toLowerCase();
    filterByCategory(categorySelected);
  });

  productsListOptions?.append(categoriesSelect);
  
}