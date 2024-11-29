import { render, screen } from "@testing-library/react";
import SelectOption from "../SelectOption";

describe("SelectOption component", () => {
  it("renders correctly with given props", () => {
    render(<SelectOption value="option1" text="Option 1" />);
    const optionElement = screen.getByRole("option", { name: "Option 1" });

    expect(optionElement).toBeInTheDocument();
  });

  it("renders as disabled when specified", () => {
    render(<SelectOption value="option2" text="Option 2" disabled />);
    const optionElement = screen.getByRole("option", { name: "Option 2" });

    expect(optionElement).toBeDisabled();
  });
});