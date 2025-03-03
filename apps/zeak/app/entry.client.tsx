import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import posthog from "posthog-js";
import { POSTHOG_API_HOST, POSTHOG_PROJECT_PUBLIC_KEY } from "~/config/env";
import { defaultNS, fallbackLng, supportedLngs } from "./i18n/i18n";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";

function PosthogInit() {
  useEffect(() => {
    posthog.init(POSTHOG_PROJECT_PUBLIC_KEY, {
      api_host: POSTHOG_API_HOST,
      autocapture: false,
      capture_pageview: false,
    });
  }, []);
  return null;
}

async function main() {
  // Initialize i18next
  await i18next
    .use(initReactI18next)
    .use(Fetch)
    .use(I18nextBrowserLanguageDetector)
    .init({
      defaultNS,
      fallbackLng,
      supportedLngs,
      ns: getInitialNamespaces(),
      detection: {
        order: ["htmlTag"],
        caches: [],
      },
      backend: {
        // loadPath: "/api/locales?lng={{lng}}&ns={{ns}}",
        loadPath: "/api/locales?lng={{lng}}&ns={{ns}}",
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
         
            <PosthogInit />
            <RemixBrowser />
      
        </StrictMode>
      </I18nextProvider>
    );
  });
}

// Call the main function and handle any errors
main().catch(console.error);