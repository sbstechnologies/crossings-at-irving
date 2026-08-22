"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { siteConfig } from "@/app/config/content";
import { gtmEvent } from "@/app/lib/gtm";
import ThankYouDialog from "@/app/components/ThankYouDialog";

export default function SendMessage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: formData.get("fullName")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      phone: formData.get("phone")?.toString().trim() ?? "",
      resident:
        formData.get("resident")?.toString().trim() ?? "Current Resident",
      subject: formData.get("subject")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
    };

    // Validation
    if (!data.fullName || !data.email || !data.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (data.phone && !/^[0-9+\-\s()]{8,15}$/.test(data.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send message.");
      }

      // GTM Event (fires only after successful submission)
      try {
        gtmEvent("contact_form_submit", {
          form_name: "Contact Form",
          full_name: data.fullName,
          resident: data.resident,
          subject: data.subject,
          page_path:
            typeof window !== "undefined" ? window.location.pathname : "",
        });
      } catch (err) {
        console.warn("GTM Event Error:", err);
      }

      toast.success("Your message has been sent successfully!");

      form.reset();

      if (data.resident === "Future Resident") {
        router.push("/thankyou");
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-[26px] border border-[#e4e1db] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="h-1 w-full bg-gradient-to-r from-[#1E3872] to-[#E39B2D]" />

        <div className="p-6 md:p-10 lg:p-12 xl:p-12 xxl:p-20">
          <h2 className="font-[Instrument_Serif] text-[30px] leading-[1.1] text-[#1f2937] md:text-[40px]">
            Send Us a Message
          </h2>

          <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-[#4b5563]">
            Questions about availability, pricing, or scheduling a tour? We're
            here to help.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                  FULL NAME *
                </label>

                <input
                  name="fullName"
                  type="text"
                  placeholder="Your Name"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                  EMAIL ADDRESS *
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                  PHONE NUMBER
                </label>

                <input
                  name="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                  I AM A...
                </label>

                <select
                  name="resident"
                  disabled={loading}
                  defaultValue="Current Resident"
                  className="w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
                >
                  <option value="Current Resident">Current Resident</option>
                  <option value="Future Resident">Future Resident</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                  SUBJECT
                </label>

                <select
                  name="subject"
                  disabled={loading}
                  defaultValue="Schedule a Tour"
                  className="w-full rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
                >
                  <option value="Schedule a Tour">Schedule a Tour</option>
                  <option value="Pricing & Availability">
                    Pricing & Availability
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
              <label className="mb-2 block text-[12px] font-semibold tracking-[0.12em] text-[#4b5563]">
                MESSAGE *
              </label>

              <textarea
                name="message"
                rows={6}
                required
                disabled={loading}
                placeholder="Tell us what you're looking for..."
                className="w-full resize-none rounded-xl border border-[#cfd6e2] bg-white px-4 py-3 text-[15px] text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#1E3872] focus:ring-2 focus:ring-[#1E3872]/10"
              />
            </div>

            <p className="text-justify text-[13px] leading-5 text-gray-500">
              By providing your phone number, you agree to receive text messages
              from Crossings at Irving regarding leasing and maintenance.
              Message & data rates may apply. Reply STOP to opt out. View our{" "}
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
              disabled={loading}
              className={`w-full rounded-xl py-4 text-[16px] font-semibold text-white transition-all duration-300 ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#1E3872] hover:bg-[#162b59]"
              }`}
            >
              {loading ? "Sending Message..." : "→ Submit Message"}
            </button>

            <p className="text-center text-[12px] text-[#9aa3b2] md:text-[13px]">
              We respond to all inquiries within 1 business day.{" "}
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
