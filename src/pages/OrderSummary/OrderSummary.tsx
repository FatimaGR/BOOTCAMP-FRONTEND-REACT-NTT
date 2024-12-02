import { FC } from "react";
import CartProductsTable from "../../components/CartProductsTable/CartProductsTable";
import ShippingForm from "../../components/ShippingForm/ShippingForm";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../shared/hooks/useModal/useModal";
import withAuth from "../../hoc/withAuth";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const OrderSummary: FC = () => {
  const {isModalVisible, openModal, closeModal} = useModal();

  return(
    <>
      <Navbar/>
      <main>
        <CartProductsTable/>
        <ShippingForm openModal={openModal}/>
        {isModalVisible && <Modal closeModal={closeModal}/>}
      </main>
      <Footer/>
    </>
  )
}

export default withAuth(OrderSummary);