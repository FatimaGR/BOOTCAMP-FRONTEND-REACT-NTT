import Home from "@/pages/Home/Home";
import withAuth from "../withAuth";
import * as React from "react";
import { loginResponseMock } from "@/test-utils/__mocks___/login";

const navigateMock = jest.fn();
const mockUserDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

describe("withAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Navbar", async () => {
    jest.spyOn(React, "useReducer").mockReturnValue([ loginResponseMock, mockUserDispatch ]);
    const component = withAuth(Home);

    expect(component).toBeDefined();
  });
})