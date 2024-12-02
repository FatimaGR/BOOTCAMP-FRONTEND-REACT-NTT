import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input/Input";
import { FC, useState } from "react";
import "./resetmodal.css";
import { validateEmail } from "../../shared/utils/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmAlertImg from "../../assets/images/confirm-alert.png";

interface ResetModalProps {
  closeModal: () => void,
}

const ResetModal: FC<ResetModalProps> = ({closeModal}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const confirmAlert = withReactContent(Swal);

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = target.value;
    setEmail(emailValue);
    if (!emailValue || emailValue == " "){
      setError("This value is required");
    } else if (!validateEmail(emailValue)){
      setError("Enter a valid email");
    } else {
      setError("");
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || email == " "){
      setError("This value is required");
    };

    if (error == "" && email){
      closeModal();
      confirmAlert.fire({
        title: "Password Reset Sent",
        html: (
          <div>
            <img src={confirmAlertImg} alt="confirm alert image" className="confirm-alert-img"/>
            <p>We have sent an email with instructions to reset your password.</p>
          </div>
          ),
        confirmButtonText: "Accept",
      });
    }
  };

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
          error={error}
        />
        <div className="modal-buttons">
          <Button type="submit" text="Send" className="form-button"/>
          <Button text="Cancel" className="form-button" onClick={closeModal}/>
        </div>
      </form>
    </div>
  )
};

export default ResetModal;