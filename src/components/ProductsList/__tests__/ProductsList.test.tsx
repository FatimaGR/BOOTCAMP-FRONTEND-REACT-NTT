import { screen } from "@testing-library/react"; 
import ProductsList from "../ProductsList";
import { productsResponseMock } from "@/services/__mocks___/products";
import { act } from "react";
import { customRender } from "@/services/__wrappers__/cart-context";
import { mockEmptyCartState } from "@/services/__mocks___/cartState";
import { Product } from "@/domain/interfaces";

const mockDispatch = jest.fn();
const emptyProductsResponseMock: Product[] = [];

describe("Products list component", () => {
  it("should render Products list", async () => {
    const component = await act(async () => customRender(
      <ProductsList initialProductsData={productsResponseMock} isLoading={false}/>, 
      { cartState: mockEmptyCartState, dispatch: mockDispatch }
    ));

    expect(component).toBeDefined();
  });

  it("should show Loading message", async () => {
    await act(async () => customRender(
      <ProductsList initialProductsData={productsResponseMock} isLoading={true}/>,
      { cartState: mockEmptyCartState, dispatch: mockDispatch }
    ));

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeDefined();
  });

  it("should show No products message", async () => {
    await act(async () => customRender(
      <ProductsList initialProductsData={emptyProductsResponseMock} isLoading={false}/>,
      { cartState: mockEmptyCartState, dispatch: mockDispatch }
    ));

    const noProductsMessage = screen.getByText("No products were found");
    expect(noProductsMessage).toBeDefined();
  });
});
