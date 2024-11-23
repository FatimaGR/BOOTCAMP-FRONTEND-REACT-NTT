import { Dispatch } from "react";
import { DispatchObject } from "../context/cart-reducer";

export type CartDispatch = Dispatch<DispatchObject<CartActions>>;

export const enum CartActions{
  AddToCart = "ADD_TO_CART",
  DeleteFromCart = "DELETE_FROM_CART",
  UpdateCartCounter = "UPDATE_CART_COUNTER",
  UpdateCartAmount = "UPDATE_CART_AMOUNT",
}