import { productsListOptions } from "../main.js";
import { createElement } from "../utils/utils.js";

export function createSearchInput(){
  const searchForm = createElement("div", "search-form");
  const searchInput = createElement("input");
  const searchImage = createElement("img");

  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search-input");
  searchInput.setAttribute("placeholder", "Search products...");

  searchImage.src = "src/assets/icons/search.svg";
  searchImage.alt = "Search icon";

  // searchInput.addEventListener("input", function(){
  //   searchInputValue = searchInput.value;
  //   console.log(searchInputValue);
  // });

  searchForm.append(searchInput, searchImage);
  productsListOptions.append(searchForm);
}