"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { toast } from "react-hot-toast";

import { siteConfig } from "@/app/config/content";
import { gtmEvent } from "@/app/lib/gtm";
import ThankYouDialog from "@/app/components/ThankYouDialog";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function SendMessage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    if (!turnstileSiteKey) {
      toast.error(
        "Security verification is not configured. Please try again later.",
      );
      return;
    }

    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = String(formData.get("website") ?? "").trim();

    if (website) {
      toast.error("Unable to submit this request.");
      return;
    }

    const data = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      resident: String(formData.get("resident") ?? "Future Resident").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website,
      turnstileToken,
    };

    if (!data.fullName || !data.email || !data.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (data.phone && !/^[0-9+\-\s()]{8,20}$/.test(data.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "Failed to send message.",
        );
      }

      try {
        gtmEvent("contact_form_submit", {
          form_name: "Contact Form",
          full_name: data.fullName,
          resident: data.resident,
          subject: data.subject,
          page_path: window.location.pathname,
        });
      } catch (error) {
        console.warn("GTM event error:", error);
      }

      toast.success("Your message has been sent successfully!");
      form.reset();
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);

      if (data.resident === "Future Resident") {
        router.push("/thankyou");
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );

      // Turnstile tokens are single-use; request a fresh token after failure.
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10";

  return (
    <>
      <div className="overflow-hidden rounded-[26px] border border-[#e4e1db] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="h-1 w-full bg-linear-to-r from-[#1E3872] to-[#E39B2D]" />

        <div className="p-6 md:p-10 lg:p-12 xl:p-12 xxl:p-20">
          <h2 className="font-[Instrument_Serif] text-[30px] leading-[1.1] text-[#1f2937] md:text-[40px]">
            Send Us a Message
          </h2>

          <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-[#4b5563]">
            Questions about availability, pricing, or scheduling a tour?
            We&apos;re here to help.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Honeypot field: real visitors should leave this empty. */}
            <div
              aria-hidden="true"
              className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
                >
                  FULL NAME *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your Name"
                  required
                  disabled={loading}
                  autoComplete="name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  required
                  disabled={loading}
                  autoComplete="email"
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
                >
                  PHONE NUMBER
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  disabled={loading}
                  autoComplete="tel"
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="resident"
                  className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
                >
                  I AM A...
                </label>
                <select
                  id="resident"
                  name="resident"
                  disabled={loading}
                  defaultValue="Future Resident"
                  className={inputClassName}
                >
                  <option value="Future Resident">Future Resident</option>
                  <option value="Current Resident">Current Resident</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
                >
                  SUBJECT
                </label>
                <select
                  id="subject"
                  name="subject"
                  disabled={loading}
                  defaultValue="Schedule a Tour"
                  className={inputClassName}
                >
                  <option value="Schedule a Tour">Schedule a Tour</option>
                  <option value="Pricing & Availability">
                    Pricing &amp; Availability
                  </option>
                  <option value="Pet Policy">Pet Policy</option>
                  <option value="Maintenance Request">
                    Maintenance Request
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]"
              >
                MESSAGE *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                disabled={loading}
                placeholder="Tell us what you're looking for..."
                className={`${inputClassName} resize-none`}
              />
            </div>
            <div className="w-full min-w-0">
              {turnstileSiteKey ? (
                <div className="flex w-full min-w-0 justify-start overflow-hidden">
                  <div className="w-full min-w-0">
                    <Turnstile
                      key={turnstileResetKey}
                      siteKey={turnstileSiteKey}
                      options={{
                        theme: "light",
                        size: "flexible",
                      }}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => {
                        setTurnstileToken("");
                        toast.error(
                          "Security verification failed. Please try again.",
                        );
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-5 text-red-600">
                  Security verification is temporarily unavailable.
                </p>
              )}
            </div>
            <p className="text-justify text-[13px] leading-5 text-gray-500">
              By providing your phone number, you agree to receive text messages
              from Crossings at Irving regarding leasing and maintenance.
              Message &amp; data rates may apply. Reply STOP to opt out. View
              our{" "}
              <Link
                href="/legal"
                className="font-semibold text-gray-600 transition-colors hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <button
              type="submit"
              disabled={loading || !turnstileToken || !turnstileSiteKey}
              className={`w-full rounded-xl py-4 text-[16px] font-semibold text-white transition-all duration-300 ${
                loading || !turnstileToken || !turnstileSiteKey
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#1E3872] hover:bg-[#162b59]"
              }`}
            >
              {loading ? "Sending Message..." : "→ Submit Message"}
            </button>

            <p className="flex flex-col items-center justify-center gap-1 text-center text-[11px] leading-5 text-[#9aa3b2] xs:text-xs sm:flex-row sm:flex-wrap sm:gap-2 sm:text-[13px] md:text-sm lg:text-sm xl:text-base 2xl:text-base">
              <span>We respond to all inquiries within 1 business day.</span>

              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="font-semibold text-gray-600 transition-colors hover:text-gray-900"
              >
                {siteConfig.phone}
              </a>
            </p>
          </form>
        </div>
      </div>

      <ThankYouDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </>
  );
}
