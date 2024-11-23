import { FC } from "react";
import CartProductsTable from "../../components/CartProductsTable/CartProductsTable";
import "./orderSummary.css";

const OrderSummary: FC = () => {
  return(
    <main>
      <CartProductsTable/>
    </main>
  )
}

export default OrderSummary;