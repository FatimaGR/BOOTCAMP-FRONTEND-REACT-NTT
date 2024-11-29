import { render, screen, fireEvent } from "@testing-library/react";
import Select from "../Select";

describe("Select component", () => {
  const options = [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2", disabled: true },
    { value: "option3", text: "Option 3" },
  ];

  it("renders correctly with options and default value", () => {
    render(
      <Select
        options={options}
        defaultValue=""
        defaultValueText="Select an option"
        label="Test select"
        id="test-select"
      />
    );

    const labelElement = screen.getByLabelText("Test select");
    expect(labelElement).toBeInTheDocument();

    const defaultOption = screen.getByRole("option", {
      name: "Select an option",
    });
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toBeEnabled();

    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(4);
  });

  it("renders an error message when error prop is provided", () => {
    render(<Select options={options} error="This field is required" />);

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("triggers onChange when a different option is selected", () => {
    const handleChange = jest.fn();
    render(
      <Select
        options={options}
        onChange={handleChange}
        defaultValue=""
        defaultValueText="Select an option"
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "option1" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(selectElement).toHaveValue("option1");
  });

  it("disables the select element when disabled prop is provided", () => {
    render(<Select options={options} defaultValue="" disabled={true}/>);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeDisabled();
  });

  it("applies the appropriate class name based on error or confirmed props", () => {
    render(
      <Select 
        options={options} 
        error="Test error" 
        containerClassName="test-select"
      />
    );

    const container = screen.getByText("Test error").closest("div");
    expect(container).toHaveClass("error-test-select");
  });

  it("renders with confirmed class when confirmed prop is provided", () => {
    render(
      <Select 
        options={options} 
        confirmed={true} 
        containerClassName="test-select"
      />);

    const container = screen.getByRole("combobox").closest("div");
    expect(container).toHaveClass("confirmed-test-select");
  });
});