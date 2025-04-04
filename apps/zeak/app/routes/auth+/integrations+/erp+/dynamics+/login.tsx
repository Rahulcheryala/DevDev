import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const dynamicsBaseURL = formData.get("dynamicsBaseUrl");
  const returnTo = formData.get("returnTo");

  if (!dynamicsBaseURL) {
    return {
      error:
        "Please provide your Dynamics 365 Finance and Operations base URL.",
    };
  }

  const authUrlParameters = {
    scopes: ["openid", "profile", "offline_access", "User.Read"],
    prompt: "consent",
    redirectUri: process.env.AZURE_REDIRECT_URI!,
  };

  const cca = (await import("~/utils/msalClient")).cca;
  const authCodeUrl = await cca.getAuthCodeUrl(authUrlParameters);

  const state = JSON.stringify({
    dynamicsBaseUrl: dynamicsBaseURL,
    returnTo,
  });

  const fullAuthUrl = `${authCodeUrl}&state=${encodeURIComponent(state)}`;
  return redirect(fullAuthUrl);
};

export default function Login() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();

  const baseUrl = searchParams.get("baseUrl") || "";
  const returnTo = searchParams.get("returnTo") || "";

  return (
    <Form
      method="post"
      className="flex flex-col gap-2 items-center align-middle"
    >
      <input type="hidden" name="returnTo" value={returnTo} />
      <label>
        Dynamics 365 F&O Base URL:
        <input
          type="url"
          name="dynamicsBaseUrl"
          className="border-2 border-slate-600"
          required
          defaultValue={baseUrl}
        />
      </label>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      <button type="submit" className="border-2 bg-amber-500">
        Login with Dynamics 365
      </button>
    </Form>
  );
}
