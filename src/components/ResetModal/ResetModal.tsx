import { AppRoutes } from "../../enums/routes";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input/Input";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetmodal.css";

interface ResetModalProps {
  closeModal: () => void,
}

const ResetModal: FC<ResetModalProps> = ({closeModal}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    console.log(email)
    closeModal();
  }

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(AppRoutes.Home);
  }

  return(
    <div className="reset-modal-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <p>Reset your password</p>
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="email"
          id="email"
          value={email}
          placeholder="Enter your email"
          label="Email"
          type="email"
        />
        <div className="modal-buttons">
          <Button type="submit" text="Send" className="form-button" onClick={handleClick}/>
          <Button text="Cancel" className="form-button" onClick={closeModal}/>
        </div>
      </form>
    </div>
  )
};

export default ResetModal;