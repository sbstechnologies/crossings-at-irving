"use client";

import type { Dispatch, SetStateAction } from "react";
import { lookLeaseSpecial } from "@/app/config/content";

type HeaderTopProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderTop({ show, setShow }: HeaderTopProps) {
  if (!show) return null;

  return (
    <div
      id={lookLeaseSpecial.id}
      className="fixed left-0 top-0 z-50 hidden h-11 w-full items-center justify-center bg-[#D98E2B] px-12 text-white md:flex select-none font-[Plus_Jakarta_Sans]"
    >
      {/* INNER PROMOTIONAL CONTENT */}
      <div className="flex items-center justify-center gap-3 text-[14px] font-semibold tracking-wide">
        <span className="rounded-[6px] bg-white/15 px-3 py-[5px] text-[11px] font-extrabold uppercase tracking-[0.05em] text-white">
          {lookLeaseSpecial.badge}
        </span>
        <span className="text-white/95 font-medium">
          {lookLeaseSpecial.text}
        </span>
      </div>

      {/* DISMISS BUTTON BAR */}
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Close announcement bar"
        className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[6px] bg-white/15 text-white/90 transition duration-150 ease-in-out hover:bg-white/25 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
