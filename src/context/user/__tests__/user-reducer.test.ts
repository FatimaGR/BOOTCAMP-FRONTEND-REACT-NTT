import { UserActions } from "@/domain/user-store";
import { loginResponseMock } from "@/test-utils/__mocks___/login";
import { initialUser, userReducer } from "../user-reducer";

describe("User reducer", () => { 
  it("should login", () => {
    const action = { 
      type: UserActions.Login,
      payload: loginResponseMock,
    };

    const newUser = userReducer(initialUser, action);
    expect(newUser).toEqual(loginResponseMock);
  });

  it("should log out", () => {
    const action = { type: UserActions.Logout };

    const newUser = userReducer(loginResponseMock, action);
    expect(newUser).toEqual(initialUser);
  });

  it("should return the current state for an invalid action", () => {
    const action = { type: "INVALID_ACTION" };
    const newUser = userReducer(initialUser, action);
    expect(newUser).toEqual(initialUser);
  });
});