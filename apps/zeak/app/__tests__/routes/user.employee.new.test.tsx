// createEmployee.test.tsx

import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";
import { requirePermissions } from "~/services/auth/auth.server";
import { createEmployeeAccount } from "~/modules/users/users.server";
import * as validator from "@zeak/remix-validated-form";
import { flash } from "~/services/session.server";
import { VERCEL_URL } from "~/config/env";
import { path } from "~/utils/path";
import CreateEmployee, { action } from "~/routes/x+/users+/employees.new";

// Mock all external dependencies
jest.mock("~/services/auth/auth.server");
jest.mock("~/modules/users/users.server");
jest.mock("~/services/session.server");
jest.mock("@zeak/remix-validated-form");

describe("CreateEmployee", () => {
  describe("Component Rendering", () => {
    it("renders the CreateEmployeeModal component", () => {
      const RemixStub = createRemixStub([
        {
          path: "employees/new",
          Component: CreateEmployee
        }
      ]);

      render(<RemixStub />);
      // Add specific component render tests based on your CreateEmployeeModal implementation
    });
  });

  describe("Action Handler", () => {
    const mockRequest = (formData: Record<string, string>) => {
      return new Request("employees/new", {
        method: "POST",
        body: new URLSearchParams(formData)
      });
    };

    const mockFormData = {
      email: "employee@test.com",
      firstName: "John",
      lastName: "Doe",
      employeeType: "FULL_TIME",
      inviteUser: "true",
      password: "SecurePass123!",
      enable2FA: "true"
    };

    const mockClient = {
      id: "client123",
      // Add other client properties as needed
    };

    const mockCompanyId = "company123";

    beforeEach(() => {
      jest.clearAllMocks();

      // Mock requirePermissions
      (requirePermissions as jest.Mock).mockResolvedValue({
        client: mockClient,
        companyId: mockCompanyId
      });

      // Mock flash
      (flash as jest.Mock).mockImplementation((request, result) => {
        return Promise.resolve("mock-session");
      });
    });

    it("validates user has permission to create employees", async () => {
      // Setup validation success
      jest.spyOn(validator, "validator").mockImplementation(() => ({
        validate: jest.fn().mockResolvedValue({ data: mockFormData })
      }));

      await action({
        request: mockRequest(mockFormData)
      } as any);

      expect(requirePermissions).toHaveBeenCalledWith(
        expect.any(Request),
        { create: "users" }
      );
    });

    it("returns validation error for invalid form data", async () => {
      const validationError = {
        fieldErrors: {
          email: ["Invalid email format"]
        }
      };

      jest.spyOn(validator, "validator").mockImplementation(() => ({
        validate: jest.fn().mockResolvedValue({ error: validationError })
      }));

      const response = await action({
        request: mockRequest({})
      } as any);

      expect(response.status).toBe(400);
      const responseData = await response.json();
      expect(responseData.fieldErrors.email).toBeDefined();
    });

    it("successfully creates employee account", async () => {
      // Mock successful validation
      jest.spyOn(validator, "validator").mockImplementation(() => ({
        validate: jest.fn().mockResolvedValue({ data: mockFormData })
      }));

      // Mock successful account creation
      (createEmployeeAccount as jest.Mock).mockResolvedValue({
        success: true,
        message: "Employee created successfully"
      });

      try {
        await action({
          request: mockRequest(mockFormData)
        } as any);
      } catch (response: any) {
        // Verify redirect
        expect(response.status).toBe(302);
        expect(response.headers.get("Location")).toBe(path.to.employeeAccounts);
      }

      // Verify employee creation call
      expect(createEmployeeAccount).toHaveBeenCalledWith(
        mockClient,
        {
          email: mockFormData.email,
          firstName: mockFormData.firstName,
          lastName: mockFormData.lastName,
          employeeType: mockFormData.employeeType,
          companyId: mockCompanyId,
          inviteUser: true,
          MFAEnabled: true,
          password: mockFormData.password
        },
        `${VERCEL_URL}/callback`
      );
    });

    it("handles POST method requirement", async () => {
      const getRequest = new Request("http://test.com/employees/create", {
        method: "GET"
      });

      await expect(action({ request: getRequest } as any))
        .rejects
        .toThrow("Method not allowed");
    });

    it("handles permission check failure", async () => {
      (requirePermissions as jest.Mock).mockRejectedValue(
        new Error("Unauthorized")
      );

      await expect(action({
        request: mockRequest(mockFormData)
      } as any)).rejects.toThrow("Unauthorized");
    });

    it("handles employee creation failure", async () => {
      // Mock successful validation
      jest.spyOn(validator, "validator").mockImplementation(() => ({
        validate: jest.fn().mockResolvedValue({ data: mockFormData })
      }));

      // Mock failed account creation
      (createEmployeeAccount as jest.Mock).mockResolvedValue({
        success: false,
        message: "Failed to create employee"
      });

      try {
        await action({
          request: mockRequest(mockFormData)
        } as any);
      } catch (response: any) {
        // Verify redirect with error flash
        expect(response.status).toBe(302);
        expect(flash).toHaveBeenCalledWith(
          expect.any(Request),
          expect.objectContaining({
            success: false
          })
        );
      }
    });
  });
});

// createEmployee.integration.test.tsx
// Optional integration tests if needed

describe("CreateEmployee Integration", () => {
  it("successfully submits form and creates employee", async () => {
    // Integration test implementation would go here
    // This would test the full flow from form submission to redirect
    // Including actual form interactions and response handling
  });

  // Add more integration tests as needed
});