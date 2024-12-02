import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../assets/icons/menu.svg";
import { useCartState } from "../../context/cart/cart-context";
import Button from "../../shared/components/Button/Button";
import cartIcon from "../../assets/icons/cart.svg";
import logoutIcon from "../../assets/icons/log-out.svg";
import "./navbar.css";
import { AppRoutes } from "../../enums/routes";
import { useUser, useUserDispatch } from "../../context/user/user-context";
import { UserActions } from "@/domain/user-store";

const Navbar: FC = () => {
  const { cartProductsCounter } = useCartState();
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const handleToggleMenu = (): void => {
    setMenuToggle(!menuToggle);
  }

  const handleNavigate = (): void => {
    navigate(AppRoutes.OrderSummary);
  }

  const handleLogout = (): void => {
    dispatch({type: UserActions.Logout});
    navigate(AppRoutes.Login);
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
          <p className="welcome-message">Welcome: {user.username}</p>
          <Button 
            onClick={handleNavigate}
            className="header-item cart"
            text="Cart"
            icon={cartIcon} 
            iconAlt="Go to shopping cart"
          >
            <span className="counter">
              {cartProductsCounter}
            </span>
          </Button>
          <Button 
            onClick={handleLogout}
            className="header-item logout"
            text="Log out"
            icon={logoutIcon} 
            iconAlt="Log out icon"
          />
        </nav>
      </div>
    </header>
  )
}

export default Navbar;