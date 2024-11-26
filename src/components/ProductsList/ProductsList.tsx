import ProductCard from "../ProductCard/ProductCard.tsx";
import { Product } from "../../domain/interfaces.ts";
import { FC } from "react";
import noProducts from "../../assets/images/no-products.svg";
import loadingImage from "../../assets/images/loading.svg";

interface ProductsListProps {
  initialProductsData: Product[],
  isLoading: boolean,
}

const ProductsList: FC<ProductsListProps> = ({initialProductsData, isLoading}) => {
  const noProductsMessage = "No products were found";

  return(
    <section className="products-list">
      {initialProductsData.map((productData) => (
        <ProductCard key={`${productData.id}`} productData={productData}/>
      ))}
      {isLoading && 
        <div className="loading-message">
          <p>Loading...</p>
          <img src={loadingImage} alt="Loading image" />
        </div>
      }
      {initialProductsData.length == 0 && !isLoading ?
        (<div className="no-products-message">
          <p>{noProductsMessage}</p>
          <img src={noProducts} alt="No products were found image" />
        </div>) : (<></>)
      }
    </section>
  )
}

export default ProductsList;