import { mockFullCartState } from "@/test-utils/__mocks___/cartState.ts";
import { customRender } from "@/test-utils/__wrappers__/cart-context.tsx";
import { fireEvent, RenderResult, screen } from "@testing-library/react";
import { resetCart } from "../../../context/cart-utils.ts";
import { act } from "react";
import Modal from "../Modal";
import { AppRoutes } from "@/enums/routes";

const mockDispatch = jest.fn();
const mockCloseModal = jest.fn();
const navigateMock = jest.fn();

jest.mock("../../../context/cart-utils.ts", () => ({
  resetCart: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => customRender(
    <Modal closeModal={mockCloseModal}/>, 
    { cartState: mockFullCartState, dispatch: mockDispatch }
  ));
  return component;
};

describe("Modal component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render modal", async () => {
    // igual aqui es mejor snaps o tobeinthedocument recordemos que estos son elementos visuales no funciones internas
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should correctly function accept button", async () => {
    await renderComponent();

    const acceptButton = screen.getByRole("button");
    fireEvent.click(acceptButton);

    expect(resetCart).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith(AppRoutes.Home);
  })
})