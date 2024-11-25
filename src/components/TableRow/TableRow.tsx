import { FC, useEffect, useState } from "react"
import deleteIcon from "../../assets/icons/trash.svg";
import sumIcon from "../../assets/icons/plus.svg";
import restIcon from "../../assets/icons/minus.svg";
import { CartProduct } from "../../domain/interfaces";
import { useCart } from "../../context/cart-context";
import Button from "../../shared/Button/Button";

interface TableRowProps {
  cartProduct: CartProduct,
}

const TableRow: FC<TableRowProps> = ({cartProduct}) => {
  const { deleteFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setQuantity(cartProduct.quantity);
    setIsDisabled(cartProduct.quantity === 1);
  }, [cartProduct.quantity]);

  const handleDelete = () => {
    deleteFromCart(cartProduct.id);
  }

  const handleIncreaseQuantity = () => {
    updateQuantity(cartProduct.price, "sum");
    cartProduct.quantity = cartProduct.quantity + 1;
  }

  const handleDecreaseQuantity = () => {
    updateQuantity(cartProduct.price, "rest");
    cartProduct.quantity = cartProduct.quantity - 1;
  }

  return(
    <tr key={cartProduct.id} className="cart-products-table-tr">
      <td className="cart-product-image"><img src={cartProduct.image} alt={cartProduct.name}/></td>
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
          iconAlt="rest product icon"
        />
        <p className="cart-product-quantity-number">{quantity}</p>
        <Button 
          onClick={handleIncreaseQuantity}
          icon={sumIcon}
          iconAlt="add product icon"
        />
      </td>
      <td className="cart-delete-product">
        <Button
          onClick={handleDelete}
          icon={deleteIcon}
          iconAlt="delete product icon"
        />
      </td>
    </tr>
  )
}

export default TableRow;