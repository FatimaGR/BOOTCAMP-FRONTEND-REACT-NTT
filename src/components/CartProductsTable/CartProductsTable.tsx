import { FC } from "react";
import TableRow from "../TableRow/TableRow";
import { useCartState } from "../../context/cart/cart-context";
import addProductsImg from "../../assets/images/add-products.png";
import "./cartProductsTable.css";

const CartProductsTable: FC = () => {
  const { cartProducts, cartTotalAmount } = useCartState();
  
  return(
    <div className="order-container">
      <table className="cart-products-table">
        <thead>
          <tr className="big-thead">
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
          <tr>
            <th className="small-thead">Products</th>
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
      : <div className="cart-empty-container">
          <p className="cart-empty-message">
            Your cart is empty for now. 
            <br /> 
            Browse our products and find something you love!
          </p>
          <img src={addProductsImg} alt="Add products to cart image" className="add-products-image"/>
        </div>
      }
    </div>
  )
}

export default CartProductsTable;