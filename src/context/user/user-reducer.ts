import { UserResponse } from "@/domain/interfaces";
import { UserActions } from "@/domain/user-store";

export interface DispatchObject<A, T = any> {
  type: A,
  payload?: T,
}

export const initialUser: UserResponse = {
  id: 0,
  username: "",
  email: "",
  accessToken: "",
  refreshToken: ""
};

export const userReducer = <T>(
  user: UserResponse | null,
  {type, payload}: DispatchObject<T>
) => {
  switch (type){
    case UserActions.Login:
      return user = {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    case UserActions.Logout:
      return user = initialUser;
    default:
      console.log("Invalid User Actions option");
      return user
  }
}