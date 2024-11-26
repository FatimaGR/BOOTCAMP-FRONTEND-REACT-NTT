import { Product, Category } from "../domain/interfaces.ts";
import { useApi } from "../shared/hooks/useApi.ts";

interface ProductsResponse {
  products: Product[];
}

export const getProducts = () => {
  const { data, isLoading, error } = useApi<ProductsResponse>("https://dummyjson.com/products?limit=0");
  return {
    products: data?.products || [],
    productsLoading: isLoading,
    productsError: error
  }
}

export const getCategories = () => {
  const { data, isLoading, error } =useApi<Category[]>("https://dummyjson.com/products/categories");
  return {
    categories: data || [],
    categoriesLoading: isLoading,
    categoriesError: error
  }
}