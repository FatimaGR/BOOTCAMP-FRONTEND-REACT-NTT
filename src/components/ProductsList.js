import { createElement } from "../utils/utils.js";
import { createProductCard } from "./ProductCard.js";
const main = document.getElementById("main");

export async function createProductsList(initialProductsData){
  let productsList = document.querySelector(".products-list");
  let productsData = await initialProductsData;

  if (productsList){
    productsList.remove();
  }

  productsList = createElement("section", "products-list");
  
  productsData.map((productData) => {
    const productElement = createProductCard(productData);
    productsList.append(productElement);
  })

  main.append(productsList);
}