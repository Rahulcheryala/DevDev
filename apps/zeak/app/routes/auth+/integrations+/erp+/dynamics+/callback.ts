import { cca } from "~/utils/msalClient";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase"; // Supabase service role
import { path } from "~/utils/path";
import { persistTokenCache } from "~/utils/msalTokenHelper";
import { getAuthSession } from "~/services/session.server";

// OAuth callback handler for Dynamics F&O (Azure AD)
export const loader: LoaderFunction = async ({ request }) => {
  const { userId, companyId } = await getAuthSession(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    console.error("Missing authorization code");
    return redirect(`${path.to.login}?error=missing_code`);
  }

  const stateParam = url.searchParams.get("state");
  if (!stateParam) {
    console.error("Missing state parameter");
    return redirect(`/auth/login?error=missing_state`);
  }

  let state;
  try {
    state = JSON.parse(stateParam);
  } catch (error) {
    console.error("Invalid state parameter");
    return redirect(`/auth/login?error=invalid_state`);
  }

  const { dynamicsBaseUrl, returnTo } = state;

  // Azure AD OAuth configuration
  // const msalConfig = {
  //   auth: {
  //     clientId: process.env.AZURE_CLIENT_ID!,
  //     authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize`, // Use tenant ID if available
  //     clientSecret: process.env.AZURE_CLIENT_SECRET!,
  //     redirectUri: process.env.AZURE_REDIRECT_URI!, // Ensure this matches the one used in Azure AD App registration
  //   },
  // };

  // const cca = new ConfidentialClientApplication(msalConfig);

  // Prepare token request using the authorization code
  const tokenRequest = {
    scopes: [`${dynamicsBaseUrl}/.default`, "offline_access"], // Add any required scopes
    code,
    redirectUri: process.env.AZURE_REDIRECT_URI!,
  };

  try {
    // Acquire the token using the authorization code
    const tokenResponse = await cca.acquireTokenByCode(tokenRequest);

    if (
      !tokenResponse ||
      !tokenResponse.accessToken ||
      !tokenResponse.account
    ) {
      throw new Error("Invalid token response from Azure AD");
    }

    console.log(tokenResponse);

    const { accessToken, account, expiresOn } = tokenResponse;

    console.log(
      "Cached Accounts are in MSAL CCA: " +
        JSON.stringify(await cca.getTokenCache().getAllAccounts()),
    );

    const tokenCache = cca.getTokenCache().serialize();

    // // Fetch Dynamics environments to get the base URL
    // const environmentResponse = await fetch(
    //   `https://api.dynamics.com/v1.0/environments`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // ).then((res) => res.json());

    // const { baseUrl: dynamicsBaseURL } = environmentResponse.data.value[0];

    // Store the integration details in Supabase
    const supabaseAdmin = getSupabaseServiceRole();
    const integrationData = {
      integrationName: "Dynamics F&O",
      integrationType: "ERP",
      integrationJson: {
        accessToken: accessToken,
        expiresIn:
          Math.floor(expiresOn!.getTime() / 1000) -
          Math.floor(Date.now() / 1000), // Time in seconds until the token expires
        userId: account!.homeAccountId!,
        email: account!.username!,
        dynamicsBaseUrl, // Store the base URL in the integration details
      },
      userId,
      companyId,
    };

    // const { data, error } = await supabaseAdmin
    //   .from("integrations")
    //   .insert([{ ...integrationData }])
    //   .select("*")
    //   .single();

    //   await persistTokenCache(data.id, tokenCache);
    // if (error) {
    //   console.error("Failed to store integration:", error);
    //   return json({ error: "Failed to store integration" }, { status: 500 });
    // }

    // First check if a record already exists
    const { data: existingData, error: selectError } = await supabaseAdmin
      .from("integrations")
      .select("*")
      .eq("integrationName", "Dynamics F&O")
      .eq("integrationJson->>email", tokenResponse.account.username)
      .single();

    if (selectError) {
      // If no existing record is found, perform an insert
      const { data, error: insertError } = await supabaseAdmin
        .from("integrations")
        .insert([{ ...integrationData }])
        .select("*")
        .single();

      if (insertError) {
        console.error("Error inserting new integration data:", insertError);
        return null;
      }

      console.log("Inserted data:", JSON.stringify(data));
      await persistTokenCache(data.id, tokenCache);
    } else {
      // If the record already exists, perform an update
      const { data, error: updateError } = await supabaseAdmin
        .from("integrations")
        .update({ ...integrationData })
        .eq("id", existingData.id) // Update by the primary key
        .select("*")
        .single();

      if (updateError) {
        console.error("Error updating integration data:", updateError);
        return null;
      }

      console.log("Updated data:", JSON.stringify(data));
      await persistTokenCache(data.id, tokenCache);
    }

    // Use the returnTo URL for redirection
    if (returnTo) {
      return new Response(
        `
        <html>
          <body>
            <script>
              if (window.opener) {
              console.log("window.opener has been Opened - Pepsi", window.opener);
                window.opener.postMessage({ 
                  type: 'DYNAMICS_AUTH_SUCCESS',
                  status: 'success'
                }, '*');
                window.close();
              } else {
                window.location.href = ${JSON.stringify(returnTo)};
              }
            </script>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    // Fallback redirect if no returnTo URL
    return redirect("/x");
  } catch (error) {
    console.error("Authentication failed:", error);
    return redirect(`${path.to.login}?error=authentication_failed`);
  }
};
