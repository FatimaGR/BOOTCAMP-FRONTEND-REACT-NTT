import { mockEmptyCartState } from "@/services/__mocks___/cartState";
import { customRender } from "@/services/__wrappers__/cart-context";
import * as React from "react";
import Home from "../Home";
import { fireEvent, RenderResult, screen, act } from "@testing-library/react";
import { HomeActions } from "@/domain/home-actions";
import { productsFiltered, productsResponseMock } from "@/services/__mocks___/products";
import { categoriesProductsMock, categoriesResponseMock } from "@/services/__mocks___/categories";
import { productResponseMock } from "@/services/__mocks___/product";

const mockDispatch = jest.fn();

jest.spyOn(React, "useReducer").mockReturnValue([
  {
    initialProducts: productsResponseMock,
    productsData: productsResponseMock,
    filteredProducts: productsResponseMock,
    categoriesList: categoriesResponseMock,
    productsCategories: categoriesProductsMock,
  },
  mockDispatch,
]);

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customRender(<Home/>, { cartState: mockEmptyCartState, dispatch: mockDispatch })
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
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: productsResponseMock,
    });
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetFilteredProducts,
      payload: productsResponseMock,
    });
  });

  it("should dispatch filterByCategory when a category is selected", async () => {
    await renderComponent();
    
    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "beauty" } });
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: productsFiltered,
    });
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetFilteredProducts,
      payload: productsFiltered,
    });
  });

  it("should dispatch filterBySearch", async () => {
    await renderComponent();
    
    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Essence" } });
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: HomeActions.SetProductsData,
      payload: [productResponseMock],
    });
  });
})