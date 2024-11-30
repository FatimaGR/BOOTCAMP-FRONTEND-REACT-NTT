import { UpdateQuantity } from "@/enums/function-actions";
import { addToCart, deleteFromCart, resetCart, updateQuantity } from "../cart-utils";
import { CartActions } from "@/domain/cart-store";
import { CartProduct } from "@/domain/interfaces";

const mockDispatch = jest.fn();

describe("Cart utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should increase the quantity and total amount", () => {
    const result = updateQuantity(10, UpdateQuantity.Increase, 50, 3, mockDispatch);
    expect(result.newAmount).toBe(60);
    expect(result.newCount).toBe(4);
  });

  it("should decrease the quantity and total amount", () => {
    const result = updateQuantity(10, UpdateQuantity.Decrease, 50, 3, mockDispatch);
    expect(result.newAmount).toBe(40);
    expect(result.newCount).toBe(2);
  });

  it("should increase quantity of an product", () => {
    const cartProducts = [{
      id: 1,
      name: "Essence Mascara Lash Princess",
      price: 19.98,
      quantity: 2,
      image: "url"
    }];
    const cartTotalAmount = 39.96;
    const cartProductsCounter = 2;
    const product = {
      id: 1,
      name: "Essence Mascara Lash Princess",
      price: 19.98,
      quantity: 1,
      image: "url"
    };

    addToCart(product, cartProducts, cartTotalAmount, cartProductsCounter, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateCartAmount,
      payload: 59.94
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateCartCounter,
      payload: 3
    });
  });

  it("should add a new product to the cart", () => {
    const cartProducts: CartProduct[] = [];
    const cartTotalAmount = 0;
    const cartProductsCounter = 0;
    const product = {
      id: 2,
      name: "Eyeshadow Palette",
      price: 39.98,
      quantity: 1,
      image: "url"
    };

    addToCart(product, cartProducts, cartTotalAmount, cartProductsCounter, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.AddToCart,
      payload: product
    });
  });

  it("should delete a product from the cart", () => {
    const cartProducts = [
      { id: 1, name: "Essence Mascara Lash Princess", price: 19.98, quantity: 2, image: "url" },
      { id: 2, name: "Eyeshadow Palette", price: 39.98, quantity: 1, image: "url" }
    ];
    const cartTotalAmount = 79.94;
    const cartProductsCounter = 3;

    deleteFromCart(1, cartProducts, cartTotalAmount, cartProductsCounter, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.DeleteFromCart,
      payload: [{ id: 2, name: "Eyeshadow Palette", price: 39.98, quantity: 1, image: "url" }]
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateCartAmount,
      payload: 39.98
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateCartCounter,
      payload: 1
    });
  });

  it("should reset the cart", () => {
    resetCart(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.ResetCart
    });
  });
})