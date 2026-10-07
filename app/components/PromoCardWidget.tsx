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
        <div className="flex flex-col gap-3 p-4 pt-3.5">
          {/* OFFER CARD 1 */}
          <div className="group rounded-[14px] border border-[#E09428]/20 bg-[#E09428]/[0.07] p-3.5 transition-all duration-300 hover:-translate-y-[1px] hover:border-[#E09428]/30 hover:bg-[#E09428]/[0.10]">
            <div className="flex items-start gap-3">
              <div className="mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E09428]/10">
                <Sparkles
                  size={14}
                  strokeWidth={2.2}
                  className="text-[#E09428]"
                />
              </div>

              <div className="min-w-0">
                <p className="m-0 font-['Plus_Jakarta_Sans'] text-[12px] font-extrabold tracking-[-0.01em] text-[#C97816]">
                  {PromoCardWidgetConfig.cards[0].title}
                </p>

                <p className="m-0 mt-1 font-['Plus_Jakarta_Sans'] text-[10px] leading-[1.55] text-[#5A6260]">
                  {PromoCardWidgetConfig.cards[0].text}

                  <span className="mt-1.5 block font-bold text-[#252A28]">
                    {PromoCardWidgetConfig.cards[0].highlight}
                    <br />
                    {PromoCardWidgetConfig.cards[0].highlight_text}
                  </span>

                  <span className="mt-1 block text-[#5A6260]">
                    {PromoCardWidgetConfig.cards[0].suffix}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* OFFER CARD 2 */}
          <div className="group rounded-[14px] border border-[#1E3872]/15 bg-[#1E3872]/[0.055] p-3.5 transition-all duration-300 hover:-translate-y-[1px] hover:border-[#1E3872]/25 hover:bg-[#1E3872]/[0.08]">
            <div className="flex items-start gap-3">
              <div className="mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1E3872]/10">
                <Sparkles
                  size={14}
                  strokeWidth={2.2}
                  className="text-[#1E3872]"
                />
              </div>

              <div className="min-w-0">
                <p className="m-0 font-['Plus_Jakarta_Sans'] text-[12px] font-extrabold tracking-[-0.01em] text-[#1E3872]">
                  {PromoCardWidgetConfig.cards[1].title}
                </p>

                <p className="m-0 mt-1 font-['Plus_Jakarta_Sans'] text-[10px] leading-[1.55] text-[#5A6260]">
                  {PromoCardWidgetConfig.cards[1].text}

                  <span className="mt-1.5 block font-bold text-[#252A28]">
                    {PromoCardWidgetConfig.cards[1].highlight}
                    <br />
                    {PromoCardWidgetConfig.cards[1].highlight_text}
                  </span>

                  <span className="mt-1 block font-bold text-[#1E3872]">
                    {PromoCardWidgetConfig.cards[1].suffix}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={PromoCardWidgetConfig.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
      group mt-1 flex w-full items-center justify-center gap-2
      rounded-[12px]
      bg-[#1E3872]
      px-4 py-3
      font-['Plus_Jakarta_Sans']
      text-[12px] font-bold tracking-[0.02em]
      text-[#F5F2ED] no-underline
      shadow-[0_6px_20px_rgba(30,56,114,0.28)]
      transition-all duration-300
      hover:-translate-y-[1px]
      hover:bg-[#162B5E]
      hover:shadow-[0_8px_24px_rgba(30,56,114,0.36)]
      active:translate-y-0
    "
          >
            <span>{PromoCardWidgetConfig.buttonText}</span>

            <ArrowRight
              size={14}
              strokeWidth={2.3}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* PHONE */}
          <p className="m-0 pt-0.5 text-center font-['Plus_Jakarta_Sans'] text-[10px] text-[#8A918E]">
            Call us <span className="mx-1 text-[#C5C9C7]">·</span>
            <a
              href={siteConfig.tel}
              className="font-semibold text-[#1E3872] no-underline transition-colors hover:text-[#162B5E] hover:underline"
            >
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
