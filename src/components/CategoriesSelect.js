import { createElement } from "../utils/utils.js";
import { categoryOption } from "./CategoryOption.js";

export async function createCategoriesSelect(categoriesList, filterByCategory){
  // elements variables
  const productsListOptions = document.querySelector(".products-list-options");
  const categoriesSelect = createElement("select", "categories-select");

  try{
    const categoriesData = await categoriesList;
  
    // select options
    const defaultOption = categoryOption("all categories", "All categories", true);
    categoriesSelect.append(defaultOption);
    
    categoriesData.map((categoryData) => {
      const option = categoryOption(categoryData.name, categoryData.name)
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