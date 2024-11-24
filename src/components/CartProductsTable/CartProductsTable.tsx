import { FC } from "react";
import TableRow from "../TableRow/TableRow";
import { useCart } from "../../context/cart-context";

const CartProductsTable: FC = () => {
  const { cartProducts, cartTotalAmount } = useCart().state;
  
  return(
    <div className="order-container">
      <table className="cart-products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        {cartProducts.length > 0 && <tbody>
          {cartProducts.map((cartProduct, index) => (
            <TableRow key={index} cartProduct={cartProduct}/>
          ))}
        </tbody>}
      </table>
      { cartProducts.length > 0
      ? <p className="cart-total-amount">Total amount: S/ {cartTotalAmount}</p>
      : <p className="cart-empty-message">Your cart is empty for now. <br /> Browse our products and find something you love!</p>
      }
    </div>
  )
}

export default CartProductsTable;