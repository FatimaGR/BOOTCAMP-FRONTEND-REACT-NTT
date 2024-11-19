import { Product } from "../types/interfaces.js";
import { FC } from "react";

interface ProductCardProps {
  productData: Product,
  addToCart: (product: Product) => void,
}

const ProductCard: FC<ProductCardProps> = ({productData, addToCart}) => {
  const cartProduct: Product = {
    id: productData.id,
    title: productData.title,
    description: productData.description,
    category: productData.category,
    images: productData.images,
    brand: productData.brand,
    price: productData.price,
  };

  const handleClick = (): void => {
    addToCart(cartProduct);
  }

  return(
    <div className="product-card">
      <img src={productData.images[0]} alt={productData.title}/>
      <div className="product-description">
        <p className="category">{productData.category.replace(/-/g, " ")}</p>
        <p className="name">{productData.title}</p>
        <p className="description">{productData.description}</p>
        <p className="brand">{productData.brand}</p>
        <div className="buy-section">
          <button className="buy-button" onClick={handleClick}>Add to cart</button>
          <p className="price">{"S/" + productData.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;