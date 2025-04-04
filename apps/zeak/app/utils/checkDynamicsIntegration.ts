import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { ensureValidAccessToken } from "./msalTokenHelper";

export interface DynamicsIntegrationStatus {
  isIntegrated: boolean;
  message?: string;
  integrationData?: {
    id: string;
    dynamicsBaseUrl: string;
    email: string;
  } | null;
}

/**
 * Checks if there is an active Dynamics 365 integration for the given user email
 * and verifies that the authentication tokens are valid.
 *
 * @param userEmail - The email of the user to check integration for
 * @returns Object containing integration status and details
 */
export async function checkDynamicsIntegration(
  userEmail: string,
): Promise<DynamicsIntegrationStatus> {
  const supabase = getSupabaseServiceRole();

  try {
    // Check if integration exists
    const { data: integrationData, error } = await supabase
      .from("integrations")
      .select("*")
      .eq("integrationName", "Dynamics F&O")
      .eq("integrationJson->>email", userEmail)
      .single();

    if (error || !integrationData || !integrationData.integrationJson) {
      return {
        isIntegrated: false,
        message: "No Dynamics 365 integration found for this user",
      };
    }

    // Verify token validity
    const tokenResponse = await ensureValidAccessToken(userEmail);

    if (!tokenResponse) {
      return {
        isIntegrated: false,
        message: "Integration exists but authentication tokens are invalid",
        integrationData: {
          id: integrationData.id,
          dynamicsBaseUrl: integrationData.integrationJson.dynamicsBaseUrl,
          email: userEmail,
        },
      };
    }

    // Integration exists and tokens are valid
    return {
      isIntegrated: true,
      integrationData: {
        id: integrationData.id,
        dynamicsBaseUrl: integrationData.integrationJson.dynamicsBaseUrl,
        email: userEmail,
      },
    };
  } catch (error) {
    console.error("Error checking Dynamics integration:", error);
    return {
      isIntegrated: false,
      message: "Error checking integration status",
    };
  }
}
