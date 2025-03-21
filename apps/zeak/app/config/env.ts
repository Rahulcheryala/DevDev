import { isBrowser } from "@zeak/utils";

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_ANON_PUBLIC: string;
      POSTHOG_API_HOST: string;
      POSTHOG_PROJECT_PUBLIC_KEY: string;
    };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTHOG_API_HOST: string;
      POSTHOG_PROJECT_PUBLIC_KEY: string;
      SUPABASE_ANON_PUBLIC: string;
      SESSION_SECRET: string;
      SESSION_KEY: string;
      SESSION_KEY_API: string;
      SESSION_ERROR_KEY: string;
      SUPABASE_URL: string;
      SUPABASE_SERVICE_ROLE: string;
      VERCEL_URL: string;
    }
  }
}

type EnvOptions = {
  isSecret?: boolean;
  isRequired?: boolean;
};

function getEnv(
  name: string,
  { isRequired, isSecret }: EnvOptions = { isSecret: true, isRequired: true },
) {
  if (isBrowser && isSecret) return "";

  const source = (isBrowser ? window.env : process.env) ?? {};

  const value = source[name as keyof typeof source];

  if (!value && isRequired) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

/**
 * Server env
 */
export const SUPABASE_SERVICE_ROLE = getEnv("SUPABASE_SERVICE_ROLE");
export const SESSION_SECRET = getEnv("SESSION_SECRET");
export const SESSION_KEY = "auth";
export const SESSION_KEY_API = "apiauth";
export const SESSION_ERROR_KEY = "error";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days;
export const REFRESH_ACCESS_TOKEN_THRESHOLD = 60 * 10; // 10 minutes left before token expires
export const VERCEL_URL = getEnv("VERCEL_URL");
export const DOMAIN_URL = getEnv("DOMAIN_URL");
export const ACCESS_TOKEN_EXPIRY = 3000;

/**
 * Shared envs
 */
export const NODE_ENV = getEnv("NODE_ENV", {
  isSecret: false,
  isRequired: false,
});
export const POSTHOG_API_HOST = getEnv("POSTHOG_API_HOST", {
  isSecret: false,
});
export const POSTHOG_PROJECT_PUBLIC_KEY = getEnv("POSTHOG_PROJECT_PUBLIC_KEY", {
  isSecret: false,
});
export const SUPABASE_API_URL = getEnv("SUPABASE_API_URL", { isSecret: false });
export const SUPABASE_ANON_PUBLIC = getEnv("SUPABASE_ANON_PUBLIC", {
  isSecret: false,
});
export const SUPABASE_DIRECT_POSTGRES_URL = getEnv("SUPABASE_DIRECT_POSTGRES_URL", { isSecret: false });

export const MARKER_PROJECT_ID = getEnv("MARKER_PROJECT_ID", {
  isSecret: false,
});

export function getBrowserEnv() {
  return {
    SUPABASE_API_URL,
    SUPABASE_ANON_PUBLIC,
    SUPABASE_DIRECT_POSTGRES_URL,
    POSTHOG_API_HOST,
    POSTHOG_PROJECT_PUBLIC_KEY,
    MARKER_PROJECT_ID,
  };
}

export function isVercel() {
  return VERCEL_URL.includes("vercel.app");
}
