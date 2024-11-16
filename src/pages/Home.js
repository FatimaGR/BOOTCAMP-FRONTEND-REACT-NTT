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

  const menuButton = document.getElementById("menu-button");
  const navbar = document.getElementById("navbar");
  
  menuButton.addEventListener("click", () => {
    navbar.classList.toggle("visible");
  })
}

// create products functions
function createProductsData(){
  let products;
  return{
    updateProducts: function(updatedProducts){
      products = updatedProducts;
      createProductsList(products);
    },
    getProducts: () => products
  }
}

const productsData = createProductsData();

async function initializeProducts(){
  try{
    // getting products
    const initialProductsData = await getProducts();
    productsData.updateProducts(initialProductsData);

    // getting categories
    const categoriesList = getCategories();
    createCategoriesSelect(categoriesList, filterByCategory);
  } catch (error){
    console.log("Error when obtaining the products:", error);
  }
}

// categories select filter function
export async function filterByCategory(categorySelected){
  const initialProductsData = await getProducts();

  if (categorySelected === "all categories"){
    productsData.updateProducts(initialProductsData);
  } else {
    const filteredProducts = initialProductsData.filter(
      product => product.category == categorySelected
    );
    productsData.updateProducts(filteredProducts);
  }
}

// search form filter function
export async function filterBySearch(searchInputValue){
  const initialProductsData = await getProducts();
  
  const searchedProducts = initialProductsData.filter( product => {
    const productName = product.title.toUpperCase();
    return productName.includes(searchInputValue);
  });
  
  productsData.updateProducts(searchedProducts);
}