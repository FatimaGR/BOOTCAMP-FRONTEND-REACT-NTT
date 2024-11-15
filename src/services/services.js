import { fetchData } from "./fetchData.js";

export async function getProducts(){
  let productsList = await fetchData("/products");
  return productsList.products
}

export async function getCategories(){
  let productsCategories = await fetchData("/products/categories");
  return productsCategories;
}