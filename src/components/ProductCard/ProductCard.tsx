import { useCart } from "../../context/cart-context.tsx";
import { CartProduct, Product } from "../../domain/interfaces.ts";
import { FC } from "react";
import Button from "../../shared/Button/Button.tsx";

interface ProductCardProps {
  productData: Product,
}

const ProductCard: FC<ProductCardProps> = ({productData}) => {
  const { addToCart } = useCart();
  const cartProduct: CartProduct = {
    id: productData.id,
    name: productData.title,
    image: productData.images[0],
    quantity: 1,
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
          <Button className="buy-button" onClick={handleClick} text="Add to cart"/>
          <p className="price">{"S/" + productData.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;