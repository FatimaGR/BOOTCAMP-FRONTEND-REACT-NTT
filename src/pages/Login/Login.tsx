import { FC, useEffect, useState } from "react";
import loginIcon from "../../assets/icons/log-in.svg";
import Input from "../../shared/components/Input/Input";
import { UserCredentials } from "../../domain/interfaces";
import Button from "../../shared/components/Button/Button";
import { useModal } from "../../shared/hooks/useModal/useModal";
import ResetModal from "../../components/ResetModal/ResetModal";
import { useApi } from "../../shared/hooks/useApi/useApi";
import { useUserDispatch } from "../../context/user/user-context";
import { UserActions } from "../../domain/user-store";
import { AppRoutes } from "../../enums/routes";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login: FC = () => {
  const {isModalVisible, openModal, closeModal} = useModal();
  const [formData, setFormData] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [submitConfirmed, setSubmitConfirmed] = useState(false);
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});
  const {data, isLoading, error} = useApi(
    submitConfirmed ? "https://dummyjson.com/auth/login" : "", 
    {method: "POST", body: formData}
  );
  const [errorAfterConfirmed, setErrorAfterConfirm] = useState(false);
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch({type: UserActions.Login, payload: data});
        navigate(AppRoutes.Home);
      }
      if (error) {
        setSubmitConfirmed(false);
      }
    };
  }, [submitConfirmed, isLoading, data, error]);

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});

    let newErrors: {[key: string]: string} = {...inputErrors};

    if (!value || value == " "){
      newErrors[name] = "This value is required";
    } else {
      delete newErrors[name];
    };

    setInputErrors(newErrors);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newErrors: {[key: string]: string} = {...inputErrors};

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof UserCredentials]){
        newErrors[key] = "This value is required";
      }
    });

    setInputErrors(newErrors);
    setErrorAfterConfirm(true);

    if (Object.keys(newErrors).length === 0){
      setSubmitConfirmed(true);
    };
  };

  return(
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-title">
          <img src={loginIcon} alt="login icon" className="login-icon"/>
          <p>Login</p>
        </div>
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="username"
          id="username"
          value={formData.username}
          placeholder="Enter your username"
          label="Username"
          type="text"
          error={inputErrors.username}
        />
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="password"
          id="password"
          value={formData.password}
          placeholder="Enter your password"
          label="Password"
          type="password"
          error={inputErrors.password}
        />
        <Button text="Forgot your password?" className="forgot-password-button" onClick={openModal}/>
        <Button type="submit" text="Log in" className="form-button"/>
      </form>
      {isLoading && <p>Loading</p>}
      {errorAfterConfirmed && !isLoading && Object.keys(inputErrors).length === 0 ? (<p>Incorrect username or password</p>) : ""}
      {isModalVisible && <ResetModal closeModal={closeModal}/>}
    </div>
  )
}

export default Login;