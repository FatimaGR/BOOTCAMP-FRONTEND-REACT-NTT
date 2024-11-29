import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import OrderSummary from "./pages/OrderSummary/OrderSummary.tsx";
import { useCartState } from "./context/cart-context.tsx";
import { useLocalStorage } from "./shared/hooks/useLocalStorage/useLocalStorage.ts";
import { initialCartState } from "./context/cart-reducer.ts";
import "./index.css";
import { AppRoutes } from "./enums/routes.ts";

const App: FC = () => {
  const state = useCartState();
  const { setStoredValue } = useLocalStorage<typeof initialCartState>("CartState", state);

  useEffect(() => {
    setStoredValue(state);
  }, [state]);
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path={AppRoutes.Home} element={<Home/>}/>
        <Route path={AppRoutes.OrderSummary} element={<OrderSummary/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;