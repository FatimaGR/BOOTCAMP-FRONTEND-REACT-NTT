import Home from "./pages/Home/Home.tsx";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { FC } from "react";

const App: FC = () => {
  
  return (
    <>
      <Navbar/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App;