import { useEffect, FC, useReducer } from "react";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect.tsx";
import ProductsList from "../../components/ProductsList/ProductsList.tsx";
import SearchInput from "../../components/Search/Search.tsx";
import { Category, ProductsResponse } from "../../domain/interfaces.ts";
import { homeReducer, initialHomeState } from "../../context/home/home-reducer.ts";
import { HomeActions } from "../../domain/home-actions.ts";
import "./home.css";
import { useApi } from "../../shared/hooks/useApi/useApi.ts";
import { CategoriesEnum } from "../../enums/categories.ts";
import withAuth from "../../hoc/withAuth.tsx";
import Navbar from "@/components/Navbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";

const Home: FC = () => {
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);
  const { initialProducts, productsData, filteredProducts, categoriesList, productsCategories } = state;
  const { data: productsResponse, isLoading: productsLoading } = useApi<ProductsResponse>("https://dummyjson.com/products?limit=0");
  const { data: categories } = useApi<Category[]>("https://dummyjson.com/products/categories");

  useEffect(() => {
    if (productsResponse){
      const products = productsResponse.products;
      dispatch({ type: HomeActions.SetInitialProducts, payload: products});
      dispatch({ type: HomeActions.SetProductsData, payload: products});
      dispatch({ type: HomeActions.SetFilteredProducts, payload: products});
      
      const productsCategories = Array.from(
        new Set(products.map((product) => product.category))
      );
      
      dispatch({ type: HomeActions.SetProductsCategories, payload: productsCategories});
    }

    if (categories){
      dispatch({ type: HomeActions.SetCategories, payload: categories});
    }
  }, [productsResponse, categories]);

  function filterByCategory(categorySelected: string): void{
    const allProductsData = initialProducts;
    const categoryDefault = CategoriesEnum.DefaultCategory;
    const filtered =
      categorySelected === categoryDefault
        ? allProductsData
        : allProductsData.filter(product => product.category == categorySelected);
    
    dispatch({ type: HomeActions.SetFilteredProducts, payload: filtered});
    dispatch({ type: HomeActions.SetProductsData, payload: filtered});
  }

  function filterBySearch(searchInputValue: string): void{
    const searchedProducts = filteredProducts.filter(product => {
      const productName = product.title.toUpperCase();
      return productName.includes(searchInputValue);
    });
    
    dispatch({ type: HomeActions.SetProductsData, payload: searchedProducts});
  }

  return(
    <>
      <Navbar/>
      <main>
        <section className="products-list-options">
          <SearchInput filterBySearch={filterBySearch}/>
          <CategoriesSelect 
            categoriesList={categoriesList}
            productsCategoriesList={productsCategories}
            filterByCategory={filterByCategory}
            />
        </section>
        <ProductsList initialProductsData={productsData} isLoading={productsLoading}/>
      </main>
      <Footer/>
    </>
  )
}

export default withAuth(Home);