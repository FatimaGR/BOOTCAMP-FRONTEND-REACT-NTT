import { renderHook } from "@testing-library/react";
import { CartProvider, useCartDispatch, useCartState } from "../cart-context";

describe("Cart context", () => {
  it("should initilize correct state", () => {
    const { result } = renderHook(() => useCartState(), {
      wrapper: CartProvider,
    });

    expect(result.current).toEqual({
      cartProducts: [],
      cartProductsCounter: 0,
      cartTotalAmount: 0,
    });
  });

  it("should throw an error if useCartState is used outside of CartProvider", () => {
    const renderComponent = () => { 
      renderHook(() => useCartState());
    };
    expect(renderComponent).toThrow("useCart must be in CartStateContext");
  });

  it("should throw an error if useCartDispatch is used outside of CartProvider", () => {
    const renderComponent = () => { 
      renderHook(() => useCartDispatch());
    };
    expect(renderComponent).toThrow("useCart must be in CartDispatchContext");
  });
})