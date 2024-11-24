import { FC } from "react";
import { useCart } from "../../context/cart-context";

interface ModalProps {
  closeModal: () => void,
}

const Modal: FC<ModalProps> = ({closeModal}) => {
  const { resetCart } = useCart();

  const handleClick = () => {
    resetCart();
    closeModal();
  }

  return(
    <div className="modal-container">
      <p>🎉 Thank you for your purchase!</p>
      <p>Your order has been successfully placed. We can’t wait for you to enjoy it! 😊</p>
      <button onClick={handleClick}>Acept</button>
    </div>
  )
};

export default Modal;