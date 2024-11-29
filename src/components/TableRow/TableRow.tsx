import { FC, useEffect, useState } from "react"
import deleteIcon from "../../assets/icons/trash.svg";
import sumIcon from "../../assets/icons/plus.svg";
import restIcon from "../../assets/icons/minus.svg";
import { CartProduct } from "../../domain/interfaces";
import { useCartDispatch, useCartState } from "../../context/cart-context";
import Button from "../../shared/components/Button/Button";
import defaultImage from "../../assets/images/cart-product-default-image.svg";
import { UpdateQuantity } from "../../enums/function-actions";
import { deleteFromCart, updateQuantity } from "../../context/cart-utils";

interface TableRowProps {
  cartProduct: CartProduct,
}

const TableRow: FC<TableRowProps> = ({cartProduct}) => {
  const { cartProducts, cartTotalAmount, cartProductsCounter } = useCartState();
  const dispatch = useCartDispatch();
  const [quantity, setQuantity] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [cartProductImage, setCartProductImage] = useState(cartProduct.image || defaultImage);

  useEffect(() => {
    setQuantity(cartProduct.quantity);
    setIsDisabled(cartProduct.quantity === 1);
  }, [cartProduct.quantity]);

  const handleDelete = () => {
    deleteFromCart(cartProduct.id, cartProducts, cartTotalAmount, cartProductsCounter, dispatch);
  }

  const handleIncreaseQuantity = () => {
    updateQuantity(cartProduct.price, UpdateQuantity.Increase, cartTotalAmount, cartProductsCounter, dispatch);
    cartProduct.quantity = cartProduct.quantity + 1;
  }

  const handleDecreaseQuantity = () => {
    updateQuantity(cartProduct.price, UpdateQuantity.Decrease, cartTotalAmount, cartProductsCounter, dispatch);
    cartProduct.quantity = cartProduct.quantity - 1;
  }

  const handleImageError = () => {
    setCartProductImage(defaultImage);
  }

  return(
    <tr key={cartProduct.id} className="cart-products-table-tr">
      <td className="cart-product-image">
        <img src={cartProductImage} alt={cartProduct.name} onError={handleImageError}/>
      </td>
      <td className="cart-product-name">{cartProduct.name}</td>
      <td className="cart-product-price">
        S/ {((cartProduct.price) * cartProduct.quantity).toFixed(2)}
      </td>
      <td className="cart-product-quantity">
        <Button 
          onClick={handleDecreaseQuantity}
          disabled={isDisabled}
          className={isDisabled? "disabled-button" : ""}
          icon={restIcon}
          iconAlt="Decrease quantity of this product in the cart"
        />
        <p className="cart-product-quantity-number">{quantity}</p>
        <Button 
          onClick={handleIncreaseQuantity}
          icon={sumIcon}
          iconAlt="Increase quantity of this product in the cart"
        />
      </td>
      <td className="cart-delete-product">
        <Button
          onClick={handleDelete}
          icon={deleteIcon}
          iconAlt="Remove this product from the cart"
        />
      </td>
    </tr>
  )
}

export default TableRow;