// verify.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { createRemixStub } from "@remix-run/testing";
// import { json } from "@remix-run/node"; // Add this import for json helper
// import "@testing-library/jest-dom"; // Add this import for DOM matchers
// import "@testing-library/jest-dom/extend-expect"; // Add this for extended matchers
import Verify from "~/routes/_public+/v2.verify";
// import { getSupabaseServiceRole } from "~/lib/supabase";
// import { getSession, commitAnySession, commitAuthSession } from "~/services/session.server";
// import { verifyOTP, createUserSession, makeAuthSession } from "~/services/auth/auth.server";
// import { getCompaniesForUser } from "~/modules/users";
// import { path } from "~/utils/path";

// First, let's set up the necessary type augmentation for Jest DOM
// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toBeInTheDocument(): R;
//       toBeDisabled(): R;
//       toBeEnabled(): R;
//       toHaveTextContent(text: string | RegExp): R;
//     }
//   }
// }

// Mock all external dependencies
// jest.mock("~/lib/supabase");
// jest.mock("~/services/session.server");
// jest.mock("~/services/auth/auth.server");
// jest.mock("~/modules/users");


describe("IndexRoute component", () => {
  it("should render the fallback text", () => {
    // Render the IndexRoute component
    render(<Verify />);

    // Ensure the paragraph with the text is in the document
    expect(
      screen.getByText(
        /We've sent verification codes to your email and phone. Please enter them below./i,
      ),
    ).toBeInTheDocument();
  });
});


// describe("Verify Loader", () => {
//   // We'll use this helper throughout our tests to create requests with different parameters
//   const createLoaderRequest = (params: Record<string, string>) => {
//     const url = new URL("http://localhost:3000/v2/verify");
//     Object.entries(params).forEach(([key, value]) => {
//       url.searchParams.set(key, value);
//     });
//     return new Request(url);
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("Token Verification Flow", () => {
//     it("successfully verifies email token and redirects to password setup", async () => {
//       // Set up our mock user that would be returned after successful verification
//       const mockUser = { id: "user123" };

//       // Configure our Supabase mock to simulate successful verification
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           verifyOtp: jest.fn().mockResolvedValue({
//             data: { user: mockUser },
//             error: null
//           })
//         }
//       });

//       // Mock session handling
//       (getSession as jest.Mock).mockResolvedValue({
//         set: jest.fn(),
//       });
//       (commitAnySession as jest.Mock).mockResolvedValue("session-cookie");

//       const response = await loader({
//         request: createLoaderRequest({
//           token: "valid-token",
//           email: "test@example.com"
//         })
//       } as any);

//       // Verify the response redirects to the correct page with user ID
//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(
//         `${path.to.setuppassword}?userId=${mockUser.id}`
//       );
//     });

//     it("handles verification failure by redirecting to signup", async () => {
//       // Configure Supabase mock to simulate verification failure
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           verifyOtp: jest.fn().mockResolvedValue({
//             data: { user: null },
//             error: new Error("Invalid token")
//           })
//         }
//       });

//       const response = await loader({
//         request: createLoaderRequest({
//           token: "invalid-token",
//           email: "test@example.com"
//         })
//       } as any);

//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(path.to.signup);
//     });
//   });

//   describe("Direct User ID Access", () => {
//     it("handles direct userId parameter correctly", async () => {
//       const mockUserId = "user123";
//       (getSession as jest.Mock).mockResolvedValue({
//         set: jest.fn()
//       });

//       const response = await loader({
//         request: createLoaderRequest({ userId: mockUserId })
//       } as any);

//       const data = await response.json();
//       expect(data.userId).toBe(mockUserId);
//     });
//   });

//   describe("Error Handling", () => {
//     it("handles missing parameters by redirecting to signup", async () => {
//       const response = await loader({
//         request: createLoaderRequest({})
//       } as any);

//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(path.to.signup);
//     });

//     it("gracefully handles server errors", async () => {
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           verifyOtp: jest.fn().mockRejectedValue(new Error("Server error"))
//         }
//       });

//       const response = await loader({
//         request: createLoaderRequest({
//           token: "valid-token",
//           email: "test@example.com"
//         })
//       } as any);

//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(path.to.signup);
//     });
//   });
// });

// describe("Verification Flow", () => {
//   // Loader Function Tests
//   describe("Loader Function", () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });

//     // Helper function to create loader requests with different parameters
//     const createLoaderRequest = (params: Record<string, string>) => {
//       const url = new URL("http://localhost:3000/v2/verify");
//       Object.entries(params).forEach(([key, value]) => {
//         url.searchParams.set(key, value);
//       });
//       return new Request(url);
//     };

//     it("handles email verification token flow successfully", async () => {
//       // Set up mock successful token verification
//       const mockUser = { id: "user123" };
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           verifyOtp: jest.fn().mockResolvedValue({
//             data: { user: mockUser },
//             error: null
//           })
//         }
//       });

//       (getSession as jest.Mock).mockResolvedValue({
//         set: jest.fn(),
//       });

//       (commitAnySession as jest.Mock).mockResolvedValue("session-cookie");

//       const response = await loader({
//         request: createLoaderRequest({
//           token: "valid-token",
//           email: "test@example.com"
//         })
//       } as any);

//       // Verify redirect to setup password page
//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(
//         `${path.to.setuppassword}?userId=${mockUser.id}`
//       );
//     });

//     it("handles direct userId access", async () => {
//       const mockUserId = "user123";
//       (getSession as jest.Mock).mockResolvedValue({
//         set: jest.fn()
//       });

//       const response = await loader({
//         request: createLoaderRequest({ userId: mockUserId })
//       } as any);

//       const data = await response.json();
//       expect(data.userId).toBe(mockUserId);
//     });

//     it("redirects to signup on verification failure", async () => {
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           verifyOtp: jest.fn().mockResolvedValue({
//             data: { user: null },
//             error: new Error("Invalid token")
//           })
//         }
//       });

//       const response = await loader({
//         request: createLoaderRequest({
//           token: "invalid-token",
//           email: "test@example.com"
//         })
//       } as any);

//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toBe(path.to.signup);
//     });
//   });

//   // Action Function Tests
//   describe("Action Function", () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });

//     const createActionRequest = (formData: Record<string, string>) => {
//       return new Request("http://localhost:3000/v2/verify", {
//         method: "POST",
//         body: new URLSearchParams(formData)
//       });
//     };

//     it("successfully verifies OTP and creates session", async () => {
//       // Mock session data
//       const mockSignupData = {
//         email: "test@example.com"
//       };

//       (getSession as jest.Mock).mockResolvedValue({
//         get: jest.fn().mockReturnValue(mockSignupData),
//         unset: jest.fn()
//       });

//       // Mock OTP verification
//       (verifyOTP as jest.Mock).mockResolvedValue({
//         session: { id: "session123" }
//       });

//       // Mock Supabase magic link generation
//       (getSupabaseServiceRole as jest.Mock).mockReturnValue({
//         auth: {
//           admin: {
//             generateLink: jest.fn().mockResolvedValue({
//               data: {
//                 user: { id: "user123" }
//               },
//               error: null
//             })
//           }
//         }
//       });

//       // Mock company and session creation
//       (createUserSession as jest.Mock).mockResolvedValue({ id: "session123" });
//       (getCompaniesForUser as jest.Mock).mockResolvedValue([1]);
//       (makeAuthSession as jest.Mock).mockReturnValue({ id: "auth123" });

//       const response = await action({
//         request: createActionRequest({
//           emailToken: "123456"
//         })
//       } as any);

//       expect(response.status).toBe(302);
//       expect(response.headers.get("Location")).toContain(path.to.setuppassword);
//       expect(response.headers.get("Set-Cookie")).toBeDefined();
//     });

//     it("handles OTP verification failure", async () => {
//       (getSession as jest.Mock).mockResolvedValue({
//         get: jest.fn().mockReturnValue({ email: "test@example.com" })
//       });

//       (verifyOTP as jest.Mock).mockRejectedValue(new Error("Invalid OTP"));

//       const response = await action({
//         request: createActionRequest({
//           emailToken: "invalid"
//         })
//       } as any);

//       const data = await response.json();
//       expect(response.status).toBe(400);
//       expect(data.error).toBeDefined();
//     });
//   });

//   // Component Tests
//   describe("Component Rendering", () => {
//     const renderVerify = () => {
//       const RemixStub = createRemixStub([
//         {
//           path: "/auth/verify",
//           Component: Verify
//         }
//       ]);
//       return render(<RemixStub />);
//     };

//     it("renders verification form with all elements", () => {
//       renderVerify();

//       // These assertions will now work with proper types
//       expect(screen.getByText(/verify your account/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/email verification code/i)).toBeInTheDocument();
//       expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
//       expect(screen.getByRole("button", { name: /resend verification code/i })).toBeInTheDocument();
//     });

//     it("handles form submission", async () => {
//       renderVerify();

//       const codeInput = screen.getByLabelText(/email verification code/i);
//       await userEvent.type(codeInput, "123456");

//       const submitButton = screen.getByRole("button", { name: /verify/i });
//       await userEvent.click(submitButton);

//       expect(submitButton).toHaveTextContent(/verifying/i);
//     });

//     it("displays error messages from action data", async () => {
//       const RemixStub = createRemixStub([
//         {
//           path: "/auth/verify",
//           Component: Verify,
//           action: () => json({ error: "Invalid verification code" })
//         }
//       ]);

//       render(<RemixStub />);

//       const codeInput = screen.getByLabelText(/email verification code/i);
//       await userEvent.type(codeInput, "invalid");

//       const submitButton = screen.getByRole("button", { name: /verify/i });
//       await userEvent.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/invalid verification code/i)).toBeInTheDocument();
//       });
//     });

//     it("handles resend code functionality", async () => {
//       jest.useFakeTimers();
//       renderVerify();

//       // Initially, resend button should be disabled with timer
//       const resendButton = screen.getByRole("button", { name: /resend code in \d+s/i });
//       expect(resendButton).toBeDisabled();

//       // Fast-forward 30 seconds
//       jest.advanceTimersByTime(30000);

//       await waitFor(() => {
//         expect(screen.getByRole("button", { name: /resend verification code/i })).toBeEnabled();
//       });

//       jest.useRealTimers();
//     });
//   });
// });