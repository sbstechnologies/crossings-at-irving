type OfferCTAProps = {
  tagline: string;
  title: string;
  subtext: string;
  highlight?: string;
  buttonText: string;
  buttonHref: string;
};

export default function OfferCTA({
  tagline,
  title,
  subtext,
  highlight,
  buttonText,
  buttonHref,
}: OfferCTAProps) {
  return (
    <section className="mx-auto bg-[#f5f2ed] px-6 pb-14 md:px-20 md:pb-20 lg:px-40 xl:px-40 xxl:px-80">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 rounded-[26px] bg-[#db8d1f] px-8 py-7 md:px-12 md:py-9 lg:flex-row lg:items-center lg:justify-between">
        {/* CONTENT */}
        <div>
          <p className="mb-4 font-[Plus_Jakarta_Sans] text-xs font-semibold tracking-[0.3em] text-white/90">
            {tagline}
          </p>

          <h2 className="font-[Instrument_Serif] text-[36px] leading-none text-white md:text-[52px]">
            {title}
          </h2>

          <p className="mt-3 max-w-[900px] font-[Plus_Jakarta_Sans] text-[17px] leading-relaxed text-white md:text-[18px]">
            {subtext}
            {highlight && (
              <span className="block mt-2 font-bold text-[#f5f2ed]">
                {highlight}
              </span>
            )}
          </p>
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
