import { useEffect, useState, FC } from "react";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect.tsx";
import { getProducts, getCategories } from "../../services/services.ts";
import { Category, Product } from "../../domain/interfaces.ts";
import ProductsList from "../../components/ProductsList/ProductsList.tsx";
import SearchInput from "../../components/Search/Search.tsx";
import "./home.css";

const Home: FC = () => {
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [productsCategories, setProductsCategories] = useState<string[]>([]);

  useEffect(() => {
    getProducts()
    .then((products) => {
      setInitialProducts(products);
      setProductsData(products);
      setFilteredProducts(products);
      const productsCategories = getProductsCategories(products);
      setProductsCategories(productsCategories);
    })
    getCategories()
    .then((categories) => {
      setCategoriesList(categories);
    })
  }, [])

  function getProductsCategories(initialProductsData: Product[]): string[]{
    let productsCategories: string[] = [];
  
    initialProductsData.forEach((product) => {
      const productCategory = product.category;
      if (!productsCategories.includes(productCategory)){
        productsCategories.push(productCategory);
      }
    })
  
    return productsCategories;
  }

  function filterByCategory(categorySelected: string): void{
    const allProductsData = initialProducts;
    const categoryDefault = "all-categories";
    const filtered =
      categorySelected === categoryDefault
        ? allProductsData
        : allProductsData.filter(product => product.category == categorySelected);
    
    setFilteredProducts(filtered);
    setProductsData(filtered);
  }

  function filterBySearch(searchInputValue: string): void{
    const searchedProducts = filteredProducts.filter(product => {
      const productName = product.title.toUpperCase();
      return productName.includes(searchInputValue);
    });
    
    setProductsData(searchedProducts);
  }

  return(
    <main>
      <section className="products-list-options">
        <SearchInput filterBySearch={filterBySearch}/>
        <CategoriesSelect 
          categoriesList={categoriesList} 
          productsCategoriesList={productsCategories}
          filterByCategory={filterByCategory}
        />
      </section>
      <ProductsList initialProductsData={productsData}/>
    </main>
  )
}

export default Home;