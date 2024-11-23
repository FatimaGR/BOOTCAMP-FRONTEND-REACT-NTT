import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { FC } from "react";
import "./index.css";
import OrderSummary from "./pages/OrderSummary/OrderSummary.tsx";

const App: FC = () => {
  
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