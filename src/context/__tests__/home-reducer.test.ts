import { HomeActions } from "@/domain/home-actions"
import { productsResponseMock } from "@/services/__mocks___/products"
import { homeReducer, initialHomeState } from "../home-reducer"
import { categoriesProductsMock, categoriesResponseMock } from "@/services/__mocks___/categories";

describe("Home reducer", () => { 
  it("should set products data", () => {
    const action = {
      type: HomeActions.SetProductsData,
      payload: productsResponseMock,
    };

    const newState = homeReducer(initialHomeState, action);
    expect(newState.productsData).toEqual(productsResponseMock);
  });

  it("should set initial products", () => {
    const action = {
      type: HomeActions.SetInitialProducts,
      payload: productsResponseMock,
    };

    const newState = homeReducer(initialHomeState, action);
    expect(newState.initialProducts).toEqual(productsResponseMock);
  });

  it("should set filtered products", () => {
    const action = {
      type: HomeActions.SetFilteredProducts,
      payload: productsResponseMock,
    };

    const newState = homeReducer(initialHomeState, action);
    expect(newState.filteredProducts).toEqual(productsResponseMock);
  });

  it("should set categories", () => {
    const action = {
      type: HomeActions.SetCategories,
      payload: categoriesResponseMock,
    };

    const newState = homeReducer(initialHomeState, action);
    expect(newState.categoriesList).toEqual(categoriesResponseMock);
  });

  it("should set products categories", () => {
    const action = {
      type: HomeActions.SetProductsCategories,
      payload: categoriesProductsMock,
    };

    const newState = homeReducer(initialHomeState, action);
    expect(newState.productsCategories).toEqual(categoriesProductsMock);
  });

  it("should return the current state for an invalid action", () => {
    const action = { type: "INVALID_ACTION" };
    const newState = homeReducer(initialHomeState, action);
    expect(newState).toEqual(initialHomeState);
  });
})