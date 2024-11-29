import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../assets/icons/menu.svg";
import { useCartState } from "../../context/cart-context";
import Button from "../../shared/components/Button/Button";
import cartIcon from "../../assets/icons/cart.svg";
import "./navbar.css";
import { AppRoutes } from "../../enums/routes";

const Navbar: FC = () => {
  const { cartProductsCounter } = useCartState();
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggleMenu = (): void => {
    setMenuToggle(!menuToggle);
  }

  const onClick = (): void => {
    navigate(AppRoutes.OrderSummary);
  }

  return(
    <header>
      <div className="header-content">
        <div className="my-market-logo">
          <img src="src/assets/images/my-market-logo.png" alt="My Market logo"/>
          <a href={AppRoutes.Home} aria-label="Go to My Market homepage">My Market</a>
        </div>
        <Button
          onClick={handleToggleMenu}
          className="header-item menu-button"
          aria-label="Display menu options"
          icon={menuIcon}
          iconAlt="Menu icon"
        />
        <nav className={`navbar ${menuToggle && "visible"}`}>
          <Button 
            onClick={onClick}
            className="header-item cart"
            text="Cart"
            icon={cartIcon} 
            iconAlt="Go to shopping cart"
          >
            <span className="counter">
              {cartProductsCounter}
            </span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;