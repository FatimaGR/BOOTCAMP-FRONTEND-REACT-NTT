import { createElement } from "../utils/utils.js";
import { createProductCard } from "./ProductCard.js";
import { Product } from "../types/interfaces.js";

export function createProductsList(initialProductsData: Product[]): void{
  // elements variables
  // el tipaod es implicito el elementbyId ya lo retorna
  const main = document.getElementById("main");
  let productsList = document.querySelector(".products-list");
  
  if (productsList){
    productsList.remove();
  }
  productsList = createElement("section", "products-list");
  const noProductsMessage = createElement("p");
  noProductsMessage.textContent = "No products were found.";
  
  const productsData = initialProductsData;
  
  // products cards
  productsData.forEach((productData) => {
    const productElement = createProductCard(productData);
    productsList?.append(productElement);
  })

  if (productsData.length == 0 && noProductsMessage){
    productsList.append(noProductsMessage);
  }

  main?.append(productsList)
}