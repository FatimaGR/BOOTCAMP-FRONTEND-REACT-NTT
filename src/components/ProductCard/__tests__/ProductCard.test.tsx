import { mockEmptyCartState } from "@/services/__mocks___/cartState";
import { customRender } from "@/services/__wrappers__/cart-context";
import { fireEvent, RenderResult, screen } from "@testing-library/react";
import { productResponseMock } from "@/services/__mocks___/product";
import ProductCard from "../ProductCard";
import { addToCart } from "../../../context/cart-utils.ts";
import { act } from "react";

const mockDispatch = jest.fn();

jest.mock("../../../context/cart-utils.ts", () => ({
  addToCart: jest.fn(),
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<ProductCard productData={productResponseMock}/>, { cartState: mockEmptyCartState, dispatch: mockDispatch })
  );
  return component;
}

describe("Product card component", () => {
  it("should render Product card", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });
  
  it("should call addToCart when buy button is clicked", async () => {
    await renderComponent();
    
    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);
    expect(addToCart).toHaveBeenCalledTimes(1);
  });
});