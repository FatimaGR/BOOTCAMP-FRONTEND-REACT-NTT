import { customUserRender } from "@/test-utils/__wrappers__/user-context";
import { act, fireEvent, RenderResult, screen } from "@testing-library/react";
import ResetModal from "../ResetModal";
import { userEmptyMock } from "@/test-utils/__mocks___/login";

const mockDispatch = jest.fn();
const mockCloseModal = jest.fn();
const navigateMock = jest.fn();
const fireMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

jest.mock("sweetalert2-react-content", () => ({
  ...jest.requireActual("sweetalert2-react-content"),
  default: jest.fn(() => ({
    fire: fireMock,
  }))
}))

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => customUserRender(
    <ResetModal closeModal={mockCloseModal}/>, 
    { user: userEmptyMock, dispatch: mockDispatch }
  ));
  return component;
};

describe("Reset modal component", () =>{
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render reset modal", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should show an error if email is incorrect", async () => {
    await renderComponent();
    
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "testgmail.com" } });

    const errorMessage = screen.getByText("Enter a valid email");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show an error if send button is clicked and email is empty", async () => {
    await renderComponent();

    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: " " } });
    
    const sendButton = screen.getByRole("button", {name: "Send"});
    fireEvent.click(sendButton);

    const errorMessage = screen.getByText("This value is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should delete error if email is valid", async () => {
    await renderComponent();

    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@gmail.com" } });

    const sendButton = screen.getByRole("button", {name: "Send"});
    fireEvent.click(sendButton);

    expect(mockCloseModal).toHaveBeenCalled();
    expect(fireMock).toHaveBeenCalled();
  });
});
