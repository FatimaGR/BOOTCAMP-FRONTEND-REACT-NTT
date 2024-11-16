import { createElement } from "../utils/utils.js";

export function createSearchInput(filterBySearch){
  // elements variables
  const productsListOptions = document.querySelector(".products-list-options");
  const searchForm = createElement("div", "search-form");
  const searchInput = createElement("input");
  const searchImage = createElement("img");

  // set attributes
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search-input");
  searchInput.setAttribute("placeholder", "Search products...");

  searchImage.src = "src/assets/icons/search.svg";
  searchImage.alt = "Search icon";

  // elements events
  searchInput.addEventListener("input", function(){
    const searchInputValue = searchInput.value.trim().toUpperCase();
    filterBySearch(searchInputValue);
  });

  // elements append
  searchForm.append(searchInput, searchImage);
  productsListOptions.append(searchForm);
}