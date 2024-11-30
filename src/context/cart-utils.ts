import { CartProduct } from "@/domain/interfaces";
import { CartActions, CartDispatch } from "../domain/cart-store";
import { UpdateQuantity } from "../enums/function-actions";

export const updateQuantity = (
  amount: number, 
  action: string, 
  cartTotalAmount: number,
  cartProductsCounter: number,
  dispatch: CartDispatch,
  quantity?: number,
): { newAmount: number, newCount: number } => {
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

  return { newAmount: newAmountRounded, newCount: count };
};

export const addToCart = (
  product: CartProduct,
  cartProducts: CartProduct[],
  cartTotalAmount: number,
  cartProductsCounter: number,
  dispatch: CartDispatch,
):void => {
  const repeatedProduct = cartProducts.find((cartProduct) => cartProduct.id == product.id);
  
  if (repeatedProduct){
    repeatedProduct.quantity++;
    updateQuantity(repeatedProduct.price, UpdateQuantity.Increase, cartTotalAmount, cartProductsCounter, dispatch);
  } else {
    dispatch({type: CartActions.AddToCart, payload: product});
    updateQuantity(product.price, UpdateQuantity.Increase, cartTotalAmount, cartProductsCounter, dispatch);
  }
};

export const deleteFromCart = (
  productId: number,
  cartProducts: CartProduct[],
  cartTotalAmount: number,
  cartProductsCounter: number,
  dispatch: CartDispatch,
): void => {
  const product = cartProducts.find((cartProduct) => cartProduct.id == productId)

  if (product){
    const updatedCartProducts = cartProducts.filter((cartProduct) => cartProduct.id != productId)
    dispatch({type: CartActions.DeleteFromCart, payload: updatedCartProducts});
    const amount = product.price * product.quantity;
    updateQuantity(amount, UpdateQuantity.Decrease, cartTotalAmount, cartProductsCounter, dispatch, product.quantity);
  }
};

export const resetCart = (dispatch: CartDispatch): void => {
  dispatch({type: CartActions.ResetCart});
}