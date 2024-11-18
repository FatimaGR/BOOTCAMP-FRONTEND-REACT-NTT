import { createElement } from "../utils/utils.js";
import { categoryOption } from "./CategoryOption.js";
import { Category } from "../types/interfaces.js";

interface CategoriesSelectProps {
  categoriesList: Promise<Category[]>;
  productsCategoriesList: string[];
  filterByCategory: (categorySelected: string) => Promise<void>;
}

export async function createCategoriesSelect({
  categoriesList, productsCategoriesList, filterByCategory
}: CategoriesSelectProps): Promise<void>{
  // elements variables
  const productsListOptions = document.querySelector(".products-list-options");
  const categoriesSelect = createElement("select", "categories-select");

  try{
    const categoriesData = await categoriesList;
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
  } catch (error){
    console.log("Error when obtaining the categories:", error);
  }
}