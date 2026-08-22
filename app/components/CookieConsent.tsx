"use client";

import { useEffect, useState } from "react";
import CookieSettings from "@/app/components/CookieSettings";

declare global {
  interface Window {
    Clarity?: {
      consentV2: (consent: {
        analytics_Storage: "granted" | "denied";
        ad_Storage: "granted" | "denied";
      }) => void;
    };
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [performance, setPerformance] = useState(false);
  const [marketing, setMarketing] = useState(false);

  /**
   * Sync Microsoft Clarity Consent Mode
   */
  const updateClarityConsent = (
    performanceConsent: boolean,
    marketingConsent: boolean,
  ) => {
    if (typeof window === "undefined") return;

    window.Clarity?.consentV2({
      analytics_Storage: performanceConsent ? "granted" : "denied",
      ad_Storage: marketingConsent ? "granted" : "denied",
    });
  };

  /**
   * Load previous consent
   */
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShowBanner(true);
      return;
    }

    try {
      const settings = JSON.parse(consent);

      setPerformance(settings.performance ?? false);
      setMarketing(settings.marketing ?? false);

      updateClarityConsent(
        settings.performance ?? false,
        settings.marketing ?? false,
      );
    } catch {
      localStorage.removeItem("cookieConsent");
      setShowBanner(true);
    }
  }, []);

  /**
   * Save Consent
   */
  const saveConsent = (
    necessary: boolean,
    performanceCookies: boolean,
    marketingCookies: boolean,
  ) => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        necessary,
        performance: performanceCookies,
        marketing: marketingCookies,
      }),
    );

    updateClarityConsent(performanceCookies, marketingCookies);

    setPerformance(performanceCookies);
    setMarketing(marketingCookies);

    setShowBanner(false);
    setShowSettings(false);
  };

  /**
   * Accept All Cookies
   */
  const acceptAll = () => {
    saveConsent(true, true, true);
  };

  /**
   * Decline Optional Cookies
   */
  const declineCookies = () => {
    saveConsent(true, false, false);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-[310px] rounded-[18px] border border-[#EBE9E0]/40 bg-[#FFFDF5] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="rounded-xl border border-[#EBE9E0] bg-[#F4F3EA] p-3">
            <h2 className="mb-1 text-xs font-bold text-[#213A70]">
              Cookies Policy
            </h2>

            <p className="text-[10.5px] leading-[1.45] text-[#5C5A52]">
              We use cookies and technologies such as Microsoft Clarity to
              improve your browsing experience, analyze website performance, and
              enhance our services. By selecting{" "}
              <span className="font-semibold">Accept All</span>, you consent to
              the use of all cookies. You can manage your preferences at any
              time.
            </p>

            <a
              href="/legal"
              className="mt-2 inline-block text-[10.5px] font-semibold text-[#213A70] hover:underline"
            >
              View Privacy Policy
            </a>
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={acceptAll}
              className="w-full rounded-[10px] bg-[#213A70] py-2 text-[11px] font-bold text-white transition hover:bg-[#192D59]"
            >
              Accept All Cookies
            </button>

            <button
              onClick={declineCookies}
              className="w-full rounded-[10px] border border-[#213A70] bg-white py-2 text-[11px] font-bold text-[#213A70] transition hover:bg-gray-50"
            >
              Decline Non-Essential Cookies
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full text-center text-[10.5px] font-bold text-[#213A70] transition hover:opacity-80"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      )}

      <CookieSettings
        open={showSettings}
        performance={performance}
        marketing={marketing}
        setPerformance={setPerformance}
        setMarketing={setMarketing}
        onClose={() => setShowSettings(false)}
        onSave={() => saveConsent(true, performance, marketing)}
        onAcceptAll={acceptAll}
      />
    </>
  );
}
