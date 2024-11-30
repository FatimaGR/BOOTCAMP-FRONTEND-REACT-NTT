import { customRender } from "@/services/__wrappers__/cart-context";
import { RenderResult } from "@testing-library/react";
import CartProductCard from "../CartProductCard";
import { cartProductMock } from "@/services/__mocks___/cartProduct";
import { act } from "react";
import { mockFullCartState } from "@/services/__mocks___/cartState";

const mockDispatch = jest.fn();

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<CartProductCard cartProductData={cartProductMock}/>, { cartState: mockFullCartState, dispatch: mockDispatch })
  );
  return component;
};

describe("Card product cart component", () => {
  it("should render card product cart", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });
})