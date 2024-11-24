import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  firstContainerClassName: string,
  secondContainerClassName?: string,
  label?: string,
  icon?: string,
  iconAlt?: string,
  error?: string,
  confirmed?: string,
}

const Input: FC<InputProps> = ({
  firstContainerClassName="", secondContainerClassName="", label, icon, iconAlt, error, confirmed, ...props
}) => {
  const containerClassName = error
    ? `error-${firstContainerClassName}`
    : confirmed
    ? `confirmed-${firstContainerClassName}`
    : firstContainerClassName;

  const inputElement = (
    <>
      <input {...props}/>
      {icon && <img src={icon} alt={iconAlt || "input icon"}/>}
    </>
  )

  return(
    <div className={containerClassName}>
      {label && icon ? (
          <>
            <label>{label}</label>
            <div className={secondContainerClassName}>{inputElement}</div>
          </>
        ) : (
          <>
            {label && <label>{label}</label>}
            {inputElement}
          </>
        )
      }
      {error && <p className="error-message">{error}</p>}
    </div>
  )
};

export default Input;