"use client";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";
import { siteConfig } from "@/app/config/content";
import FooterLegalBar from "@/app/components/FooterLegalBar";

import LegalContent from "@/app/components/LegalContent";
import HousingVoucher from "@/app/components/HousingVoucher";

export default function Contact() {
  return (
    <>
      <PromoCardWidget />
      <HeaderOther />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#1f376d]  pt-32 pb-24 text-white px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
        <div className="relative z-10 max-w-4xl">
          <p className="text-xs tracking-[0.3em] text-[#E09428] mb-6 mt-[15px] font-bold uppercase">
            LEGAL INFO
          </p>

          <h1 className="font-[Instrument_Serif] text-[56px] md:text-[56px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
            Legal Policies <br />
            <span className="italic text-[#E39B2D]">& Disclosures</span>
          </h1>

          <p className="mt-8 max-w-2xl font-[Plus_Jakarta_Sans] text-base leading-relaxed text-[#bfc6d6] md:text-lg"></p>
        </div>
      </section>

      <LegalContent />

      <HousingVoucher />

      {/* ===== OFFER CTA ===== */}
      <section className="bg-[#f5f2ed] pb-20 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto md:pb-20">
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
