import { render, screen } from "@testing-library/react";
import { TestComponent } from "..";

describe("TestComponent", () => {
    it("should render", () => {
        render(<TestComponent>TestComponent content</TestComponent>);
        // expect(screen.getByText("TestComponent")).toBeInTheDocument();
        expect(screen.getByText("TestComponent content")).toBeDefined();
    });
});
