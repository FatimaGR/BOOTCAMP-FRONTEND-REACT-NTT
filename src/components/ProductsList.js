import { createElement } from "../utils/utils.js";
import { createProductCard } from "./ProductCard.js";

export async function createProductsList(initialProductsData){
  // elements variables
  const main = document.getElementById("main");
  let productsList = document.querySelector(".products-list");
  
  if (productsList){
    productsList.remove();
  }
  productsList = createElement("section", "products-list");
  const noProductsMessage = createElement("p");
  noProductsMessage.textContent = "No products were found.";
  
  try{
    const productsData = await initialProductsData;
    
    // products cards
    // por qu'e map?
    productsData.map((productData) => {
      const productElement = createProductCard(productData);
      productsList.append(productElement);
    })
  
    // por qu'e en la condici'on est'a no noProductsMessage?
    if (productsData.length == 0 && noProductsMessage){
      productsList.append(noProductsMessage);
    }

    main.append(productsList)
  } catch (error){
    console.log("Error creating product list:", error);
  }
}