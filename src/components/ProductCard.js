import { createElement } from "../utils/utils.js";
import { counter } from "./Counter.js";

export function createProductCard(productData){
  // elements variables
  const productCard = createElement("div", "product-card");
  const productImage = createElement("img");
  const productDescription = createElement("div", "product-description");
  const category = createElement("p", "category");
  const name = createElement("p", "name");
  const description = createElement("p", "description");
  const buySection = createElement("div", "buy-section");
  const buyButton = createElement("button", "buy-button");
  const price = createElement("p", "price");

  // elements content
  category.textContent = productData.category;
  name.textContent = productData.title;
  description.textContent = productData.description;
  productImage.src = productData.images[0];
  buyButton.textContent = "Add to cart";
  price.textContent = "S/" + productData.price;

  // elements events
  buyButton.addEventListener("click", function(){
    counter.increment();
  })

  // elements append
  buySection.append(buyButton, price);
  productDescription.append(category, name, description, buySection);
  productCard.append(productImage, productDescription);

  return productCard;
}