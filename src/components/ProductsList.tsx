import ProductCard from "./ProductCard.tsx";
import { Product } from "../types/interfaces.js";
import { FC } from "react";

interface ProductsListProps {
  initialProductsData: Product[],
  addToCart: (product: Product) => void,
}

const ProductsList: FC<ProductsListProps> = ({initialProductsData, addToCart}) => {
  const noProductsMessage = "No products were found.";

  return(
    <section className="products-list">
      {initialProductsData.map((productData) => (
          <ProductCard key={`${productData.id}`} productData={productData} addToCart={addToCart}/>
      ))}
      {initialProductsData.length == 0 && noProductsMessage
      ? <p>{noProductsMessage}</p>
      : ""}
    </section>
  )
}

export default ProductsList;