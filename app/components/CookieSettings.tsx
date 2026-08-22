"use client";

import React, { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

interface CookieSettingsProps {
  open: boolean;
  performance: boolean;
  marketing: boolean;
  setPerformance: Dispatch<SetStateAction<boolean>>;
  setMarketing: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
}

export default function CookieSettings({
  open,
  performance,
  marketing,
  setPerformance,
  setMarketing,
  onClose,
  onSave,
  onAcceptAll,
}: CookieSettingsProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        {/* Changed max-w-[616px] to max-w-[460px] for a lighter, smaller width */}
        <div className="relative w-full max-w-[460px] rounded-[20px] bg-[#FFFDF6] px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.15)]">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#213A70] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#162B56]"
          >
            <X size={15} strokeWidth={2} />
          </button>

          {/* Cookie Content */}
          <div className="rounded-[14px] border border-[#E7E5DC] bg-[#F7F6EE] px-4 py-3">
            {/* Title */}
            <h2 className="mb-2.5 text-[15px] font-bold text-[#213A70]">
              Cookies Settings
            </h2>

            {/* Strictly Necessary */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E1DFD7] pb-3">
              <div className="flex-1">
                <h3 className="text-[12px] font-bold text-[#3A3934]">
                  Strictly Necessary Cookies
                </h3>
                <p className="mt-1.5 text-[11px] leading-4 text-[#66645C]">
                  Required for the website to function properly, secure logins,
                  and loading your floor options.
                </p>
              </div>
              <div className="flex min-w-[60px] items-center justify-end pt-0.5">
                <span className="text-right text-[10px] font-bold uppercase leading-3 tracking-wide text-[#D89A2C]">
                  Always
                  <br />
                  Active
                </span>
              </div>
            </div>

            {/* Performance & Analytics */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E1DFD7] py-2.5">
              <div className="flex-1">
                <h3 className="text-[12px] font-bold text-[#3A3934]">
                  Performance &amp; Analytics
                </h3>
                <p className="mt-1.5 text-[11px] leading-4 text-[#66645C]">
                  Helps us understand how visitors interact with the website
                  through tools like Microsoft Clarity so we can improve the
                  user experience.
                </p>
              </div>
              <div className="flex items-center justify-center pt-0.5">
                <Toggle
                  checked={performance}
                  onChange={() => setPerformance((prev) => !prev)}
                />
              </div>
            </div>

            {/* Marketing & Advertising */}
            <div className="flex items-start justify-between gap-4 pt-2.5">
              <div className="flex-1">
                <h3 className="text-[12px] font-bold text-[#3A3934]">
                  Marketing &amp; Advertising
                </h3>
                <p className="mt-1.5 text-[11px] leading-4 text-[#66645C]">
                  Used to track the effectiveness of our leasing advertisements
                  and display relevant promotions to you
                </p>
              </div>
              <div className="flex items-center justify-center pt-0.5">
                <Toggle
                  checked={marketing}
                  onChange={() => setMarketing((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-3 flex gap-2.5">
            <button
              type="button"
              onClick={onAcceptAll}
              className="flex-1 rounded-lg border border-[#213A70] bg-white py-2 text-[12px] font-bold text-[#213A70] transition hover:bg-gray-50"
            >
              Accept All
            </button>

            <button
              type="button"
              onClick={onSave}
              className="flex-[1.4] rounded-lg bg-[#213A70] py-2 text-[12px] font-bold text-white transition hover:bg-[#1B315C]"
            >
              Save Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle cookie setting"
      onClick={onChange}
      className={`relative inline-flex h-[18px] w-[34px] items-center rounded-full border transition-all duration-300 focus:outline-none ${
        checked
          ? "border-[#D89A2C] bg-[#FFFDF6]"
          : "border-[#A6A39A] bg-[#FFFDF6]"
      }`}
    >
      <span
        className={`absolute h-[12px] w-[12px] rounded-full transition-all duration-300 ${
          checked
            ? "translate-x-[17px] bg-[#D89A2C]"
            : "translate-x-[3px] bg-[#A6A39A]"
        }`}
      />
    </button>
  );
}
