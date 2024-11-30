import { fireEvent, RenderResult, screen } from "@testing-library/react";
import { mockFullCartState } from "@/services/__mocks___/cartState.ts";
import { cartProductMock } from "@/services/__mocks___/cartProduct.ts";
import { customRender } from "@/services/__wrappers__/cart-context.tsx";
import { deleteFromCart, updateQuantity } from "../../../context/cart-utils.ts";
import TableRow from "../TableRow.tsx";
import { act } from "react";

const mockDispatch = jest.fn();

jest.mock("../../../context/cart-utils.ts", () => ({
  deleteFromCart: jest.fn(),
  updateQuantity: jest.fn(),
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<TableRow cartProduct={cartProductMock}/>, { cartState: mockFullCartState, dispatch: mockDispatch })
  );
  return component;
};

describe("Table row component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render table row", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });
  
  it("should call updateQuantity when decrease button is clicked", async () => {
    await renderComponent();
    
    const decreaseButton = screen.getByLabelText("Decrease quantity of this product in the cart");
    fireEvent.click(decreaseButton);
    expect(updateQuantity).toHaveBeenCalledTimes(1);
  });

  it("should call updateQuantity when increase button is clicked", async () => {
    await renderComponent();
    
    const increaseButton = screen.getByLabelText("Increase quantity of this product in the cart");
    fireEvent.click(increaseButton);
    expect(updateQuantity).toHaveBeenCalledTimes(1);
  });

  it("should call deleteFromCart when buy button is clicked", async () => {
    await renderComponent();
    
    const removeButton = screen.getByLabelText("Remove this product from the cart");
    fireEvent.click(removeButton);
    expect(deleteFromCart).toHaveBeenCalledTimes(1);
  });
});