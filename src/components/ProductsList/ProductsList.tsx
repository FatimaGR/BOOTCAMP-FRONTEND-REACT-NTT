import ProductCard from "../ProductCard/ProductCard.tsx";
import { Product } from "../../domain/interfaces.ts";
import { FC, useState } from "react";
import noProducts from "../../assets/images/no-products.svg";
import loadingImage from "../../assets/images/loading.svg";
import Button from "../../shared/components/Button/Button.tsx";
import { pagination } from "@/shared/utils/utils.ts";

interface ProductsListProps {
  initialProductsData: Product[],
  isLoading: boolean,
}

const ProductsList: FC<ProductsListProps> = ({initialProductsData, isLoading}) => {
  const noProductsMessage = "No products were found";
  const loadingMessage = "Loading...";
  const [page, setPage] = useState(1);
  const limit = 20;
  const paginatedProducts = pagination(initialProductsData, page, limit);

  return(
    <>
      {isLoading && 
        <div className="loading-message">
          <p>{loadingMessage}</p>
          <img src={loadingImage} alt="Loading image" />
        </div>
      }
      {initialProductsData.length == 0 && !isLoading ?
        (<div className="no-products-message">
          <p>{noProductsMessage}</p>
          <img src={noProducts} alt="No products were found image" />
        </div>) : (<></>)
      }
      <section className="products-list">
        {paginatedProducts.map((productData) => (
          <ProductCard key={`${productData.id}`} productData={productData}/>
        ))}
      </section>
      {initialProductsData.length > 0 && !isLoading ? (
        <div className="pages-container">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)} className="page-button">
            Previus
          </Button>
          <Button disabled={paginatedProducts.length < limit} onClick={() => setPage(page + 1)} className="page-button">
            Next
          </Button>
        </div>) : (<></>)
      }
    </>
  )
}

export default ProductsList;