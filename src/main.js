import { createCategoriesSelect } from "./components/CategoriesSelect.js";
import { createProductsList } from "./components/ProductsList.js";
import { createSearchInput } from "./components/Search.js";
import { getProducts, getCategories } from "./services/services.js";

export const productsListOptions = document.getElementById("products-list-options");

// getProducts();

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

export const productsData = createProductsData();

async function initializeProducts(){
  try{
    const initialProductsData = await getProducts();
    productsData.updateProducts(initialProductsData);

    // getCategories();
    const categoriesList = getCategories();
    createCategoriesSelect(categoriesList);

  } catch (error){
    console.log("Error when obtaining the products:", error);
  }
}

initializeProducts();

// searchForm
createSearchInput();