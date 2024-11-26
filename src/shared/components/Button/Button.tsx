import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text?: string,
  icon?: string,
  iconAlt?: string,
  ariaLabel?: string,
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  text, icon, iconAlt, ariaLabel, children, ...props
}) => {

  return(
    <button {...props} aria-label={ariaLabel}>
      {icon && <img src={icon} alt={iconAlt || "button icon"}/>}
      {text && <p>{text}</p>}
      {children}
    </button>
  )
};

export default Button;