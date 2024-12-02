import { AppRoutes } from "../enums/routes";
import { Navigate } from "react-router-dom";
import { ComponentType } from "react";
import { useUser } from "../context/user/user-context";

const withAuth = <T extends object>(Component: ComponentType<T>) => {
  return (props: T) => {
    const user = useUser();

    return user.accessToken ? (
      <Component {...props}/>
    ) : (
      <Navigate to={AppRoutes.Login} />
    );
  };
};

export default withAuth;