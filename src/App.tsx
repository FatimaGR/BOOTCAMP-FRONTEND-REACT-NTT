import Home from "./pages/Home.tsx";
import "./index.css";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { useState } from "react";
import { Product } from "./types/interfaces.ts";

function App() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addToCart = (product: Product):void => {
    const productsList = [...cartProducts, product];
    setCartProducts(productsList);
  }

  return (
    <div>
      {<Navbar cart={cartProducts}/>}
      {<Home addToCart={addToCart}/>}
      {<Footer/>}
    </div>
  )
}

export default App;