import { CartDispatchContext, CartStateContext } from "@/context/cart/cart-context";
import { CartState } from "@/context/cart/cart-reducer"
import { CartDispatch } from "@/domain/cart-store";
import { render } from "@testing-library/react"
import { ReactElement } from "react";

interface CustomRenderOptions {
  cartState: CartState,
  dispatch: CartDispatch,
};

export const customRender = (
  component: ReactElement, 
  {cartState, dispatch}: CustomRenderOptions
) => {
  return render(
    <CartStateContext.Provider value={cartState}>
      <CartDispatchContext.Provider value={dispatch}>
        {component}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
};
