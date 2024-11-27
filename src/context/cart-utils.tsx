import { CartActions } from "../domain/cart-store";
import { UpdateQuantity } from "../enums/function-actions";
import { useCartDispatch, useCartState } from "./cart-context";

export const updateQuantity = (amount: number, action: string, quantity?: number): void => {
  const { cartTotalAmount, cartProductsCounter } = useCartState();
  const dispatch = useCartDispatch();
  let newAmount = 0;
  let count = 0;

  if (action === UpdateQuantity.Increase){
    newAmount = cartTotalAmount + amount;
    count = cartProductsCounter + 1;
  } else if (action === UpdateQuantity.Decrease){
    newAmount = cartTotalAmount - amount;
    const quantityToRest = quantity? quantity : 1;
    count = cartProductsCounter - quantityToRest;
  }

  dispatch({type: CartActions.UpdateCartCounter, payload: count});
  const newAmountRounded = parseFloat(newAmount.toFixed(2));
  dispatch({type: CartActions.UpdateCartAmount, payload: newAmountRounded});
}