import { createCategoriesSelect } from "../components/CategoriesSelect.js";
import { createProductsList } from "../components/ProductsList.js";
import { createSearchInput } from "../components/Search.js";
import { getProducts, getCategories } from "../services/services.js";
import { createElement } from "../utils/utils.js";

export function initializeHomePage(){
  const productsListOptions = createElement("section", "products-list-options");
  const main = document.getElementById("main");
  main.append(productsListOptions);
  
  initializeProducts();
  createSearchInput(filterBySearch);

  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");
  
  menuButton.addEventListener("click", () => {
    navbar.classList.toggle("visible");
  })
}

// create products functions
function createProductsData(){
  let products;
  return{
    update: function(updatedProducts){
      products = updatedProducts;
      createProductsList(products);
    },
    get: () => products
  }
}

function createFilteredProducts(){
  let filteredProducts;
  return{
    update: (newFilteredProducts) => (filteredProducts = newFilteredProducts),
    get: () => filteredProducts
  }
}

const productsData = createProductsData();
const filteredProductsData = createFilteredProducts();

async function initializeProducts(){
  try{
    // getting products
    const initialProductsData = await getProducts();
    productsData.update(initialProductsData);
    filteredProductsData.update(initialProductsData);

    // getting categories
    const categoriesList = getCategories();
    const productsCategories = getProductsCategories();
    createCategoriesSelect(categoriesList, productsCategories, filterByCategory);
  } catch (error){
    console.log("Error when initializing the products:", error);
  }
}

// products categories
function getProductsCategories(){
  const initialProductsData = productsData.get();
  let productsCategories = [];

  initialProductsData.forEach((product) => {
    const productCategory = product.category;
    if (!productsCategories.includes(productCategory)){
      productsCategories.push(productCategory);
    }
  })

  return productsCategories;
}

// categories select filter function
export async function filterByCategory(categorySelected){
  const allProductsData = await getProducts();

  // los textos de este tipo deber'ian estar en una constante para evitar cualquier error al escribirlos
  // el ternario hay que usarlo si la condici'on es corta si es extensa como este caso es mejor usar el if tradicional
  const filtered =
    categorySelected === "all categories"
      ? allProductsData
      : allProductsData.filter(
        product => product.category == categorySelected
        );
  
  filteredProductsData.update(filtered);
  productsData.update(filtered);
}

// search form filter function
export function filterBySearch(searchInputValue){
  const searchedProducts = filteredProductsData.get().filter( product => {
    const productName = product.title.toUpperCase();
    return productName.includes(searchInputValue);
  });
  
  productsData.update(searchedProducts);
}