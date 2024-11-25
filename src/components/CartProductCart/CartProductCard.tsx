import { FC } from "react";
import { CartProduct } from "../../domain/interfaces";

interface CartProductCardProps {
  cartProductData: CartProduct,
}

const CartProductCard: FC<CartProductCardProps> = ({cartProductData}) => {
  return(
    <div className="order-product">
      <img src={cartProductData.image} alt={cartProductData.name} />
      <div className="order-product-detail">
        <p><b>Product:</b> {cartProductData.name}</p>
        <p><b>Price:</b> S/ {cartProductData.price * cartProductData.quantity}</p>
        <p><b>Quantity:</b> {cartProductData.quantity}</p>
      </div>
    </div>
  )
}

export default CartProductCard;