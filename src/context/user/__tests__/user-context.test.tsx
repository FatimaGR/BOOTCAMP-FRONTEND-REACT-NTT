import { renderHook } from "@testing-library/react";
import { UserProvider, useUser, useUserDispatch } from "../user-context";
import { initialUser } from "../user-reducer";

describe("User context", () => {
  it("should initilize correct user", () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: UserProvider,
    });
    expect(result.current).toEqual(initialUser);
  });

  it("should throw an error if useUser is used outside of UserProvider", () => {
    const renderComponent = () => { 
      renderHook(() => useUser());
    };
    expect(renderComponent).toThrow("useUser must be in UserContext");
  });

  it("should throw an error if useUserDispatch is used outside of UserProvider", () => {
    const renderComponent = () => { 
      renderHook(() => useUserDispatch());
    };
    expect(renderComponent).toThrow("useUser must be in UserDispatchContext");
  });
});