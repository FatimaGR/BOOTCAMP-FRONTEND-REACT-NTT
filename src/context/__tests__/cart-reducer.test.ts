import { CartActions } from "@/domain/cart-store";
import { cartReducer } from "../cart-reducer";
import { mockEmptyCartState, mockFullCartState } from "@/services/__mocks___/cartState";
import { cartProductMock } from "@/services/__mocks___/cartProduct";

describe("Cart reducer", () => { 
  it("should reset cart", () => {
    const action = { type: CartActions.ResetCart };

    const newState = cartReducer(mockFullCartState, action);
    expect(newState).toEqual(mockEmptyCartState);
  });

  it("should add a product to the cart", () => {
    const action = { 
      type: CartActions.AddToCart,
      payload: cartProductMock
    };
    const newState = cartReducer(mockEmptyCartState, action);

    expect(newState.cartProducts).toEqual([cartProductMock]);
    expect(newState.cartProductsCounter).toEqual(0);
    expect(newState.cartTotalAmount).toEqual(0);
  });

  it("should delete a product from the cart", () => {
    const updatedProducts = [{
      id: 2,
      name: "Eyeshadow Palette with Mirror",
      image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
      quantity: 2,
      price: 39.98,
    },{
      id: 3,
      name: "Powder Canister",
      image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
      quantity: 1,
      price: 14.99,
    }];

    const action = { 
      type: CartActions.DeleteFromCart,
      payload: updatedProducts
    };
    const newState = cartReducer(mockFullCartState, action);
    expect(newState.cartProducts).toEqual(updatedProducts);
  });

  it('should update the cart products counter', () => {
    const action = { type: CartActions.UpdateCartCounter, payload: 5 };
    const newState = cartReducer(mockFullCartState, action);
  
    expect(newState.cartProductsCounter).toEqual(5);
  });

  it('should update the cart total amount', () => {
    const action = { type: CartActions.UpdateCartAmount, payload: 50 };
    const newState = cartReducer(mockFullCartState, action);
  
    expect(newState.cartTotalAmount).toEqual(50);
  });

  it("should return the current state for an invalid action", () => {
    const action = { type: "INVALID_ACTION" };
    const newState = cartReducer(mockEmptyCartState, action);
    expect(newState).toEqual(mockEmptyCartState);
  });
})