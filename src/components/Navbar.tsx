import { FC, useState } from "react";
import { Product } from "../types/interfaces";
import Counter from "./Counter";

interface NavbarProps {
  cart: Product[],
}

const Navbar: FC<NavbarProps> = ({cart}) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const handleToggleMenu = (): void => {
    setMenuToggle(!menuToggle);
  }

  return(
    <header>
      <div className="header-content">
        <div className="my-market-logo">
          <img src="src/assets/images/my-market-logo.png" alt="My Market logo"/>
          <a href="#" aria-label="Go to My Market homepage">My Market</a>
        </div>
        <button 
          onClick={handleToggleMenu} 
          className="header-item menu-button"
          aria-label="Display menu options"
        >
          <img src="src/assets/icons/menu.svg" alt="Menu icon"/>
        </button>
        <nav className={`navbar ${menuToggle && "visible"}`}>
          <button className="header-item cart">
            <img src="src/assets/icons/cart.svg" alt="Go to shopping cart"/>
            <p>Cart</p>
            <Counter cart={cart}/>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;