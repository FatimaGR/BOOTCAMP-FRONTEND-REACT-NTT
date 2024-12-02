import { useCartDispatch, useCartState } from "../../context/cart/cart-context.tsx";
import { CartProduct, Product } from "../../domain/interfaces.ts";
import { FC, useState } from "react";
import Button from "../../shared/components/Button/Button.tsx";
import { replaceHyphensWithSpaces } from "../../shared/utils/utils.ts";
import defaultImage from "../../assets/images/product-default-image.svg";
import { addToCart } from "../../context/cart/cart-utils.ts";
import "./productCard.css";

interface ProductCardProps {
  productData: Product,
}

const ProductCard: FC<ProductCardProps> = ({productData}) => {
  const { cartProducts, cartTotalAmount, cartProductsCounter } = useCartState();
  const dispatch = useCartDispatch();
  const cartProduct: CartProduct = {
    id: productData.id,
    name: productData.title,
    image: productData.images[0],
    quantity: 1,
    price: productData.price,
  };
  const [productImage, setProductImage] = useState(productData.images[0] || defaultImage);

  const handleClick = (): void => {
    addToCart(cartProduct, cartProducts, cartTotalAmount, cartProductsCounter, dispatch);
  }

  const handleImageError = () => {
    setProductImage(defaultImage);
  }

  return(
    <div className="product-card">
      <img src={productImage} alt={productData.title} onError={handleImageError}/>
      <div className="product-description">
        <p className="category">{replaceHyphensWithSpaces(productData.category)}</p>
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