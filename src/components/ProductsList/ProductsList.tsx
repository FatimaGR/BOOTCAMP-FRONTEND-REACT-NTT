import ProductCard from "../ProductCard/ProductCard.tsx";
import { Product } from "../../domain/interfaces.ts";
import { FC, useState } from "react";
import noProducts from "../../assets/images/no-products.svg";
import loadingImage from "../../assets/images/loading.svg";
import Button from "../../shared/components/Button/Button.tsx";

interface ProductsListProps {
  initialProductsData: Product[],
  isLoading: boolean,
}

const pagination = (data:Product[], page:number, limit:number): Product[] => {
  const startId = (page - 1) * limit;
  const endId = page * limit;
  const paginatedData: Product[] = data?.slice(startId, endId);
  return paginatedData;
};

const ProductsList: FC<ProductsListProps> = ({initialProductsData, isLoading}) => {
  const noProductsMessage = "No products were found";
  const [page, setPage] = useState(1);
  const limit: number = 20;
  const paginatedProducts: Product[] = pagination(initialProductsData, page, limit);

  return(
    <>
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