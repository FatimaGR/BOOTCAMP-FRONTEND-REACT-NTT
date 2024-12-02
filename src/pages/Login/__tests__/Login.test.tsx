import { act, fireEvent, RenderResult, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { customUserRender } from "@/test-utils/__wrappers__/user-context";
import { loginResponseMock } from "@/test-utils/__mocks___/login";
import { useApi } from "../../../shared/hooks/useApi/useApi";
import { AppRoutes } from "@/enums/routes";

const mockDispatch = jest.fn();
const navigateMock = jest.fn();
const fireMock = jest.fn();

jest.mock("../../../shared/hooks/useApi/useApi");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

jest.mock("../../../shared/hooks/useModal/useModal", () => ({
  useModal: jest.fn().mockReturnValue({
    isModalVisible: true,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

jest.mock("sweetalert2-react-content", () => ({
  ...jest.requireActual("sweetalert2-react-content"),
  default: jest.fn(() => ({
    fire: fireMock,
  }))
}))

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => 
    customUserRender(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>,
      {  user: loginResponseMock, dispatch: mockDispatch }
    )
  );
  return component;
};

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require("../../../shared/hooks/useApi/useApi").useApi.mockImplementation(() => ({
      data: { user: "test" },
      isLoading: false,
      error: null,
    }));
  });

  it("should render Login", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should show an error if username is empty", async () => {
    await renderComponent();
    
    const username = screen.getByLabelText("Username");
    fireEvent.change(username, { target: { value: " " } });

    const errorMessage = screen.getByText("This value is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should submit if username and password are valid", async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: loginResponseMock,
      isLoading: false,
      error: null,
    });

    await renderComponent();

    const username = screen.getByLabelText("Username");
    fireEvent.change(username, { target: { value: "emilys" } });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "emilyspass" } });

    const loginButton = screen.getByRole("button", {name: "Log in"});
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(AppRoutes.Home);
    });
  });

  // it("should show error message", async () => {
  //   (useApi as jest.Mock).mockReturnValue({
  //     data: null,
  //     isLoading: false,
  //     error: new Error("Network response was not ok"),
  //   });

  //   await renderComponent();

  //   const username = screen.getByLabelText("Username");
  //   fireEvent.change(username, { target: { value: "emilys" } });
  //   const password = screen.getByLabelText("Password");
  //   fireEvent.change(password, { target: { value: "emilyspass2" } });

  //   const loginButton = screen.getByRole("button", {name: "Log in"});
  //   fireEvent.click(loginButton);

  //   const errorMessage = screen.getByText("Incorrect username or password");
  //   expect(errorMessage).toBeInTheDocument();
  // });

  it("should show loading message if isLoading is true", async () =>{
    (useApi as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    await renderComponent();

    const loadingMessage = screen.getByText("Loading");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should open modal", async () => {
    await renderComponent();

    const resetPasswordButton = screen.getByText("Forgot your password?");
    fireEvent.click(resetPasswordButton);

    const modalButton = screen.getByText("Forgot your password?");
    expect(modalButton).toBeInTheDocument();
  });
})