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
  
  try{
    const productsData = await initialProductsData;
    
    // products cards
    productsData.map((productData) => {
      const productElement = createProductCard(productData);
      productsList.append(productElement);
    })
  
    main.append(productsList);
  } catch (error){
    console.log("Error creating product list:", error);
  }
}