import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize`, // Use tenant ID if available
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    redirectUri: process.env.AZURE_REDIRECT_URI!, // Ensure this matches the one used in Azure AD App registration
  },
};

export const cca = new ConfidentialClientApplication(msalConfig);
