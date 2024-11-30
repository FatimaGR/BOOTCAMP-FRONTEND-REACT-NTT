import { fireEvent, RenderResult, screen, act } from "@testing-library/react";
import { customRender } from "@/services/__wrappers__/cart-context";
import { mockEmptyCartState } from "@/services/__mocks___/cartState";
import { AppRoutes } from "@/enums/routes";
import Navbar from "../Navbar";

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

const mockDispatch = jest.fn();

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<Navbar/>, { cartState: mockEmptyCartState, dispatch: mockDispatch })
  );
  return component;
};

describe("Navbar component", () => {
  it("should render Navbar", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should toggle menu", async () => {
    await renderComponent();

    const menuButton = screen.getByAltText("Menu icon");
    fireEvent.click(menuButton);
    expect(screen.getByAltText("Go to shopping cart")).toBeVisible();
  });

  it("should navigate to order summary page", async () => {
    await renderComponent();

    const cartButton = screen.getByAltText("Go to shopping cart");
    fireEvent.click(cartButton);
    expect(navigateMock).toHaveBeenCalledWith(AppRoutes.OrderSummary);
  });
})