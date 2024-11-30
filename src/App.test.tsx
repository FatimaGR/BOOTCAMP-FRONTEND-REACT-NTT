import { RenderResult } from "@testing-library/react";
import { AppRoutes } from "./enums/routes";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { customRender } from "./services/__wrappers__/cart-context";
import { mockEmptyCartState } from "./services/__mocks___/cartState";

const mockDispatch = jest.fn();

const renderComponent = async (initialEntries = [AppRoutes.Home]): Promise<RenderResult> => {
  const component =await act(async () =>
    customRender(
      <MemoryRouter initialEntries={initialEntries}>
        <App/>
      </MemoryRouter>,
      { cartState: mockEmptyCartState, dispatch: mockDispatch }
    )
  );

  return component;
};

describe("Home component", () => { 
  it("should render Home", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });
})