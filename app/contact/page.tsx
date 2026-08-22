"use client";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";
import { siteConfig } from "@/app/config/content";
import FooterLegalBar from "@/app/components/FooterLegalBar";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import SendMessage from "@/app/components/SendMessage";

export default function Contact() {
  return (
    <>
      <PromoCardWidget />
      <HeaderOther />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#1f376d]  pt-32 pb-24 text-white px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
        <div className="relative z-10 max-w-4xl">
          <p className="text-xs tracking-[0.3em] text-[#E09428] mb-6 mt-[15px] font-bold uppercase">
            GET IN TOUCH
          </p>

          <h1 className="font-[Instrument_Serif] text-[56px] md:text-[56px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
            We'd Love to <br />
            <span className="italic text-[#E39B2D]">Hear From You</span>
          </h1>

          <p className="mt-8 max-w-2xl font-[Plus_Jakarta_Sans] text-base leading-relaxed text-[#bfc6d6] md:text-lg">
            Have questions about our floor plans, amenities, or current lease
            specials?
            <br />
            Our dedicated leasing team is here to help you find your perfect new
            home in Euless Worth.
          </p>
        </div>
      </section>

      {/* ===== CONTACT DETAILS + FORM ===== */}
      <section className="bg-[#f5f2ed] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-12 font-[Plus_Jakarta_Sans] md:px-10 lg:px-24 md:py-16">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 xl:grid-cols-[0.9fr_1.25fr] xl:gap-12">
          {/* LEFT */}
          <div className="space-y-10">
            {/* ADDRESS */}
            <div>
              <p className="mb-4 font-[Plus_Jakarta_Sans] text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                ADDRESS
              </p>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-xl text-[#1E3872]">
                  <MapPin
                    size={16}
                    className="shrink-0 mt-[2px] text-[#1E3872]"
                    strokeWidth={2}
                  />
                </div>

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
              <p className="mb-4 font-[Plus_Jakarta_Sans] text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                CONTACT
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8] text-sm text-[#1E3872]">
                    <Phone
                      size={16}
                      className="shrink-0 text-[#1E3872]"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#6b7280]">
                      LEASING OFFICE
                    </p>

                    <a
                      href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                      className="mt-1 inline-block cursor-pointer text-[17px] font-semibold text-[#163c84] transition-colors duration-300 hover:text-[#0f2f6b]  hover:translate-x-0.5"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8] text-sm text-[#1E3872]">
                    <Mail
                      size={16}
                      className="shrink-0 text-[#1E3872]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#6b7280]">
                      LEASING INQUIRIES
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 inline-block break-all text-[16px] font-semibold text-[#163c84] transition-colors duration-300 hover:text-[#0f2f6b]  hover:translate-x-0.5"
                    >
                      {siteConfig.email}
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div>
              <p className="mb-4 font-[Plus_Jakarta_Sans] text-xs font-semibold tracking-[0.3em] text-[#E39B2D]">
                OFFICE HOURS
              </p>

              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#cfd6e2] bg-[#eef2f8] text-sm text-[#1E3872]">
                  <Clock
                    size={16}
                    className="shrink-0 text-[#1E3872]"
                    strokeWidth={2}
                  />
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
                    Languages: English & Spanish
                  </p>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="overflow-hidden rounded-[24px] border border-[#cfd6e2] bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl lg:aspect-[16/8]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `Crossings at Irving, ${siteConfig.address}`,
                  )}&output=embed`}
                  title="Crossings at Irving location map"
                  className="h-[350px] w-full border-0 md:h-[450px]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl text-[#1E3872]">
                    <MapPin
                      size={16}
                      className="shrink-0 mt-[2px] text-[#1E3872]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-[#1f2937]">
                      Crossings at Irving
                    </h3>

                    <p className="mt-1 text-[12px] leading-[1.6] text-[#4b5563]">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/MmCPanJEJbhYUTTf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#1E3872] px-4 py-2 text-[13px] font-semibold text-center text-white transition hover:bg-[#162c5a]"
                >
                  Open Map
                </a>
              </div>
            </div>
          </div>
          <SendMessage />
        </div>
      </section>

      {/* ===== OFFER CTA ===== */}
      <section className="bg-[#f5f2ed] pb-14 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-automd:pb-20">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 rounded-[26px] bg-[#db8d1f] px-8 py-7 md:px-12 md:py-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/90">
              LIMITED TIME OFFER
            </p>

            <h2 className="font-[Instrument_Serif] text-[36px] leading-none text-white md:text-[52px]">
              Look & Lease Special
            </h2>

            <p className="font-[Plus_Jakarta_Sans] mt-3 text-[17px] text-white md:text-[18px]">
              Act fast to get our <span className="font-bold">best rates</span>{" "}
              while they last. Contact us for current details today!
            </p>
          </div>

          {/* STYLED BUTTON CONTAINER TO MATCH ATTACHED DESIGN */}
          <div className="shrink-0">
            <a
              href={siteConfig.tel}
              className="inline-block rounded-[20px] bg-[#1a3a70] px-8 py-4 font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wide text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-200 hover:bg-[#132b54] hover:scale-[1.02] active:scale-[0.98]"
            >
              Call Now: {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <FooterLegalBar />
    </>
  );
}
