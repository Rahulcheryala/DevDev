import { createCookieSessionStorage, redirect, type Session } from "@remix-run/node";

import { getCurrentPath, isGet, makeRedirectToFromHere } from "~/utils/http";

import {
  NODE_ENV,
  REFRESH_ACCESS_TOKEN_THRESHOLD,
  SESSION_KEY,
  SESSION_MAX_AGE,
  SESSION_SECRET,
  SESSION_KEY_API,
} from "~/config/env";

import type { Result } from "~/types";
import { path } from "~/utils/path";
import {
  getUserSession,
  refreshAccessToken,
  verifyAuthSession,
} from "./auth/auth.server";
import type { AuthSession } from "./auth/types";
import logger from "~/lib/logger";
import { getSupabaseServiceRole } from "~/lib/supabase";

interface SessionData {
  authSession?: AuthSession;
  "2FAChoice"?: boolean;
  redirectTo?: string;
  // Add other session data fields as needed
}

// Define flash message data structure
interface SessionFlashData {
  error?: string;
  success?: string;
  // Add other flash message types as needed
}

async function assertAuthSession(
  request: Request,
  { onFailRedirectTo }: { onFailRedirectTo?: string } = {},
) {
  const authSession = await getAuthSession(request);
  if (!authSession?.accessToken || !authSession?.refreshToken) {
    throw redirect(
      `${onFailRedirectTo || path.to.login}?${makeRedirectToFromHere(request)}`,
    );
  }
  return authSession;
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "zeak",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: NODE_ENV === "production",
  },
});

const sessionStorageApi = createCookieSessionStorage({
  cookie: {
    name: "carobapi",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: NODE_ENV === "production",
  },
});

export async function commitAuthSession(
  request: Request,
  {
    authSession,
  }: {
    authSession?: AuthSession | null;
  } = {},
) {
  const session = await getSession(request);

  // allow user session to be null.
  // useful you want to clear session and display a message explaining why
  if (authSession !== undefined) {
    session.set(SESSION_KEY, authSession);
  }

  return sessionStorage.commitSession(session, { maxAge: SESSION_MAX_AGE });
}


export async function commitAnySession(session: Session<SessionData, SessionFlashData>) {
  return sessionStorage.commitSession(session);
}

export async function commitSession(
  request: Request,
  {
    authSession,
  }: {
    authSession?: AuthSession | null;
  } = {},
) {
  const session = await getSession(request);

  // allow user session to be null.
  // useful you want to clear session and display a message explaining why
  if (authSession !== undefined) {
    session.set(SESSION_KEY, authSession);
  }

  return sessionStorage.commitSession(session, { maxAge: SESSION_MAX_AGE });
}



export async function commitAuthSessionApi(
  request: Request,
  {
    authSession,
  }: {
    authSession?: AuthSession | null;
  } = {},
) {
  const session = await getApiSession(request);

  // allow user session to be null.
  // useful you want to clear session and display a message explaining why
  if (authSession !== undefined) {
    session.set(SESSION_KEY_API, authSession);
  }

  return sessionStorageApi.commitSession(session, { maxAge: SESSION_MAX_AGE });
}

export async function destroyAuthSessionApi(request: Request) {
  const session = await getApiSession(request);

  await sessionStorage.destroySession(session);
}

export async function destroyAuthSession(request: Request) {
  const session = await getSession(request);

  throw redirect(path.to.login, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function flash(request: Request, result: Result) {
  const session = await getSession(request);
  if (typeof result.success === "boolean") {
    session.flash("success", result.success);
    session.flash("message", result.message);
  }

  return {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  };
}

export async function getAuthSession(
  request: Request,
): Promise<AuthSession | null> {
  const session = await getSession(request);
  return session.get(SESSION_KEY);
}

export async function getAuthSessionApi(
  request: Request,
): Promise<AuthSession | null> {
  const session = await getSession(request);
  return session.get(SESSION_KEY_API);
}

export async function getSessionFlash(request: Request) {
  const session = await getSession(request);

  const result: Result = {
    success: session.get("success") === true,
    message: session.get("message"),
  };

  if (!result.message) return null;

  const headers = { "Set-Cookie": await sessionStorage.commitSession(session) };

  return { result, headers };
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getApiSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

function isExpiringSoon(expiresAt: number) {
  return (expiresAt - REFRESH_ACCESS_TOKEN_THRESHOLD) * 1000 < Date.now();
}

export async function requireAuthSession(
  request: Request,
  {
    onFailRedirectTo,
    verify,
  }: {
    onFailRedirectTo?: string;
    verify: boolean;
  } = { verify: false },
): Promise<AuthSession> {
  const authSession = await assertAuthSession(request, {
    onFailRedirectTo,
  });

  const sessionDBCheck = await verifyAuthLoginSession(authSession, request);

  if (!sessionDBCheck) {
    await destroyAuthSession(request);
  }

  const isValidSession = verify ? await verifyAuthSession(authSession) : true;

  if (!isValidSession || isExpiringSoon(authSession.expiresAt)) {
    logger.info(
      "requireAuthSession refreshAuthSession invalid session or expiring",
    );
    return refreshAuthSession(request);
  }

  return authSession;
}

export async function refreshAuthSession(
  request: Request,
): Promise<AuthSession> {
  const authSession = await getAuthSession(request);

  const existingSession = await getUserSession(
    authSession!.userId,
    authSession!.userSessionId,
  );

  const refreshedAuthSession = await refreshAccessToken(
    authSession?.refreshToken,
    request,
    authSession?.companyId,
    {
      deviceInfo: JSON.stringify(existingSession?.device),
      locationInfo: JSON.stringify(existingSession?.location),
    },
  );

  if (!refreshedAuthSession) {
    const redirectUrl = `${path.to.login}?${makeRedirectToFromHere(request)}`;

    // here we throw instead of return because this function promise a AuthSession and not a response object
    // https://remix.run/docs/en/v1/guides/constraints#higher-order-functions
    throw redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: null,
        }),
      },
    });
  }

  // refresh is ok and we can redirect
  if (isGet(request)) {
    // here we throw instead of return because this function promise a UserSession and not a response object
    // https://remix.run/docs/en/v1/guides/constraints#higher-order-functions
    throw redirect(getCurrentPath(request), {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: refreshedAuthSession,
        }),
      },
    });
  }

  // we can't redirect because we are in an action, so, deal with it and don't forget to handle session commit 👮‍♀️
  return refreshedAuthSession;
}

export async function updateCompanySession(
  request: Request,
  companyId: string,
) {
  const session = await getSession(request);
  const authSession = await getAuthSession(request);

  // allow user session to be null.
  // useful you want to clear session and display a message explaining why
  if (authSession !== undefined) {
    session.set(SESSION_KEY, {
      ...authSession,
      companyId,
    });
  }

  return sessionStorage.commitSession(session, { maxAge: SESSION_MAX_AGE });
}

export async function verifyAuthLoginSession(
  authSession: AuthSession,
  request: Request,
) {
  const userSessionId = (await getSession(request)).data.auth.userSessionId;

  const { data: activeSessions, error: sessionError } =
    await getSupabaseServiceRole()
      .from("userSession")
      .select("id")
      .eq("userId", authSession.userId)
      .eq("id", userSessionId)
      .eq("status", "Logged In");

  if (sessionError || !activeSessions?.length) return false;

  return Boolean(userSessionId);
}

export async function removeLoginSession(request: Request) {
  const userSessionId = (await getSession(request)).data.auth.userSessionId;

  return await getSupabaseServiceRole()
    .from("userSession")
    .update({
      status: "Logged Out",
      sessionActivity: "Inactive",
      endedOn: new Date().toISOString(),
    })
    .eq("id", userSessionId);
}

export async function removeApiLoginSession(userSessionId: string) {
  return await getSupabaseServiceRole()
    .from("apiUserSession")
    .update({
      status: "Logged Out",
      sessionActivity: "Inactive",
      deletedOn: new Date().toISOString(),
    })
    .eq("id", userSessionId);
}


