"use client";
import { useState } from "react";
import { Tag, X, Sparkles, ArrowRight } from "lucide-react";
import { PromoCardWidgetConfig } from "../config/content";
import { siteConfig } from "../config/content";
import Link from "next/link";

export default function PromoCardWidget() {
  const [showPromo, setShowPromo] = useState(true);

  if (!showPromo) return null;

  return (
    <>
      {/* Dynamic Promo Card Container */}
      {/* Kept fixed on the bottom-left corner across all screen sizes with a uniform margin */}
      <div className="animate-promo-card fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9998] w-[calc(100%-2rem)] max-w-[288px] sm:w-72 rounded-[18px] overflow-hidden bg-[#FDFCF0] shadow-[0_12px_48px_rgba(6,13,30,0.28),0_2px_8px_rgba(6,13,30,0.18)] font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
        {/* Shimmering Top Accent Line */}
        <div
          className="animate-promo-shimmer h-[3px] bg-[linear-gradient(90deg,rgb(224,148,40)_0%,rgb(245,185,66)_60%,rgb(224,148,40)_100%)] bg-[length:300px_100%] animate-[shimmer_2.5s_linear_infinite]"
          style={{
            animationName: "shimmer",
          }}
        />

        {/* Header Block */}
        <div className="bg-[linear-gradient(135deg,rgb(30,56,114)_0%,rgb(22,43,94)_65%,rgb(15,30,72)_100%)] p-3.5 px-4 pb-3 relative flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            {/* Badge Icon */}
            <div className="w-[38px] h-[38px] rounded-[11px] bg-[linear-gradient(135deg,rgb(224,148,40)_0%,rgb(200,120,24)_100%)] flex items-center justify-center shrink-0">
              <Tag size={17} className="text-white" />
            </div>
            {/* Header Titles */}
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[9px] font-bold tracking-[0.16em] uppercase text-[rgba(224,148,40,0.8)] m-0">
                Limited Time
              </p>
              <p className="font-['Instrument_Serif',Georgia,serif] text-[17px] tracking-[-0.02em] text-[#F5F2ED] m-0 mt-[1px] leading-[1.15]">
                Special Promotion
              </p>
            </div>
          </div>

          {/* Dismiss Action Button */}
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss promo"
            className="w-[26px] h-[26px] p-1.5 rounded-lg bg-[rgba(245,242,237,0.1)] border-none cursor-pointer flex items-center justify-center shrink-0 transition-colors hover:bg-[rgba(245,242,237,0.18)]"
          >
            <X size={13} className="text-[rgba(245,242,237,0.65)]" />
          </button>
        </div>

        {/* Content Block */}
        <div className="p-4 pt-3.5 pb-4 flex flex-col gap-2.5">
          {/* Item Row 1 */}
          <div className="flex items-start gap-2 p-2.5 px-3 rounded-[10px] bg-[rgba(224,148,40,0.08)] border border-[rgba(224,148,40,0.22)]">
            <Sparkles size={13} className="text-[#E09428] shrink-0 mt-[1px]" />

            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] font-extrabold text-[#E09428] m-0 tracking-[-0.01em]">
                {PromoCardWidgetConfig.cards[0].title}
              </p>

              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5A6260] m-0 mt-[2px] leading-[1.45]">
                {PromoCardWidgetConfig.cards[0].text}{" "}
                <strong className="text-[#2D3230] font-bold">
                  {PromoCardWidgetConfig.cards[0].highlight}
                </strong>
                {PromoCardWidgetConfig.cards[0].suffix}
              </p>
            </div>
          </div>

          {/* Item Row 2 */}
          <div className="flex items-start gap-2 p-2.5 px-3 rounded-[10px] bg-[rgba(30,56,114,0.06)] border border-[rgba(30,56,114,0.14)]">
            <Sparkles size={13} className="text-[#1E3872] shrink-0 mt-[1px]" />

            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] font-extrabold text-[#1E3872] m-0 tracking-[-0.01em]">
                {PromoCardWidgetConfig.cards[1].title}
              </p>

              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5A6260] m-0 mt-[2px] leading-[1.45]">
                {PromoCardWidgetConfig.cards[1].text}{" "}
                <strong className="text-[#2D3230] font-extrabold">
                  {PromoCardWidgetConfig.cards[1].highlight}
                </strong>
                {PromoCardWidgetConfig.cards[1].suffix}{" "}
                <strong className="text-[#1E3872] font-extrabold">
                  {PromoCardWidgetConfig.cards[1].highlight2}
                </strong>
                {PromoCardWidgetConfig.cards[1].suffix2}
              </p>
            </div>
          </div>

          {/* CTA Submit Button */}
          <Link
            href={PromoCardWidgetConfig.applyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="flex items-center justify-center gap-[7px] w-full py-[11px] rounded-[11px] bg-[#1E3872] text-[#F5F2ED] font-['Plus_Jakarta_Sans'] text-[13px] font-bold tracking-[0.01em] border-none cursor-pointer shadow-[0_4px_18px_rgba(30,56,114,0.38)] transition-all hover:bg-[#162B5E]"
            >
              {PromoCardWidgetConfig.buttonText}
              <ArrowRight size={13} className="text-white" />
            </button>
          </Link>

          {/* Call Footnote Link */}
          <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[rgba(90,98,96,0.5)] text-center m-0">
            Call us ·{" "}
            <a
              href={siteConfig.tel}
              className="text-[#1E3872] no-underline font-semibold hover:underline"
            >
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
