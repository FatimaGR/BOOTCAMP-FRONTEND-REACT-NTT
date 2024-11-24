import { FC } from "react";
import CartProductsTable from "../../components/CartProductsTable/CartProductsTable";
import "./orderSummary.css";
import ShippingForm from "../../components/ShippingForm/ShippingForm";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../shared/hooks/useModal";

const OrderSummary: FC = () => {
  const {isModalVisible, openModal, closeModal} = useModal();

  return(
    <main>
      <CartProductsTable/>
      <ShippingForm openModal={openModal}/>
      {isModalVisible && <Modal closeModal={closeModal}/>}
    </main>
  )
}

export default OrderSummary;