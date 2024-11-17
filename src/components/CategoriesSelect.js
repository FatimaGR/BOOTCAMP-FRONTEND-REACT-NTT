import { createElement } from "../utils/utils.js";
import { categoryOption } from "./CategoryOption.js";

export async function createCategoriesSelect(categoriesList, productsCategoriesList, filterByCategory){
  // elements variables
  const productsListOptions = document.querySelector(".products-list-options");
  const categoriesSelect = createElement("select", "categories-select");

  try{
    const categoriesData = await categoriesList;
    const productsCategories = await productsCategoriesList;
  
    // select options
    const defaultOption = categoryOption("all categories", "All categories", true);
    categoriesSelect.append(defaultOption);
    
    categoriesData.map((categoryData) => {
      const categoryDataSlug = categoryData.slug;
      const isDisabled = productsCategories.includes(categoryDataSlug) ? false : true;
      const option = categoryOption(categoryData.slug, categoryData.name, false, isDisabled);
      
      categoriesSelect.append(option);
    })
  
    // elements events
    categoriesSelect.addEventListener("change", function(){
      const categorySelected = categoriesSelect.value.toLowerCase();
      filterByCategory(categorySelected);
    });
  
    productsListOptions.append(categoriesSelect);
  } catch (error){
    console.log("Error when obtaining the categories:", error);
  }
}