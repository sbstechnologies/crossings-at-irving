"use client";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";
import FooterLegalBar from "@/app/components/FooterLegalBar";
import { siteConfig } from "@/app/config/content";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <PromoCardWidget />
      <HeaderOther />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-[#1f376d] px-6 pt-32 pb-24 text-white sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80">
        <div className="relative z-10 mx-auto max-w-[1920px]">
          <p className="mb-6 mt-[15px] text-xs font-bold uppercase tracking-[0.3em] text-[#E09428]">
            GET IN TOUCH
          </p>

          <h1 className="font-[Instrument_Serif] text-[56px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED] md:text-[64px]">
            We&apos;d Love to
            <br />
            <span className="italic text-[#E39B2D]">Hear From You</span>
          </h1>

          <p className="mt-8 max-w-2xl font-[Plus_Jakarta_Sans] text-base leading-relaxed text-[#bfc6d6] md:text-lg">
            Ready to make Western Station your home? Our leasing team is
            standing by to answer questions, schedule tours, and walk you
            through the process.
          </p>
        </div>
      </section>

      {/* ==================== CONTACT + TOUR ==================== */}
      <section className="bg-[#f5f2ed] px-6 py-12 font-[Plus_Jakarta_Sans] sm:px-6 md:px-10 md:py-16 lg:px-24 xl:px-40 xxl:px-80">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 xl:grid-cols-[0.9fr_1.25fr] xl:gap-12">
          {/* ==================== LEFT ==================== */}
          <div className="space-y-10">
            {/* ADDRESS */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                ADDRESS
              </p>

              <div className="flex items-start gap-4">
                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-[#1E3872]"
                  strokeWidth={2}
                />

                <div>
                  <h3 className="text-[18px] font-semibold text-[#1f2937]">
                    Crossings at Irving
                  </h3>

                  <p className="mt-1 text-[16px] leading-[1.6] text-[#4b5563]">
                    {siteConfig.address}
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                CONTACT
              </p>

              <div className="space-y-5">
                {/* PHONE */}
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8]">
                    <Phone
                      size={16}
                      className="text-[#1E3872]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#6b7280]">
                      LEASING OFFICE
                    </p>

                    <a
                      href={siteConfig.tel}
                      className="mt-1 inline-block text-[17px] font-semibold text-[#163c84] transition-colors duration-300 hover:text-[#0f2f6b]"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8]">
                    <Mail
                      size={16}
                      className="text-[#1E3872]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#6b7280]">
                      LEASING INQUIRIES
                    </p>

                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 inline-block break-all text-[16px] font-semibold text-[#163c84] transition-colors duration-300 hover:text-[#0f2f6b]"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                OFFICE HOURS
              </p>

              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8]">
                  <Clock size={16} className="text-[#1E3872]" strokeWidth={2} />
                </div>

                <div className="w-full max-w-md space-y-1.5 text-[14px]">
                  <div className="flex justify-between gap-6 text-[#1f2937]">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-[#163c84]">
                      8:30 AM – 5:30 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 text-[#1f2937]">
                    <span>Saturday</span>
                    <span className="font-semibold text-[#163c84]">
                      10:00 AM – 4:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 text-[#1f2937]">
                    <span>Sunday</span>
                    <span className="font-semibold text-[#ef4444]">Closed</span>
                  </div>

                  <p className="pt-2 text-[14px] text-[#4b5563]">
                    Languages: English &amp; Spanish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== TOUR THANK YOU ==================== */}
          <div className="flex items-center justify-center">
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl"
              initial={{
                scale: 0.95,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <div className="h-1.5 bg-gradient-to-r from-[#1f376d] to-[#E39B2D]" />

              <div className="px-6 py-10 text-center md:px-12 md:py-14">
                <div className="mb-5 text-5xl">🎉</div>

                <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                  Thank You for
                  <br />
                  Scheduling Your Tour!
                </h2>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 md:text-xl">
                    We look forward to showing you around Western Station!
                  </p>

                  <p className="mt-3 text-sm text-gray-500 md:text-base">
                    We respond to all inquiries within 1 business day.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mt-10 w-full rounded-2xl bg-[#1f376d] py-4 text-base font-semibold text-white transition hover:bg-[#162a52] md:text-lg"
                >
                  Go Back To Home
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <FooterLegalBar />
    </>
  );
}
