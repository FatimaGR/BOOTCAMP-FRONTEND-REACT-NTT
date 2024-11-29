import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

const mockLocalStorage = (store: Record<string, string> = {}): void => {
  let localStore = { ...store };
  
  const fn = {
    getItem: jest.fn((key: string) => localStore[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      localStore[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete localStore[key];
    }),
    clear: jest.fn(() => {
      localStore = {}
    }),
    key: jest.fn((index: number) => Object.keys(localStore)[index] || null),
    get length() {
      return Object.keys(localStore).length;
    }
  }
  global.localStorage = fn;
}

describe("useLocalStorage", () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = { ...global.localStorage };
    mockLocalStorage();
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  })

  it("return initial value when localStorage is empty", () => {
    const { result } = renderHook(() => 
      useLocalStorage("testKey", "initialValue")
    );
  
    expect(result.current.storedValue).toBe("initialValue");
  });

  it("stores a value in localStorage", async () => {
    const { result } = renderHook(() => 
      useLocalStorage("testKey", "initialValue")
    );
  
    act(() => {
      result.current.setStoredValue("newValue");
    });

    await waitFor(() => {
      expect(result.current.storedValue).toBe("newValue");
    });

    expect(global.localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
  });
});