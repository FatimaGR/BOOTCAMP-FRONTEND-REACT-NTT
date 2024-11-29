import { fireEvent, render, screen } from "@testing-library/react"
import Button from "../Button"

describe("Button component", () => {
  it("renders correctly with text", () => {
    render(<Button text="Test button"/>);
    const text = screen.getByText("Test button");
    expect(text).toBeInTheDocument();
  });

  it("renders correctly with icon", () => {
    render(<Button icon="icon-url"/>);
    const icon = screen.getByAltText("button icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders correctly with icon and alt", () => {
    render(<Button icon="icon-url" iconAlt="Test icon"/>);
    const icon = screen.getByAltText("Test icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(<Button><span>Test child</span></Button>);
    const child = screen.getByText("Test child");
    expect(child).toBeInTheDocument();
  });

  it("conrrectly functions when clicked onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}/>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
})