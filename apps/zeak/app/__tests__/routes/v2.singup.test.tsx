import { getSupabaseServiceRole } from "~/lib/supabase";
import { getSession } from "~/services/session.server";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRemixStub } from "@remix-run/testing";
import axios from "axios";
import { signUpWithEmail } from "~/services/auth/auth.server";
import { getUser } from "~/modules/users/users.server";
import { commitAuthSession } from "~/services/session.server";
import * as validator from "@zeak/remix-validated-form";
import { path } from "~/utils/path";
import SignUp, { action } from "~/routes/_public+/v2.signup";

jest.mock("~/lib/supabase");
jest.mock("~/services/session.server");

describe("SignUp Loader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Add loader tests here when you implement the loader function
});

// signup.action.test.ts


jest.mock("~/services/auth/auth.server");
jest.mock("~/modules/users/users.server");
jest.mock("~/services/session.server");
jest.mock("~/lib/supabase");

describe("SignUp Action", () => {
  // Helper function to create mock requests
  const createMockRequest = (formData: Record<string, string>) => {
    return new Request("v2/signup", {
      method: "POST",
      body: new URLSearchParams(formData),
    });
  };

  const mockFormData = {
    email: "test@example.com",
    password: "Password123!",
    firstName: "John",
    lastName: "Doe",
    terms: "on",
    userType: "Individual",
    deviceInfo: JSON.stringify({ browser: "Chrome" }),
    locationInfo: JSON.stringify({ country: "US" }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate form data before processing", async () => {
    const mockValidate = jest.fn().mockResolvedValue({ data: mockFormData });
    jest.spyOn(validator, "validator").mockImplementation(() => ({
      validate: mockValidate,
    }));

    await action({ request: createMockRequest(mockFormData) } as any);

    expect(mockValidate).toHaveBeenCalled();
  });

  it("should return validation error when form data is invalid", async () => {
    const validationError = { fieldErrors: { email: ["Invalid email format"] } };
    jest.spyOn(validator, "validator").mockImplementation(() => ({
      validate: () => Promise.resolve({ error: validationError }),
    }));

    const response = await action({ request: createMockRequest({}) } as any);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.fieldErrors).toBeDefined();
  });

  it("should create user session and redirect for successful signup", async () => {
    const mockAuthSession = {
      userId: "user123",
      sessionId: "session123",
    };

    jest.spyOn(validator, "validator").mockImplementation(() => ({
      validate: () => Promise.resolve({ data: mockFormData }),
    }));

    (signUpWithEmail as jest.Mock).mockResolvedValue(mockAuthSession);
    (getUser as jest.Mock).mockResolvedValue({ data: { "2FAEnabled": false } });
    (commitAuthSession as jest.Mock).mockResolvedValue("session-cookie");

    const response = await action({ request: createMockRequest(mockFormData) } as any);

    expect(signUpWithEmail).toHaveBeenCalledWith(
      mockFormData.email,
      mockFormData.password,
      mockFormData.deviceInfo,
      mockFormData.locationInfo,
      mockFormData.firstName,
      mockFormData.lastName
    );
    expect(response.headers.get("Location")).toBe(path.to.indivisualOnboarding);
  });

  it("should redirect to MFA when 2FA is enabled", async () => {
    jest.spyOn(validator, "validator").mockImplementation(() => ({
      validate: () => Promise.resolve({ data: mockFormData }),
    }));

    (signUpWithEmail as jest.Mock).mockResolvedValue({
      userId: "user123",
      sessionId: "session123",
    });
    (getUser as jest.Mock).mockResolvedValue({ data: { "2FAEnabled": true } });

    const response = await action({ request: createMockRequest(mockFormData) } as any);

    expect(response.headers.get("Location")).toBe(path.to.mfa);
  });
});



jest.mock("axios");

describe("SignUp Component", () => {
  const mockAxios = jest.requireMock("axios");

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock location API responses
    mockAxios.get
      .mockImplementationOnce(() => Promise.resolve({ data: { ip: "127.0.0.1" } }))
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            country_name: "United States",
            city: "New York",
            ip: "127.0.0.1"
          }
        })
      );
  });

  const renderSignUp = () => {
    const RemixStub = createRemixStub([
      {
        path: "v2/signup",
        Component: SignUp
      }
    ]);
    return render(<RemixStub />);
  };

  describe("Initial Render", () => {
    it("should render all form fields", () => {
      renderSignUp();

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole("checkbox", { name: /terms/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    it("should fetch location data on mount", async () => {
      renderSignUp();

      await waitFor(() => {
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenCalledWith("https://api.ipgeolocation.io/getip");
      });
    });
  });

  describe("Form Interactions", () => {
    it("should toggle between Individual and Enterprise user types", async () => {
      renderSignUp();

      const individualButton = screen.getByRole("button", { name: /individual/i });
      const enterpriseButton = screen.getByRole("button", { name: /enterprise/i });

      expect(individualButton).toHaveClass("primary");
      expect(enterpriseButton).toHaveClass("secondary");

      await userEvent.click(enterpriseButton);

      expect(individualButton).toHaveClass("secondary");
      expect(enterpriseButton).toHaveClass("primary");
    });

    it("should show password requirements", async () => {
      renderSignUp();

      const passwordInput = screen.getByLabelText(/password/i);
      await userEvent.type(passwordInput, "weak");

      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });

    it("should handle form submission with valid data", async () => {
      renderSignUp();

      await userEvent.type(screen.getByLabelText(/first name/i), "John");
      await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "StrongPass123!");
      await userEvent.click(screen.getByRole("checkbox", { name: /terms/i }));

      const submitButton = screen.getByRole("button", { name: /next/i });
      await userEvent.click(submitButton);

      // Wait for form submission - add expectations based on your form handling
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("should show error when location fetch fails", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

      renderSignUp();

      await waitFor(() => {
        expect(screen.getByText(/failed to fetch location data/i)).toBeInTheDocument();
      });
    });
  });
});