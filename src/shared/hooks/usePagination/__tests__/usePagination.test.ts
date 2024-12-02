import { act, renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";
import { productsResponseMock } from "@/test-utils/__mocks___/products";

describe("usePagination", () => {
  it("should change to next page", () => {
    const { result } = renderHook(() => usePagination(productsResponseMock, 2));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should change to previous page", () => {
    const { result } = renderHook(() => usePagination(productsResponseMock, 2));

    act(() => {
      result.current.nextPage();
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });
});