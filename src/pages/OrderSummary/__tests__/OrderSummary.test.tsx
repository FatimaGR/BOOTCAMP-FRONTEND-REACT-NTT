import { customRender } from "@/services/__wrappers__/cart-context";
import OrderSummary from "../OrderSummary";
import { mockEmptyCartState } from "@/services/__mocks___/cartState";
import { screen, RenderResult, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockDispatch = jest.fn();

jest.mock("../../../shared/hooks/useModal/useModal", () => ({
  useModal: jest.fn().mockReturnValue({
    isModalVisible: true,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(
      <MemoryRouter>
        <OrderSummary/> 
      </MemoryRouter>,
    { cartState: mockEmptyCartState, dispatch: mockDispatch })
  );
  return component;
};

describe("Order summary component", () => {
  it("should render Order summary", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should open modal", async () => {
    await renderComponent();

    const modalButton = screen.getByRole("button", {name: "Accept"});
    expect(modalButton).toBeInTheDocument();
  });
})