import { fetchData } from "./fetchData.js";
import { Product, Category } from "../domain/interfaces.ts";

interface ProductsResponse {
  products: Product[];
}

export async function getProducts(): Promise<Product[]>{
  const productsList = await fetchData<ProductsResponse>("/products?limit=0");
  return productsList.products
}

export async function getCategories(): Promise<Category[]>{
  const productsCategories = await fetchData<Category[]>("/products/categories");
  return productsCategories;
}