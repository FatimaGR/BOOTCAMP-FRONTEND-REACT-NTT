import ProductCard from "../ProductCard/ProductCard.tsx";
import { Product } from "../../domain/interfaces.ts";
import { FC } from "react";
import noProducts from "../../assets/images/no-products.svg";
import loadingImage from "../../assets/images/loading.svg";
import Button from "../../shared/components/Button/Button.tsx";
import { usePagination } from "../../shared/hooks/usePagination/usePagination.ts";

interface ProductsListProps {
  initialProductsData: Product[],
  isLoading: boolean,
}

const ProductsList: FC<ProductsListProps> = ({initialProductsData, isLoading}) => {
  const noProductsMessage = "No products were found";
  const loadingMessage = "Loading...";
  const limit = 20;
  const { paginatedData: paginatedProducts, currentPage, nextPage, previousPage } = usePagination(initialProductsData, limit);

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
          <Button disabled={currentPage === 1} onClick={previousPage} className="page-button">
            Previous
          </Button>
          <Button disabled={paginatedProducts.length < limit} onClick={nextPage} className="page-button">
            Next
          </Button>
        </div>) : (<></>)
      }
    </>
  )
}

export default ProductsList;