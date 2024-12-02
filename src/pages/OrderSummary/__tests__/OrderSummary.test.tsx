import OrderSummary from "../OrderSummary";
import { mockEmptyCartState } from "@/test-utils/__mocks___/cartState";
import { screen, RenderResult, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { customContextsRender } from "@/test-utils/__wrappers__/contexts";
import { loginResponseMock } from "@/test-utils/__mocks___/login";

const mockCartDispatch = jest.fn();
const mockUserDispatch = jest.fn();

jest.mock("../../../shared/hooks/useModal/useModal", () => ({
  useModal: jest.fn().mockReturnValue({
    isModalVisible: true,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customContextsRender(
      <MemoryRouter>
        <OrderSummary/> 
      </MemoryRouter>,
      { 
        user: loginResponseMock,
        userDispatch: mockUserDispatch,
        cartState: mockEmptyCartState, 
        cartDispatch: mockCartDispatch 
      }
    )
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