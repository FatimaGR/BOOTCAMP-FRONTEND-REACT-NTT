import { useState } from "react";

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  return{
    isVisible,
    openModal,
    closeModal,
    handleModal
  };
};