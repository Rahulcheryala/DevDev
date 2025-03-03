import { cca } from "./msalClient";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { redirect } from "@remix-run/node";
import { InteractionRequiredAuthError } from "@azure/msal-node";

export interface TokenResponse {
  accessToken: string;
  dynamicsBaseUrl: string;
}

/**
 * Ensures that the access token is valid. If expired, refreshes the token silently.
 * If the refresh token is expired, redirects the user to the interactive login flow.
 * @param userEmail - The user's email associated with the Dynamics F&O integration.
 * @returns The valid access token and Dynamics base URL.
 */

const supabase = getSupabaseServiceRole();

export async function ensureValidAccessToken(
  userEmail: string,
): Promise<TokenResponse | null> {
  const supabase = getSupabaseServiceRole();

  // Fetch the integration details for Dynamics F&O
  const { data: integrationData, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("integrationName", "Dynamics F&O")
    .eq("integrationJson->>email", userEmail)
    .single();

  if (error || !integrationData) {
    console.error("Error fetching integration data:", error);
    return null;
  }

  const { userId, dynamicsBaseUrl } = integrationData.integrationJson;

  console.log("User Id is :" + userId);

  // MSAL Configuration
  // const msalConfig = {
  //   auth: {
  //     clientId: process.env.AZURE_CLIENT_ID!,
  //     authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  //     clientSecret: process.env.AZURE_CLIENT_SECRET!,
  //   },
  // };

  // const cca = new ConfidentialClientApplication(msalConfig);

  try {
    // Retrieve the full account info by homeAccountId
    // const account = await cca.getTokenCache().getAllAccounts()
    console.log("The integration id is: " + integrationData.id);
    const serializedTokenCache = await fetchTokenCacheFromSupabase(
      integrationData.id,
    );
    const tokenCache = cca.getTokenCache();
    tokenCache.deserialize(serializedTokenCache);
    const accounts = await tokenCache.getAllAccounts();
    console.log(
      "Here is account 1: " + JSON.stringify(await tokenCache.getAllAccounts()),
    );
    console.log(
      JSON.stringify(await cca.getTokenCache().getAllAccounts()).toString(),
    );

    if (!accounts) {
      console.error("No account found for the provided homeAccountId.");
      // return redirect("http://localhost:3000/auth/integrations/erp/dynamics/login");
    }

    const tokenRequest = {
      scopes: [`${dynamicsBaseUrl}/.default`, "offline_access"],
      account: accounts[0], // Full account info is passed here
    };

    // Attempt to refresh the access token silently
    const tokenResponse = await cca.acquireTokenSilent(tokenRequest);

    if (tokenResponse) {
      const refreshedAccessToken = tokenResponse.accessToken;

      // Update the Supabase database with the refreshed access token
      const { error: updateError } = await supabase
        .from("integrations")
        .update({
          integrationJson: {
            ...integrationData.integrationJson,
            accessToken: refreshedAccessToken,
          },
        })
        .eq("integrationName", "Dynamics F&O")
        .eq("integrationJson->>email", userEmail);

      if (updateError) {
        console.error(
          "Error updating integration with refreshed access token:",
          updateError,
        );
        return null;
      }

      return {
        accessToken: refreshedAccessToken,
        dynamicsBaseUrl,
      };
    }
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      // This error indicates that the refresh token has expired or is invalid, requiring user interaction
      console.error("Refresh token expired. Redirecting to login:", err);
      // Redirect the user to the login page to re-authenticate
      return redirect(
        "http://localhost:3000/auth/integrations/erp/dynamics/login",
      );
    } else {
      // Handle other errors
      console.error("Error refreshing access token silently:", err);
      return null;
    }
  }

  return {
    accessToken,
    dynamicsBaseUrl,
  };
}

export async function persistTokenCache(
  integrationId: string,
  serializedTokenCache: string,
): Promise<void> {
  const serializedCache = serializedTokenCache;

  console.log("Serialized Cache is: " + serializedCache);

  const { error } = await supabase
    .from("DynamicsIntegrationTokenCache")
    .upsert({
      integrationId, // Reference to integration
      tokenCache: serializedCache,
      updatedAt: new Date(),
    })
    .eq("integrationId", integrationId); // Update the existing row if exists

  if (error) {
    console.error("Failed to persist token cache:", JSON.stringify(error));
    throw error;
  }
}

export async function fetchTokenCacheFromSupabase(
  integrationId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("DynamicsIntegrationTokenCache")
    .select("tokenCache")
    .eq("integrationId", integrationId)
    .single();

  if (error || !data) {
    console.error("Failed to load token cache:", error);
    return;
  }

  return data.tokenCache;
}
