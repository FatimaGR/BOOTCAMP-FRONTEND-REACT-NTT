import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { act } from "react";
import SearchInput from "../Search";

const mockFilterBySearch = jest.fn();

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(() => render(
    <SearchInput filterBySearch={mockFilterBySearch}/>
  ));
  return component;
};

describe("Search input component", () => {
  it("should render search input", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should call filterBySearch when input value change", async () => {
    await renderComponent();

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "value" } });
    expect(mockFilterBySearch).toHaveBeenCalled();
  });
});
