import { renderHook, waitFor } from "@testing-library/react";
import { useJson } from "../useJson";
import { districtsResponseMock } from "@/test-utils/__mocks___/districts";

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

describe("useJson request", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("should get districts", async () => {
    const url = "/data/districts.json";
    mockFetch(districtsResponseMock);
    const { result } = renderHook(() => useJson(url));
    
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toEqual(districtsResponseMock);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle fetch errors", async () => {
    const url = "/data/districts.json";
    mockFetch({}, 500, false);
    const { result } = renderHook(() => useJson(url));
    
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
