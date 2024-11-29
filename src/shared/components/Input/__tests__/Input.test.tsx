import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../Input";

describe("Input component", () => {
  it("renders correctly with label", () => {
    render(<Input label="Test input" id="test-input" firstContainerClassName="test-input"/>);
    const label = screen.getByLabelText("Test input");
    expect(label).toBeInTheDocument();
  });

  it("renders correctly with icon", () => {
    render(<Input icon="icon-url" firstContainerClassName="test-input"/>);
    const icon = screen.getByAltText("input icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders correctly with icon and alt", () => {
    render(<Input icon="icon-url" iconAlt="Test icon" firstContainerClassName="test-input"/>);
    const icon = screen.getByAltText("Test icon");
    expect(icon).toBeInTheDocument();
  });

  it("conrrectly functions when clicked onChange event", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} firstContainerClassName="test-input"/>);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with error class when error prop is provided", () => {
    render(<Input error="Test error" firstContainerClassName="test-input"/>);
    const container = screen.getByText("Test error").closest("div");
    expect(container).toHaveClass("error-test-input");
  });

  it("renders error message when error prop is provided", () => {
    render(<Input error="Test error" firstContainerClassName="test-input"/>);
    const errorMessage = screen.getByText("Test error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders with confirmed class when confirmed prop is provided", () => {
    render(<Input confirmed={true} firstContainerClassName="test-input"/>);
    const container = screen.getByRole("textbox").closest("div");
    expect(container).toHaveClass("confirmed-test-input");
  });

  it("renders correctly with label and icon", () => {
    render(
      <Input
        label="Test input"
        id="test-input"
        icon="icon-url"
        iconAlt="Test icon"
        firstContainerClassName="test-input"
      />
    );
    const label = screen.getByLabelText("Test input");
    const icon = screen.getByAltText("Test icon");
  
    expect(label).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
})