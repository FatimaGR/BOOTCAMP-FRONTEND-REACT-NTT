import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import OrderSummary from "./pages/OrderSummary/OrderSummary.tsx";
import { useCart } from "./context/cart-context.tsx";
import { useLocalStorage } from "./shared/hooks/useLocalStorage.ts";
import { initialCartState } from "./context/cart-reducer.ts";
import "./index.css";

const App: FC = () => {
  const {state} = useCart();
  const { setStoredValue } = useLocalStorage<typeof initialCartState>("CartState", state);

  useEffect(() => {
    console.log(state);
    setStoredValue(state);
  }, [state]);
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/orderSummary" element={<OrderSummary/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;