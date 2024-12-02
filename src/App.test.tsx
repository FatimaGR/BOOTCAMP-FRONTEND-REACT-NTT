import { RenderResult } from "@testing-library/react";
import { AppRoutes } from "./enums/routes";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { mockEmptyCartState } from "./test-utils/__mocks___/cartState";
import { customContextsRender } from "./test-utils/__wrappers__/contexts";
import { userEmptyMock } from "./test-utils/__mocks___/login";

const mockCartDispatch = jest.fn();
const mockUserDispatch = jest.fn();

const renderComponent = async (initialEntries = [AppRoutes.Home]): Promise<RenderResult> => {
  const component = await act(async () =>
    customContextsRender(
      <MemoryRouter initialEntries={initialEntries}>
        <App/>
      </MemoryRouter>,
      { 
        user: userEmptyMock,
        userDispatch: mockUserDispatch,
        cartState: mockEmptyCartState, 
        cartDispatch: mockCartDispatch 
      }
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