import { fireEvent, RenderResult, screen, act } from "@testing-library/react";
import { mockEmptyCartState } from "@/test-utils/__mocks___/cartState";
import { AppRoutes } from "@/enums/routes";
import Navbar from "../Navbar";
import * as React from "react";
import { customContextsRender } from "@/test-utils/__wrappers__/contexts";
import { loginResponseMock } from "@/test-utils/__mocks___/login";
import { UserActions } from "@/domain/user-store";

const navigateMock = jest.fn();

const mockCartDispatch = jest.fn();
const mockUserDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

jest.spyOn(React, "useReducer").mockReturnValue([ loginResponseMock, mockUserDispatch ]);

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customContextsRender(
      <Navbar/>, 
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

describe("Navbar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("should log out", async () => {
    await renderComponent();

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    expect(mockUserDispatch).toHaveBeenCalledWith({
      type: UserActions.Logout,
    });
    expect(navigateMock).toHaveBeenCalledWith(AppRoutes.Login);
  });
})