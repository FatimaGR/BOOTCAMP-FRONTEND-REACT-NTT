import { AppRoutes } from "@/enums/routes";
import { Navigate } from "react-router-dom";
import { ComponentType } from "react";

const withAuth = <T extends object>(Component: ComponentType<T>) => {
  return (props: T) => {
    const user = true;

    return user ? (
      <Component {...props}/>
    ) : (
      <Navigate to={AppRoutes.Login} />
    );
  };
};

export default withAuth;