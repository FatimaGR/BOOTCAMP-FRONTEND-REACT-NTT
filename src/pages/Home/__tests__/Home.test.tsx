import { mockEmptyCartState } from "@/test-utils/__mocks___/cartState";
import * as React from "react";
import Home from "../Home";
import { fireEvent, RenderResult, screen, act } from "@testing-library/react";
import { HomeActions } from "@/domain/home-actions";
import { productsFiltered, productsResponseMock } from "@/test-utils/__mocks___/products";
import { categoriesProductsMock, categoriesResponseMock } from "@/test-utils/__mocks___/categories";
import { productResponseMock } from "@/test-utils/__mocks___/product";
import { customContextsRender } from "@/test-utils/__wrappers__/contexts";
import { loginResponseMock } from "@/test-utils/__mocks___/login";
import { MemoryRouter } from "react-router-dom";

const mockCartDispatch = jest.fn();
const mockUserDispatch = jest.fn();

jest.spyOn(React, "useReducer").mockReturnValue([
  {
    initialProducts: productsResponseMock,
    productsData: productsResponseMock,
    filteredProducts: productsResponseMock,
    categoriesList: categoriesResponseMock,
    productsCategories: categoriesProductsMock,
  },
  mockCartDispatch,
]);

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customContextsRender(
      <MemoryRouter>
        <Home/>
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

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Home", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should dispatch filterByCategory when a category default is selected", async () => {
    await renderComponent();
    
    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "beauty" } });
    fireEvent.change(categorySelect, { target: { value: "all-categories" } });
    
    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: productsResponseMock,
    });
    
    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetFilteredProducts,
      payload: productsResponseMock,
    });
  });

  it("should dispatch filterByCategory when a category is selected", async () => {
    await renderComponent();
    
    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "beauty" } });
    
    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: productsFiltered,
    });
    
    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetFilteredProducts,
      payload: productsFiltered,
    });
  });

  it("should dispatch filterBySearch", async () => {
    await renderComponent();
    
    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Essence" } });
    
    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: [productResponseMock],
    });
  });
})