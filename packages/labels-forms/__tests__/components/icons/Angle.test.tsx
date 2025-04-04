import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Angle } from "../../../src/Editor/components/icons/Angle"; // Adjust the path to where the component is located

describe("Angle Component", () => {
  it("should render the Angle component correctly", () => {
    const { container } = render(<Angle />);

    // Check if the SVG element is rendered
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("should apply the className prop to the SVG element", () => {
    const testClassName = "test-class";
    const { container } = render(<Angle className={testClassName} />);

    // Check if the className is applied to the SVG element
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveClass(testClassName);
  });

  it("should have the correct default attributes for the SVG element", () => {
    const { container } = render(<Angle />);

    // Check if the SVG element has the correct width, height, and viewBox attributes
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "16");
    expect(svgElement).toHaveAttribute("height", "16");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 16 16");
  });
});
