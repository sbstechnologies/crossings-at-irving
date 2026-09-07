"use client";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";
import { lookLeaseOffer, siteConfig } from "@/app/config/content";
import FooterLegalBar from "@/app/components/FooterLegalBar";

import LegalContent from "@/app/components/LegalContent";
import HousingVoucher from "@/app/components/HousingVoucher";
import OfferCTA from "@/app/components/OfferCTA";

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
      <OfferCTA
        tagline={lookLeaseOffer.tagline}
        title={lookLeaseOffer.title}
        subtext={lookLeaseOffer.subtext}
        highlight={lookLeaseOffer.highlight}
        buttonText={lookLeaseOffer.buttonText}
        buttonHref={lookLeaseOffer.buttonHref}
      />

      <Footer />

      <FooterLegalBar />
    </>
  );
}
