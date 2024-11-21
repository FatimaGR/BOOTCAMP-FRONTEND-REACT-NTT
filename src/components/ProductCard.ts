import { createElement } from "../utils/utils.js";
import { counter } from "./Counter.js";
import { Product } from "../types/interfaces.js";

export function createProductCard(productData: Product): HTMLDivElement{
  // elements variables
  const productCard = createElement("div", "product-card");
  const productImage = createElement("img");
  const productDescription = createElement("div", "product-description");
  const category = createElement("p", "category");
  const name = createElement("p", "name");
  const description = createElement("p", "description");
  const brand = createElement("p", "brand");
  const buySection = createElement("div", "buy-section");
  const buyButton = createElement("button", "buy-button");
  const price = createElement("p", "price");

  // elements content
  // poner en enum el regex para que se pueda identificar que hace
  category.textContent = productData.category.replace(/-/g, " ");
  name.textContent = productData.title;
  description.textContent = productData.description;
  productImage.src = productData.images[0];
  productImage.alt = productData.title;
  brand.textContent = `Brand: ${productData.brand || "Not specified"}`;
  buyButton.textContent = "Add to cart";
  price.textContent = "S/" + productData.price;

  // elements events
  buyButton.addEventListener("click", function(){
    counter.increment();
  })

  // elements append
  buySection.append(buyButton, price);
  productDescription.append(category, name, description, brand, buySection);
  productCard.append(productImage, productDescription);

  return productCard;
}