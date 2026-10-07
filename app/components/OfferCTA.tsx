type OfferCTAProps = {
  tagline: string;
  title: string;
  subtext: string;
  highlight?: string;
  highlight_text?: string;
  suffix?: string;
  buttonText: string;
  buttonHref: string;
};

export default function OfferCTA({
  tagline,
  title,
  subtext,
  highlight,
  highlight_text,
  suffix,
  buttonText,
  buttonHref,
}: OfferCTAProps) {
  return (
    <section className="mx-auto bg-[#f5f2ed] px-6 pb-14 md:px-20 md:pb-20 lg:px-40 xl:px-40 xxl:px-80">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 rounded-[26px] bg-[#db8d1f] px-8 py-7 md:px-12 md:py-9 lg:flex-row lg:items-center lg:justify-between">
        {/* CONTENT */}
        <div>
          {/* TAGLINE */}
          <p className="mb-4 font-[Plus_Jakarta_Sans] text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            {tagline}
          </p>

          {/* TITLE */}
          <h2 className="font-[Instrument_Serif] text-[38px] leading-[0.95] text-white sm:text-[44px] md:text-[52px]">
            {title}
          </h2>

          {/* OFFER CONTENT */}
          <div className="mt-4 max-w-[900px] font-[Plus_Jakarta_Sans]">
            {/* SUBTEXT */}
            {subtext && (
              <div className="mt-5 inline-flex max-w-[900px] items-center rounded-2xl bg-[#1E3872] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                <p className="font-[Plus_Jakarta_Sans] text-[15px] font-bold leading-6 text-white md:text-[17px]">
                  {subtext}
                </p>
              </div>
            )}

            {/* FLOOR PLAN PRICES */}
            {(highlight || highlight_text) && (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {highlight && (
                  <div className="inline-flex w-fit rounded-xl border border-white/20 bg-white/10 px-4 py-2.5">
                    <span className="text-sm font-bold text-white md:text-[15px]">
                      {highlight}
                    </span>
                  </div>
                )}

                {highlight_text && (
                  <div className="inline-flex w-fit rounded-xl border border-white/20 bg-white/10 px-4 py-2.5">
                    <span className="text-sm font-bold text-white md:text-[15px]">
                      {highlight_text}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* DEADLINE */}
            {suffix && (
              <div className="mt-4 flex items-center gap-2">
                <svg
                  className="h-4 w-4 shrink-0 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>

                <p className="text-sm font-semibold text-white md:text-[15px]">
                  {suffix}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* BUTTON */}
        <div className="shrink-0">
          <a
            href={buttonHref}
            className="inline-flex items-center justify-center rounded-[20px] bg-[#1a3a70] px-8 py-4 font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wide text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#132b54] active:scale-[0.98]"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
