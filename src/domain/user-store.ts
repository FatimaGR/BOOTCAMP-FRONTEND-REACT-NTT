import { Dispatch } from "react";
import { DispatchObject } from "../context/cart/cart-reducer";

export type UserDispatch = Dispatch<DispatchObject<UserActions>>;

export const enum UserActions{
  Login = "RESET_CART",
  Logout = "ADD_TO_CART",
}