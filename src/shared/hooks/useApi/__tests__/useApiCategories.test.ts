import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "../useApi";
import { categoriesResponseMock } from "@/services/__mocks___/categories";

const mockFetch = (data: any, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      blob: () => Promise.resolve(data),
      clone: () => ({ ...response }),
      Text: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

describe("useApi categories request", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("should get categories", async () => {
    const url = "https://dummyjson.com/products/categories";
    mockFetch(categoriesResponseMock);
    const { result } = renderHook(() => useApi(url));

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toEqual(categoriesResponseMock);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  })

  it("should handle fetch errors", async () => {
    const url = "https://dummyjson.com/products/categories";
    mockFetch({}, 500, false);
    const { result } = renderHook(() => useApi(url));
    
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Network response was not ok");
    });
  });
});
