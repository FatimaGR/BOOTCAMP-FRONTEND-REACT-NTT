import { FC } from "react";
import { useCart } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button/Button";
import CartProductCard from "../CartProductCart/CartProductCard";

interface ModalProps {
  closeModal: () => void,
}

const Modal: FC<ModalProps> = ({closeModal}) => {
  const { cartProducts, cartTotalAmount } = useCart().state;
  const { resetCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    resetCart();
    closeModal();
    document.body.classList.remove("body-no-scroll");
    navigate("/");
  }

  return(
    <div className="modal-container">
      <div className="modal-content">
        <p className="modal-title">Thank you for your purchase! 🎉</p>
        <p>Your order has been successfully placed. We can’t wait for you to enjoy it! 😊</p>
        <p className="modal-subtitle">Order Summary:</p>
        <div className="order-products">
          {cartProducts.map((cartProduct) => (
            <CartProductCard cartProductData={cartProduct}/>
          ))}
        </div>
        <p>Total amount: S/ {cartTotalAmount}</p>
        <Button className="form-button" onClick={handleClick}>Accept</Button>
      </div>
    </div>
  )
};

export default Modal;