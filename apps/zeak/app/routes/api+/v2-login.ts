// File: app/routes/api/login.ts

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { validator } from "@zeak/remix-validated-form";
import { loginApiValidator } from "~/services/auth";
import { APISignInWithEmail } from "~/services/auth/auth.server";
import { commitAuthSessionApi } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error } from "~/utils/result";

// Predefined dummy data
const deviceInfo =
  '{"name":"Chrome","version":"94.0.4606.81","os":{"name":"Windows","version":"10"},"platform":{"type":"desktop","vendor":"Microsoft"}}';
const locationInfo =
  '{"ip":"203.0.113.195","country_name":"United States","city":"New York","latitude":40.7128,"longitude":-74.0060,"time_zone":{"name":"America/New_York","offset":-4}}';

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const body = await request.json();

  const formData = new FormData();
  formData.append("email", body.email);
  formData.append("password", body.password);

  const validation = await validator(loginApiValidator).validate(formData);

  if (validation.error) {
    return json({ error: validation.error }, { status: 400 });
  }

  const { email, password } = validation.data;

  const authSession = await APISignInWithEmail(
    email,
    password,
    deviceInfo,
    locationInfo,
  );

  if (!authSession) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return json(
      error(
        null,
        "Invalid email or password. Please check your credentials and try again.",
      ),
      { status: 401 },
    );
  }

  const cookieHeader = await commitAuthSessionApi(request, { authSession });

  return json(
    {
      token: authSession,
    },
    {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    },
  );
}
