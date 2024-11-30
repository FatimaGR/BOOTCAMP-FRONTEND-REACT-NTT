import { FC } from "react";
import { useCartDispatch, useCartState } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button/Button";
import CartProductCard from "../CartProductCart/CartProductCard";
import { AppRoutes } from "../../enums/routes";
import { resetCart } from "@/context/cart-utils";

interface ModalProps {
  closeModal: () => void,
}

const Modal: FC<ModalProps> = ({closeModal}) => {
  const { cartProducts, cartTotalAmount } = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    resetCart(dispatch);
    closeModal();
    document.body.classList.remove("body-no-scroll");
    navigate(AppRoutes.Home);
  }

  return(
    <div className="modal-container">
      <div className="modal-content">
        <p className="modal-title">Thank you for your purchase! 🎉</p>
        <p>Your order has been successfully placed. We can’t wait for you to enjoy it! 😊</p>
        <p className="modal-subtitle">Order Summary:</p>
        <div className="order-products">
          {cartProducts.map((cartProduct) => (
            <CartProductCard key={cartProduct.id} cartProductData={cartProduct}/>
          ))}
        </div>
        <p>Total amount: S/ {cartTotalAmount}</p>
        <Button className="form-button" onClick={handleClick}>Accept</Button>
      </div>
    </div>
  )
};

export default Modal;