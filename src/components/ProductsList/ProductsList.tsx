import ProductCard from "../ProductCard/ProductCard.tsx";
import { Product } from "../../domain/interfaces.ts";
import { FC } from "react";

interface ProductsListProps {
  initialProductsData: Product[],
}

const ProductsList: FC<ProductsListProps> = ({initialProductsData}) => {
  const noProductsMessage = "No products were found.";

  return(
    <section className="products-list">
      {initialProductsData.map((productData) => (
        <ProductCard key={`${productData.id}`} productData={productData}/>
      ))}
      {initialProductsData.length == 0 && <p>{noProductsMessage}</p>}
    </section>
  )
}

export default ProductsList;