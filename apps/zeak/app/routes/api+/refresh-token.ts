// File: app/routes/api/refresh-token.ts

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { APIRefreshAccessToken } from "~/services/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return json({ error: "Refresh token is required" }, { status: 400 });
    }

    const result = await APIRefreshAccessToken(refreshToken);

    if ("error" in result) {
      // Assuming APIRefreshAccessToken returns an object with an 'error' property on failure
      return json({ error: result.error }, { status: 401 });
    }

    // Assuming APIRefreshAccessToken returns an object with newAccessToken and possibly other data
    return json(
      {
        accessToken: result.accessToken,
        expiresIn: result.expiresIn,
        tokenType: "Bearer",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
