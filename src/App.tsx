import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import OrderSummary from "./pages/OrderSummary/OrderSummary.tsx";
import { useCartState } from "./context/cart/cart-context.tsx";
import { useLocalStorage } from "./shared/hooks/useLocalStorage/useLocalStorage.ts";
import { initialCartState } from "./context/cart/cart-reducer.ts";
import "./index.css";
import { AppRoutes } from "./enums/routes.ts";
import Login from "./pages/Login/Login.tsx";
import { useUser } from "./context/user/user-context.tsx";
import { initialUser } from "./context/user/user-reducer.ts";

const App: FC = () => {
  const user = useUser();
  const { setStoredValue: setUserStorage } = useLocalStorage<typeof initialUser>("User", user);
  const cartState = useCartState();
  const { setStoredValue: setCartStorage } = useLocalStorage<typeof initialCartState>("CartState", cartState);

  useEffect(() => {
    setCartStorage(cartState);
    // no debe guardarse correo ni usuario no es necesario
    setUserStorage(user);
  }, [cartState, user]);
  
  return (
    <Routes>
      {/* public routes */}
      <Route path={AppRoutes.Login} element={<Login/>}/>
      {/* private routes*/}
      <Route path={AppRoutes.Home} element={<Home/>}/>
      <Route path={AppRoutes.OrderSummary} element={<OrderSummary/>}/>
    </Routes>
  )
}

export default App;