import { CartDispatchContext, CartStateContext } from "@/context/cart/cart-context";
import { CartState } from "@/context/cart/cart-reducer";
import { UserContext, UserDispatchContext } from "@/context/user/user-context";
import { CartDispatch } from "@/domain/cart-store";
import { UserResponse } from "@/domain/interfaces";
import { UserDispatch } from "@/domain/user-store";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

interface CustomContextsRenderOptions {
  user: UserResponse,
  userDispatch: UserDispatch,
  cartState: CartState,
  cartDispatch: CartDispatch,
};

export const customContextsRender = (
  component: ReactElement, 
  {user, userDispatch, cartState, cartDispatch}: CustomContextsRenderOptions
) => {
  return render(
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={userDispatch}>
      <CartStateContext.Provider value={cartState}>
        <CartDispatchContext.Provider value={cartDispatch}>
          {component}
        </CartDispatchContext.Provider>
      </CartStateContext.Provider>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
};
