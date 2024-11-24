import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";
import { cartReducer, CartState, initialCartState } from "./cart-reducer"
import { CartActions } from "../domain/actions-type";
import { CartProduct } from "../domain/interfaces";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: CartProduct) => void,
  deleteFromCart: (productId: number) => void,
  updateQuantity: (amount: number, action: string, quantity?: number) => void,
} | undefined>(undefined);

const CartProvider: FC<PropsWithChildren> = ({children}) => {
  const { storedValue: localStorageCartState } = useLocalStorage<typeof initialCartState>("CartState", initialCartState);
  const [state, dispatch] = useReducer(cartReducer, localStorageCartState);

  const updateQuantity = (amount: number, action: string, quantity?: number): void => {
    let newAmount = 0;
    let count = 0;

    if (action === "sum"){
      newAmount = state.cartTotalAmount + amount;
      count = state.cartProductsCounter + 1;
    } else if (action === "rest"){
      newAmount = state.cartTotalAmount - amount;
      const quantityToRest = quantity? quantity : 1;
      count = state.cartProductsCounter - quantityToRest;
    }

    dispatch({type: CartActions.UpdateCartCounter, payload: count});
    const newAmountRounded = parseFloat(newAmount.toFixed(2));
    dispatch({type: CartActions.UpdateCartAmount, payload: newAmountRounded});
  }

  const addToCart = (product: CartProduct):void => {
    const repeatedProduct = state.cartProducts.find((cartProduct) => cartProduct.id == product.id);
    
    if (repeatedProduct){
      repeatedProduct.quantity++;
      updateQuantity(repeatedProduct.price, "sum");
    } else {
      dispatch({type: CartActions.AddToCart, payload: product});
      updateQuantity(product.price, "sum");
    }
  }

  const deleteFromCart = (productId: number): void => {
    const product = state.cartProducts.find((cartProduct) => cartProduct.id == productId)

    if (product){
      const updatedCartProducts = state.cartProducts.filter((cartProduct) => cartProduct.id != productId)
      dispatch({type: CartActions.DeleteFromCart, payload: updatedCartProducts});
      const amount = product.price * product.quantity;
      updateQuantity(amount, "rest", product.quantity);
    }
  }

  return(
    <CartContext.Provider value={{
      state, addToCart, deleteFromCart, updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context){
    throw new Error("useCart must be in CartContext");
  }
  return context;
};

export { CartProvider, useCart };