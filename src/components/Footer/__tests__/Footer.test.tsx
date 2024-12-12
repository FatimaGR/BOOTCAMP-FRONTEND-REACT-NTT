import { render, RenderResult } from "@testing-library/react";
import Footer from "../Footer";
import { act } from "react";

const renderComponent = async():Promise<RenderResult> => {
  const component = await act(() => render(<Footer/>));
  return component;
};

describe("Footer component", () => {
  it("should render footer", async () => {
    const component = await renderComponent();
    // snap o tobeinthedocument
    expect(component).toBeDefined();
  })
});
