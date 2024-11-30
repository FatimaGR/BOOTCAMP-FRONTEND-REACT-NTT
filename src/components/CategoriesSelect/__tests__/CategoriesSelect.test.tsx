import { act } from "react";
import CategoriesSelect from "../CategoriesSelect";
import { categoriesProductsMock, categoriesResponseMock } from "@/test-utils/__mocks___/categories";
import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

const mockFilterByCategory = jest.fn();

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(() => render(
    <CategoriesSelect
      categoriesList={categoriesResponseMock}
      productsCategoriesList={categoriesProductsMock}
      filterByCategory={mockFilterByCategory}
    />
  ));
  return component;
};

describe("Categories select component", () => {
  it("should render categories select", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should call filterByCategory when select option change", async () => {
    await renderComponent();

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "fragrances" } });

    expect(mockFilterByCategory).toHaveBeenCalledTimes(1);
    expect(selectElement).toHaveValue("fragrances");
  });
});
