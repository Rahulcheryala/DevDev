import IndexRoute from "../../routes/_index";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";

// Mocking Remix functions
jest.mock("@remix-run/node", () => ({
  redirect: jest.fn(), // Mock redirect
}));

// Mocking session server
jest.mock("~/services/session.server", () => ({
  requireAuthSession: jest.fn(),
}));

// Mocking path utility
jest.mock("~/utils/path", () => ({
  path: {
    to: {
      authenticatedRoot: "/dashboard",
    },
  },
}));

// TEST 1: IndexRoute Component
describe("IndexRoute component", () => {
  it("should render the fallback text", () => {
    // Render the IndexRoute component
    render(<IndexRoute />);

    // Ensure the paragraph with the text is in the document
    expect(
      screen.getByText(
        /Oops. You shouldn't see this page. Eventually it will be a landing page./i,
      ),
    ).toBeInTheDocument();
  });
});
