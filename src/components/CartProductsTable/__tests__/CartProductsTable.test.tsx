import { customRender } from "@/test-utils/__wrappers__/cart-context";
import { act, RenderResult } from "@testing-library/react";
import CartProductsTable from "../CartProductsTable";
import { mockFullCartState } from "@/test-utils/__mocks___/cartState";

const mockDispatch = jest.fn();

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<CartProductsTable/>, { cartState: mockFullCartState, dispatch: mockDispatch })
  );
  return component;
};

describe("Cart products table component", () => {
  it("should render cart products table", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });
});