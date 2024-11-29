import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";
import { cartReducer, CartState, initialCartState } from "./cart-reducer"
import { CartDispatch } from "../domain/cart-store";
import { useLocalStorage } from "../shared/hooks/useLocalStorage/useLocalStorage";

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined);

const CartProvider: FC<PropsWithChildren> = ({children}) => {
  const { storedValue: localStorageCartState } = useLocalStorage<typeof initialCartState>("CartState", initialCartState);
  const [state, dispatch] = useReducer(cartReducer, localStorageCartState);

  return(
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
};

const useCartState = () => {
  const context = useContext(CartStateContext);
  if (!context){
    throw new Error("useCart must be in CartStateContext");
  }
  return context;
};

const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (!context){
    throw new Error("useCart must be in CartDispatchContext");
  }
  return context;
};

export { CartProvider, CartStateContext, CartDispatchContext, useCartState, useCartDispatch };