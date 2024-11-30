import { customRender } from "@/test-utils/__wrappers__/cart-context";
import { fireEvent, RenderResult, screen } from "@testing-library/react";
import { mockEmptyCartState, mockFullCartState } from "@/test-utils/__mocks___/cartState";
import ShippingForm from "../ShippingForm";
import { act } from "react";

const mockDispatch = jest.fn();
const mockOpenModal = jest.fn();

jest.mock("../../../shared/hooks/useJson/useJson", () => ({
  useJson: () => ({
    data: { districts: ['District 1', 'District 2', 'District 3'] },
  })
}));

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(async () => customRender(
    <ShippingForm openModal={mockOpenModal}/>, 
    { cartState: mockFullCartState, dispatch: mockDispatch }
  ));
  return component;
};

describe("Shipping form component", () => {
  it("should render shipping form", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  it("should show error message if value is empty", async () => {
    await renderComponent();

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    const errorMessages = screen.getAllByText("This value is required");
    errorMessages.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should show an error if first name is empty", async () => {
    await renderComponent();
    
    const firstName = screen.getByLabelText("First name");
    fireEvent.change(firstName, { target: { value: " " } });

    const errorMessages = screen.getByText("This value is required");
    expect(errorMessages).toBeInTheDocument();
  });

  it("should show an error if first name not contains only letters", async () => {
    await renderComponent();
    
    const firstName = screen.getByLabelText("First name");
    fireEvent.change(firstName, { target: { value: "John123" } });

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    const errorMessages = screen.getByText("Enter a value only with letters");
    expect(errorMessages).toBeInTheDocument();
  });

  it("should show an error if phone number not contains only numbers", async () => {
    await renderComponent();
    
    const phoneNumber = screen.getByLabelText("Phone number");
    fireEvent.change(phoneNumber, { target: { value: "123ABC" } });

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    const errorMessages = screen.getByText("Enter a value only with numbers");
    expect(errorMessages).toBeInTheDocument();
  });

  it("shoul show form error message if cart is empty", async () => {
    await act(() => 
      customRender(<ShippingForm openModal={mockOpenModal}/>, { cartState: mockEmptyCartState, dispatch: mockDispatch })
    );

    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("District"), { target: { value: "District 2" } });
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "Street 123" } });
    fireEvent.change(screen.getByLabelText("Reference"), { target: { value: "Reference" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "123456789" } });

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    const formErrorMessage = screen.getByText("To complete the order, you need buy products.");
    expect(formErrorMessage).toBeInTheDocument();
  });

  it("shoul show modal when form is completed and cart is not empty", async () => {
    await renderComponent();

    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("District"), { target: { value: "District 2" } });
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "Street 123" } });
    fireEvent.change(screen.getByLabelText("Reference"), { target: { value: "Reference" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "123456789" } });

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    expect(mockOpenModal).toHaveBeenCalled();
  });
})