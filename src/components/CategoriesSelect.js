import { createElement } from "../utils/utils.js";
import { categoryOption } from "./CategoryOption.js";
import { productsData, productsListOptions } from "../main.js";

export async function createCategoriesSelect(categoriesList){
  const categoriesSelect = createElement("select", "categories-select");
  const categoriesData = await categoriesList;
  const initialProductsData = (await productsData.getProducts()) || [];

  const defaultOption = categoryOption("all categories", "All categories", true);
  categoriesSelect.append(defaultOption);

  let categorySelected;

  categoriesSelect.addEventListener("change", function(){
    categorySelected = categoriesSelect.value.toLowerCase();

    if (categorySelected === "all categories"){
      productsData.updateProducts(initialProductsData);
    } else {
      const filteredProducts = initialProductsData.filter(product => product.category == categorySelected);
      productsData.updateProducts(filteredProducts);
    }
  });

  categoriesData.map((categoryData) => {
    const option = categoryOption(categoryData.name, categoryData.name)
    categoriesSelect.append(option);
  })

  productsListOptions.append(categoriesSelect);
}