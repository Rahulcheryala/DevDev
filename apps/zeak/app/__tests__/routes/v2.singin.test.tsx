// // login.test.tsx
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import { createRemixStub } from "@remix-run/testing";
// import userEvent from "@testing-library/user-event";
// // import LoginV2Route, { loader, action } from "./login";
// import { getAuthSession, getSession, commitAuthSession, commitAnySession } from "~/services/session.server";
// import { signInWithEmail, verifyAuthSession } from "~/services/auth/auth.server";
// import { getUser } from "~/modules/users/users.server";
// import * as validator from "@zeak/remix-validated-form";
// import { path } from "~/utils/path";
// import axios from "axios";
// import LoginV2Route, { loader, action } from "~/routes/_public+/v2.login";

// // Mock all external dependencies
// jest.mock("~/services/session.server");
// jest.mock("~/services/auth/auth.server");
// jest.mock("~/modules/users/users.server");
// jest.mock("axios");
// jest.mock("~/lib/supabase");



// describe("Login Loader", () => {
//   // Helper function to create test requests with different scenarios
//   const createLoaderRequest = (options = {}) => {
//     const url = new URL("http://test.com/v2/login");
//     Object.entries(options).forEach(([key, value]) => {
//       url.searchParams.set(key, value);
//     });
//     return new Request(url.toString());
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("Authentication State Handling", () => {
//     it("returns null when no authentication session exists", async () => {
//       // Set up mock to simulate no existing session
//       (getAuthSession as jest.Mock).mockResolvedValue(null);

//       const result = await loader({ request: createLoaderRequest() } as any);
//       expect(result).toBeNull();
//     });

//     it("redirects to MFA when user has 2FA enabled", async () => {
//       // Set up mocks for authenticated user with 2FA enabled
//       const mockAuthSession = { userId: "test-user-123" };
//       (getAuthSession as jest.Mock).mockResolvedValue(mockAuthSession);
//       (verifyAuthSession as jest.Mock).mockResolvedValue(true);
//       (getUser as jest.Mock).mockResolvedValue({
//         data: { "2FAEnabled": true }
//       });

//       try {
//         await loader({ request: createLoaderRequest() } as any);
//       } catch (response: any) {
//         expect(response.status).toBe(302);
//         expect(response.headers.get("Location")).toBe(path.to.mfa);
//       }
//     });

//     it("shows 2FA setup modal for first-time login", async () => {
//       // Set up mocks for authenticated user without 2FA choice
//       const mockAuthSession = { userId: "test-user-123" };
//       (getAuthSession as jest.Mock).mockResolvedValue(mockAuthSession);
//       (verifyAuthSession as jest.Mock).mockResolvedValue(true);
//       (getUser as jest.Mock).mockResolvedValue({
//         data: { "2FAEnabled": false }
//       });
//       (getSession as jest.Mock).mockResolvedValue({
//         has: () => false,
//         get: () => null
//       });

//       const response = await loader({ request: createLoaderRequest() } as any);
//       const data = await response.json();

//       // Verify the response includes correct modal display flags
//       expect(data).toEqual({
//         authSession: mockAuthSession,
//         is2FAEnabled: false,
//         showModal: true
//       });
//     });

//     it("redirects to custom path when 2FA choice is made", async () => {
//       // Set up mocks for user with existing 2FA choice
//       const mockAuthSession = { userId: "test-user-123" };
//       const customRedirectPath = "/dashboard";

//       (getAuthSession as jest.Mock).mockResolvedValue(mockAuthSession);
//       (verifyAuthSession as jest.Mock).mockResolvedValue(true);
//       (getUser as jest.Mock).mockResolvedValue({
//         data: { "2FAEnabled": false }
//       });
//       (getSession as jest.Mock).mockResolvedValue({
//         has: () => true,
//         get: (key: string) => key === "redirectTo" ? customRedirectPath : null
//       });

//       try {
//         await loader({ request: createLoaderRequest() } as any);
//       } catch (response: any) {
//         expect(response.status).toBe(302);
//         expect(response.headers.get("Location")).toBe(customRedirectPath);
//       }
//     });
//   });

//   describe("Error Handling", () => {
//     it("handles session verification failure gracefully", async () => {
//       (getAuthSession as jest.Mock).mockResolvedValue({ userId: "test-user-123" });
//       (verifyAuthSession as jest.Mock).mockRejectedValue(new Error("Session verification failed"));

//       const result = await loader({ request: createLoaderRequest() } as any);
//       expect(result).toBeNull();
//     });
//   });
// });

// describe("Login Action", () => {
//   const createActionRequest = (formData: Record<string, string>, setup2FA = false) => {
//     const url = setup2FA ?
//       "http://test.com/v2/login?setup2FA=true" :
//       "http://test.com/v2/login";

//     return new Request(url, {
//       method: "POST",
//       body: new URLSearchParams(formData)
//     });
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("2FA Setup Flow", () => {
//     it("handles 2FA enablement choice", async () => {
//       const formData = {
//         setup2FA: "true",
//         redirectTo: path.to.authenticatedRoot
//       };

//       (getAuthSession as jest.Mock).mockResolvedValue({ userId: "test-user-123" });
//       (getSession as jest.Mock).mockResolvedValue({
//         set: jest.fn(),
//         get: jest.fn()
//       });
//       (commitAnySession as jest.Mock).mockResolvedValue("session-cookie");

//       try {
//         await action({
//           request: createActionRequest(formData, true)
//         } as any);
//       } catch (response: any) {
//         expect(response.status).toBe(302);
//         expect(response.headers.get("Location")).toBe(path.to.mfa);
//       }
//     });

//     it("stores 2FA choice in session", async () => {
//       const formData = {
//         setup2FA: "false",
//         redirectTo: path.to.authenticatedRoot
//       };

//       const mockSession = {
//         set: jest.fn(),
//         get: jest.fn()
//       };

//       (getAuthSession as jest.Mock).mockResolvedValue({ userId: "test-user-123" });
//       (getSession as jest.Mock).mockResolvedValue(mockSession);

//       await action({
//         request: createActionRequest(formData, true)
//       } as any);

//       expect(mockSession.set).toHaveBeenCalledWith("2FAChoice", false);
//     });
//   });

//   describe("Login Authentication", () => {
//     const mockLoginData = {
//       email: "test@example.com",
//       password: "password123",
//       deviceInfo: JSON.stringify({ browser: "Chrome" }),
//       locationInfo: JSON.stringify({ country: "US" })
//     };

//     it("successfully authenticates valid credentials", async () => {
//       jest.spyOn(validator, "validator").mockImplementation(() => ({
//         validate: () => Promise.resolve({ data: mockLoginData })
//       }));

//       (signInWithEmail as jest.Mock).mockResolvedValue({
//         userId: "test-user-123",
//         sessionId: "session-123"
//       });

//       (getUser as jest.Mock).mockResolvedValue({
//         data: { "2FAEnabled": false }
//       });

//       const response = await action({
//         request: createActionRequest(mockLoginData)
//       } as any);

//       const data = await response.json();
//       expect(data.success).toBe(true);
//       expect(data.authSession).toBeDefined();
//     });

//     it("handles invalid credentials with appropriate delay", async () => {
//       jest.spyOn(validator, "validator").mockImplementation(() => ({
//         validate: () => Promise.resolve({ data: mockLoginData })
//       }));

//       (signInWithEmail as jest.Mock).mockResolvedValue(null);

//       const startTime = Date.now();
//       const response = await action({
//         request: createActionRequest(mockLoginData)
//       } as any);
//       const endTime = Date.now();

//       expect(response.status).toBe(500);
//       expect(endTime - startTime).toBeGreaterThanOrEqual(2000);
//     });
//   });
// });

// describe("Login Component", () => {
//   const mockAxios = jest.requireMock("axios");

//   beforeEach(() => {
//     jest.clearAllMocks();
//     // Mock location API responses
//     mockAxios.get
//       .mockImplementationOnce(() => Promise.resolve({ data: { ip: "127.0.0.1" } }))
//       .mockImplementationOnce(() =>
//         Promise.resolve({
//           data: {
//             country_name: "United States",
//             city: "New York",
//             ip: "127.0.0.1"
//           }
//         })
//       );
//   });

//   const renderLogin = () => {
//     const RemixStub = createRemixStub([
//       {
//         path: "/v2/login",
//         Component: LoginV2Route
//       }
//     ]);
//     return render(<RemixStub />);
//   };

//   describe("Initial Rendering", () => {
//     it("renders all form elements correctly", () => {
//       renderLogin();

//       expect(screen.getByText(/log in to your account/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//       expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
//       expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
//       expect(screen.getByText(/sign in with microsoft/i)).toBeInTheDocument();
//     });

//     it("initializes location data on component mount", async () => {
//       renderLogin();

//       await waitFor(() => {
//         expect(mockAxios.get).toHaveBeenCalledTimes(2);
//         expect(mockAxios.get).toHaveBeenCalledWith("https://api.ipgeolocation.io/getip");
//       });
//     });
//   });

//   describe("Form Interactions", () => {
//     it("handles form submission with validation", async () => {
//       renderLogin();

//       await userEvent.type(screen.getByLabelText(/work email/i), "test@example.com");
//       await userEvent.type(screen.getByLabelText(/password/i), "password123");

//       const submitButton = screen.getByRole("button", { name: /sign in/i });
//       await userEvent.click(submitButton);

//       await waitFor(() => {
//         expect(submitButton).not.toBeDisabled();
//       });
//     });

//     it("displays 2FA setup modal on successful login", async () => {
//       renderLogin();

//       // Simulate successful login response
//       const mockResult = {
//         success: true,
//         is2FAEnabled: false
//       };

//       await waitFor(() => {
//         const modal = screen.queryByText(/enable two-factor authentication/i);
//         expect(modal).toBeInTheDocument();
//       });
//     });
//   });

//   describe("Navigation Elements", () => {
//     it("provides sign-up option for new users", () => {
//       renderLogin();

//       const signupLink = screen.getByText(/sign up/i);
//       expect(signupLink).toBeInTheDocument();
//       expect(signupLink.getAttribute("href")).toBe(path.to.signup);
//     });

//     it("includes forgot password link", () => {
//       renderLogin();

//       const forgotPasswordLink = screen.getByText(/forgot password/i);
//       expect(forgotPasswordLink).toBeInTheDocument();
//       expect(forgotPasswordLink.getAttribute("href")).toBe(path.to.forgotPasswordV2);
//     });
//   });

//   describe("Error Handling", () => {
//     it("displays location fetch errors appropriately", async () => {
//       mockAxios.get.mockRejectedValueOnce(new Error("Failed to fetch location"));

//       renderLogin();

//       await waitFor(() => {
//         expect(screen.getByText(/failed to fetch location data/i)).toBeInTheDocument();
//       });
//     });
//   });
// });



import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginV2Route, { loader, action } from "~/routes/_public+/v2.login";
import * as authService from "~/services/auth/auth.server"; // Mock service
import * as sessionService from "~/services/session.server"; // Mock service
import { debug } from 'jest-preview';


jest.mock("~/services/auth/auth.server");
jest.mock("~/services/session.server");


jest.mock("~/services/auth/auth.server", () => ({
  signInWithEmail: jest.fn(),
}));

jest.mock("~/services/session.server", () => ({
  getAuthSession: jest.fn(),
}));


// TEST 1: IndexRoute Component
describe("IndexRoute component", () => {
  it("should render the fallback text", () => {
    // Render the IndexRoute component
    render(<LoginV2Route />);

    // Ensure the paragraph with the text is in the document
    expect(
      screen.getByText(
        /Log in to your account/i,
      ),
    ).toBeInTheDocument();
  });
});


// describe("LoginV2Route Component", () => {
//   const mockSignInWithEmail = jest.spyOn(authService, "signInWithEmail");
//   const mockGetAuthSession = jest.spyOn(sessionService, "getAuthSession");

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const renderComponent = () =>
//     render(
//       <BrowserRouter>
//         <LoginV2Route />
//       </BrowserRouter>
//     );

//   debug();


//   test("renders all form elements correctly", () => {
//     renderComponent();
//     expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
//     expect(screen.getByText(/Sign in with Microsoft/i)).toBeInTheDocument();
//     expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
//   });

//   // test("displays error when email is empty", async () => {
//   //   renderComponent();
//   //   fireEvent.click(screen.getByText(/Sign In/i));
//   //   await waitFor(() => {
//   //     expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
//   //   });
//   // });

//   // test("displays error for invalid email format", async () => {
//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "invalidemail" },
//   //   });
//   //   fireEvent.click(screen.getByText(/Sign In/i));
//   //   await waitFor(() => {
//   //     expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
//   //   });
//   // });

//   // test("displays error when password is empty", async () => {
//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "user@example.com" },
//   //   });
//   //   fireEvent.click(screen.getByText(/Sign In/i));
//   //   await waitFor(() => {
//   //     expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
//   //   });
//   // });

//   // test("calls signInWithEmail with correct data on valid submission", async () => {
//   //   mockSignInWithEmail.mockResolvedValue({
//   //     userSessionId: "123",
//   //     accessToken: "supabaseSession.access_token",
//   //     companyId: 'companyId',
//   //     refreshToken: "supabaseSession.refresh_token",
//   //     userId: "123",
//   //     email: "user@example.com",
//   //     expiresIn: 3000,
//   //     expiresAt: 3000,
//   //   });

//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "user@example.com" },
//   //   });
//   //   fireEvent.change(screen.getByLabelText(/Password/i), {
//   //     target: { value: "password123" },
//   //   });

//   //   fireEvent.click(screen.getByText(/Sign In/i));

//   //   await waitFor(() => {
//   //     expect(mockSignInWithEmail).toHaveBeenCalledWith(
//   //       "user@example.com",
//   //       "password123",
//   //       expect.anything(),
//   //       expect.anything()
//   //     );
//   //   });
//   // });

//   // test("shows modal for enabling 2FA if 2FA is not enabled", async () => {
//   //   mockSignInWithEmail.mockResolvedValue({
//   //     userSessionId: "123",
//   //     accessToken: "supabaseSession.access_token",
//   //     companyId: 'companyId',
//   //     refreshToken: "supabaseSession.refresh_token",
//   //     userId: "123",
//   //     email: "user@example.com",
//   //     expiresIn: 3000,
//   //     expiresAt: 3000,
//   //   });

//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "user@example.com" },
//   //   });
//   //   fireEvent.change(screen.getByLabelText(/Password/i), {
//   //     target: { value: "password123" },
//   //   });

//   //   fireEvent.click(screen.getByText(/Sign In/i));

//   //   await waitFor(() => {
//   //     expect(screen.getByText(/Enable Two-Factor Authentication\?/i)).toBeInTheDocument();
//   //   });
//   // });

//   // test("redirects to MFA setup if 2FA is enabled", async () => {
//   //   window.location.href = ""; // Mock location.href
//   //   mockSignInWithEmail.mockResolvedValue({
//   //     userSessionId: "123",
//   //     accessToken: "supabaseSession.access_token",
//   //     companyId: 'companyId',
//   //     refreshToken: "supabaseSession.refresh_token",
//   //     userId: "123",
//   //     email: "user@example.com",
//   //     expiresIn: 3000,
//   //     expiresAt: 3000,
//   //   });

//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "user@example.com" },
//   //   });
//   //   fireEvent.change(screen.getByLabelText(/Password/i), {
//   //     target: { value: "password123" },
//   //   });

//   //   fireEvent.click(screen.getByText(/Sign In/i));

//   //   await waitFor(() => {
//   //     expect(window.location.href).toBe("/mfa"); // Adjust this based on your route
//   //   });
//   // });

//   // test("handles sign-in errors gracefully", async () => {
//   //   mockSignInWithEmail.mockResolvedValue(null);

//   //   renderComponent();
//   //   fireEvent.change(screen.getByLabelText(/Work Email/i), {
//   //     target: { value: "user@example.com" },
//   //   });
//   //   fireEvent.change(screen.getByLabelText(/Password/i), {
//   //     target: { value: "wrongpassword" },
//   //   });

//   //   fireEvent.click(screen.getByText(/Sign In/i));

//   //   await waitFor(() => {
//   //     expect(screen.getByText(/Invalid email or password format/i)).toBeInTheDocument();
//   //   });
//   // });
// });
