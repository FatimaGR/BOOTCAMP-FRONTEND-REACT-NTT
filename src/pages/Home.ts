import { createCategoriesSelect } from "../components/CategoriesSelect.js";
import { createProductsList } from "../components/ProductsList.js";
import { createSearchInput } from "../components/Search.js";
import { getProducts, getCategories } from "../services/services.js";
import { createElement } from "../utils/utils.js";
import { Product } from "../types/interfaces.js";

export function initializeHomePage(): void{
  const productsListOptions = createElement("section", "products-list-options");
  const main: HTMLElement | null = document.getElementById("main");
  main?.append(productsListOptions);
  
  initializeProducts();
  createSearchInput(filterBySearch);

  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");
  
  menuButton?.addEventListener("click", () => {
    navbar?.classList.toggle("visible");
  })
}

interface CreateProps {
  update: (newData: Product[]) => void;
  get: () => Product[];
}

// create products functions
function createProductsData(): CreateProps{
  let products: Product[] = [];
  return{
    update: function(updatedProducts: Product[]){
      products = updatedProducts;
      createProductsList(products);
    },
    get: () => products
  }
}

function createFilteredProducts(): CreateProps{
  let filteredProducts: Product[] = [];
  return{
    update: (newFilteredProducts: Product[]) => (filteredProducts = newFilteredProducts),
    get: () => filteredProducts
  }
}

const productsData: CreateProps = createProductsData();
const filteredProductsData: CreateProps = createFilteredProducts();

async function initializeProducts(): Promise<void>{
  try{
    // getting products
    const initialProductsData = await getProducts();
    productsData.update(initialProductsData);
    filteredProductsData.update(initialProductsData);
  } catch (error){
    console.log("Error when initializing the products:", error);
  }
  try{
    // getting categories
    const categoriesList = await getCategories();
    const productsCategories = getProductsCategories();
    createCategoriesSelect({
      categoriesList: categoriesList, 
      productsCategoriesList: productsCategories, 
      filterByCategory: filterByCategory
    });
  } catch (error){
    console.log("Error when initializing the categories:", error);
  }
}

// products categories
function getProductsCategories(): string[]{
  const initialProductsData = productsData.get();
  let productsCategories: string[] = [];

  initialProductsData.forEach((product) => {
    const productCategory = product.category;
    if (!productsCategories.includes(productCategory)){
      productsCategories.push(productCategory);
    }
  })

  return productsCategories;
}

// categories select filter function
export async function filterByCategory(categorySelected: string): Promise<void>{
  try {
      const allProductsData = await getProducts();

    const filtered =
      categorySelected === "all categories"
        ? allProductsData
        : allProductsData.filter(
          product => product.category == categorySelected
          );
    
    filteredProductsData.update(filtered);
    productsData.update(filtered);
  } catch (error){
    console.log("Error filtering by category:", error);
  }
}

// search form filter function
export function filterBySearch(searchInputValue: string): void{
  const searchedProducts = filteredProductsData.get().filter( product => {
    const productName = product.title.toUpperCase();
    return productName.includes(searchInputValue);
  });
  
  productsData.update(searchedProducts);
}