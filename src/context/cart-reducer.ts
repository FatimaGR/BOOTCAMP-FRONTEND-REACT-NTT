import { CartActions } from "../domain/actions-type";
import { CartProduct } from "../domain/interfaces";

export interface DispatchObject<A, T = any> {
  type: A,
  payload?: T,
}

export interface CartState {
  cartProducts: CartProduct[],
  cartProductsCounter: number,
  cartTotalAmount: number,
}

export const initialCartState: CartState = {
  cartProducts: [],
  cartProductsCounter: 0,
  cartTotalAmount: 0,
}

export const cartReducer = <T>(
  state: CartState,
  {type, payload}: DispatchObject<T>
) => {
  switch (type){
    case CartActions.AddToCart:
      return{
        ...state,
        cartProducts: [...state.cartProducts, payload as CartProduct],
      }
    case CartActions.DeleteFromCart:
      return{
        ...state,
        cartProducts: payload as CartProduct[],
      }
    case CartActions.UpdateCartCounter:
      return{
        ...state,
        cartProductsCounter: payload as number,
      }
    case CartActions.UpdateCartAmount:
      return{
        ...state,
        cartTotalAmount: payload as number,
      }
    default:
      console.log("Invalid Cart Actions option");
      return state
  }
}