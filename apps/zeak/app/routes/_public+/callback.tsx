import { validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import axios from "axios";
import Bowser from "bowser";
import { useEffect } from "react";
import logger from "~/lib/logger";
import { supabaseClient } from "~/lib/supabase/client";
// import { getCompanies } from "~/modules/settings";
import { getUserByEmail } from "~/modules/users/users.server";
import { callbackValidator } from "~/services/auth/auth.models";
import {
  refreshAccessToken,
  // requirePermissions,
} from "~/services/auth/auth.server";
import {
  commitAuthSession,
  destroyAuthSession,
  flash,
  getAuthSession,
} from "~/services/session.server";
import type { FormActionData } from "~/types";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error } from "~/utils/result";

export async function loader({ request }: LoaderFunctionArgs) {
  const authSession = await getAuthSession(request);

  if (authSession) await destroyAuthSession(request);
  return json({});
}

export async function action({ request }: ActionFunctionArgs): FormActionData {
  assertIsPost(request);
  // const { companyId } = await requirePermissions(request, {});

  const validation = await validator(callbackValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return json(error(validation.error, "Invalid callback form"), {
      status: 400,
    });
  }

  const { refreshToken, deviceInfo, locationInfo } = validation.data;

  const authSession = await refreshAccessToken(refreshToken, request, null, {
    deviceInfo,
    locationInfo,
  });
  if (!authSession) {
    return redirect(
      path.to.root,
      await flash(request, error(authSession, "Invalid refresh token")),
    );
  }

  const user = await getUserByEmail(authSession.email);
  if (user?.data) {
    throw redirect(path.to.resetPasswordV2, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession,
        }),
      },
    });
  } else {
    throw redirect(
      path.to.root,
      await flash(request, error(user.error, "User not found")),
    );
  }
}

export default function AuthCallback() {
  const result = useActionData<typeof action>();
  const fetcher = useFetcher();

  const fetchLocationData = async () => {
    try {
      // TODO move this API key to env.
      const API_KEY = "d819646c7f0546d785c3f6d9b490bcc3";
      const { data: ipData } = await axios.get(
        "https://api.ipgeolocation.io/getip",
      );
      const { data: locationData } = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipData.ip}`,
      );

      return {
        locationInfo: locationData,
        deviceInfo: Bowser.parse(window.navigator.userAgent),
      };
    } catch (error) {
      logger.error("Error fetching location data:", error);
      return {
        locationInfo: {},
        deviceInfo: {},
      };
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
          // supabase sdk has ability to read url fragment that contains your token after third party provider redirects you here
          // this fragment url looks like https://.....#access_token=evxxxxxxxx&refresh_token=xxxxxx, and it's not readable server-side (Oauth security)
          // supabase auth listener gives us a user session, based on what it founds in this fragment url
          // we can't use it directly, client-side, because we can't access sessionStorage from here

          // we should not trust what's happen client side
          // so, we only pick the refresh token, and let's back-end getting user session from it
          const refreshToken = supabaseSession?.refresh_token;

          if (!refreshToken) return;

          const { deviceInfo, locationInfo } = await fetchLocationData();

          const formData = new FormData();

          formData.append("refreshToken", refreshToken);
          formData.append("deviceInfo", JSON.stringify(deviceInfo));
          formData.append("locationInfo", JSON.stringify(locationInfo));

          fetcher.submit(formData, { method: "post" });
        }
      },
    );

    return () => {
      // prevent memory leak. Listener stays alive 👨‍🎤
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher]);

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
