"use client";

import { useMemo, useState } from "react";
import TourScheduler from "@/app/components/TourScheduler";
import { floorPlansSpecial } from "@/app//config/content";

type BedroomType = "1bed" | "2bed";
type GalleryTab = "photos" | "amenities";

type Plan = {
  title: string;
  bed: string;
  bath: string;
  area: string;
  price: string;
  img: string;
};

type PlanFeatures = {
  highlights: string[];
  kitchen: string[];
  interior: string[];
};

type UnitImages = {
  [key: `gallery${number}`]: string;
  [key: `floor${number}`]: string;
  [key: `home${number}`]: string;
};

type UnitOverviewProps = {
  plans: Record<string, Plan>;
  images: UnitImages;
  planFeatures: PlanFeatures;
  phone?: string;
  applyLink?: string;
  onScheduleTour?: (plan: Plan, planId: string) => void;
};

const bedroomPlans: Record<BedroomType, string[]> = {
  "1bed": ["Florence", "Brescia", "Siena", "Verona"],
  "2bed": ["Venice", "Milan", "Pompeii"],
};

const bedroomDefaults: Record<BedroomType, string> = {
  "1bed": "Florence",
  "2bed": "Venice",
};

const bedroomPricing: Record<BedroomType, string> = {
  "1bed": "$999/mo",
  "2bed": "$1,325/mo",
};

const photoCategories = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
] as const;

const amenityCategories = [
  "Pool",
  "Package Lockers",
  "Dog Park",
  "Covered Parking",
] as const;

export default function UnitOverview({
  plans,
  images,
  planFeatures,
  phone = "(972) 457-0421",
  applyLink = "https://livenjoy.myresman.com/Portal/Access/ApplicantRegistration?accountID=1588",
  onScheduleTour,
}: UnitOverviewProps) {
  const [bedroomType, setBedroomType] = useState<BedroomType>("1bed");

  const [selectedPlan, setSelectedPlan] = useState("A1");

  const [tab, setTab] = useState<GalleryTab>("photos");

  const [previewCategory, setPreviewCategory] =
    useState<(typeof photoCategories)[number]>("Living Room");

  const [amenityCategory, setAmenityCategory] =
    useState<(typeof amenityCategories)[number]>("Pool");

  const [showTourScheduler, setShowTourScheduler] = useState(false);

  const availablePlans = plans ?? {};

  const planIds = useMemo(
    () =>
      bedroomPlans[bedroomType].filter((planId) =>
        Boolean(availablePlans[planId]),
      ),
    [bedroomType, availablePlans],
  );

  const safeSelectedPlan = planIds.includes(selectedPlan)
    ? selectedPlan
    : (planIds[0] ?? "");

  const currentPlan = safeSelectedPlan
    ? availablePlans[safeSelectedPlan]
    : undefined;

  const floorPlanImage = currentPlan?.img || "";

  const interiorPhotos = useMemo(
    () => ({
      "Living Room": "/images/2026/Living Room.webp",
      Bedroom: "/images/2026/Bedroom.webp",
      Kitchen: "/images/2026/Kitchen.webp",
      Bathroom: "/images/2026/Bathroom.webp",
    }),
    [images],
  );

  const amenityPhotos = useMemo(
    () => ({
      Pool: "/images/2026/Pool.webp",
      "Package Lockers": "/images/2026/Package Lockers.webp",
      "Dog Park": "/images/2026/Dog Park.webp",
      "Covered Parking": "/images/2026/Covered Parking.webp",
    }),
    [images],
  );

  const galleryImage =
    tab === "photos"
      ? interiorPhotos[previewCategory]
      : amenityPhotos[amenityCategory];

  const galleryAlt =
    tab === "photos"
      ? `${previewCategory} at Crossings at Irving in Irving, Texas`
      : `${amenityCategory} at Crossings at Irving in Irving, Texas`;

  const handleBedroomChange = (type: BedroomType) => {
    const availablePlanIds = bedroomPlans[type].filter((planId) =>
      Boolean(availablePlans[planId]),
    );

    setBedroomType(type);
    setSelectedPlan(availablePlanIds[0] ?? bedroomDefaults[type]);
  };

  const handleScheduleTour = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onScheduleTour && currentPlan && safeSelectedPlan) {
      onScheduleTour(currentPlan, safeSelectedPlan);
      return;
    }

    setShowTourScheduler(true);
  };

  if (!currentPlan || !safeSelectedPlan) {
    return (
      <section id="unit" className="bg-[#f5f2ee] px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-[Plus_Jakarta_Sans] text-sm text-[#5a6260]">
            No floor plan is currently available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="unit"
      className="mx-auto overflow-x-hidden bg-[#f5f2ee] px-6 pb-10 pt-24 xs:px-6 sm:px-6 sm:pb-12 sm:pt-28 md:px-20 md:pb-16 md:pt-32 lg:px-40 xl:px-40 xxl:px-80"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <p className="mb-2 font-[Plus_Jakarta_Sans] text-[11px] font-semibold uppercase tracking-[2px] text-[#50627a] sm:mb-3 sm:text-xs sm:tracking-[3px]">
              UNIT OVERVIEW
            </p>

            <h2 className="font-[Instrument_Serif] text-[30px] leading-[0.95] text-[#2d3230] sm:text-[46px] md:text-[64px]">
              Find Your Perfect Home
            </h2>
          </div>

          <p className="max-w-[760px] font-[Plus_Jakarta_Sans] text-[15px] leading-relaxed text-[#5a6260] sm:text-base md:pt-2 md:text-[18px]">
            Our collection of community amenities makes every day at Crossings
            at Irving relaxing and convenient. Unwind by our sparkling swimming
            pool, enjoy outdoor matches on the sports courts, let your pup play
            in the dedicated pet park, or take advantage of hassle-free on-site
            resident services.
          </p>
        </div>

        {/* =====================================================
            PROMOTION
        ===================================================== */}

        {/* =====================================================
            PROMOTION
        ===================================================== */}

        <div className="mt-8 flex flex-col gap-4 rounded-[16px] bg-gradient-to-br from-[#e09428] to-[#c87818] p-4 shadow-[0_4px_28px_rgba(224,148,40,0.45)] sm:flex-row sm:items-center sm:justify-between sm:p-[14px_24px]">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="w-fit shrink-0 rounded-full border border-[#f5f2ee]/35 bg-[#f5f2ee]/20 px-3 py-1">
              <span className="font-[Plus_Jakarta_Sans] text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5f2ee]">
                {floorPlansSpecial.badge}
              </span>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="px-1 font-[Instrument_Serif] text-[20px] leading-none tracking-[-0.02em] text-[#f5f2ee]">
                {floorPlansSpecial.headline}
              </span>

              {floorPlansSpecial.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-[#f5f2ee]/15 px-3 py-1 font-[Plus_Jakarta_Sans] text-xs font-semibold text-[#f5f2ee]/90 sm:text-[13px]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <a
            href={floorPlansSpecial.tel}
            aria-label={`Call Highland Park Apartment Homes at ${floorPlansSpecial.phone}`}
            className="inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#f5f2ee] px-5 py-2.5 font-[Plus_Jakarta_Sans] text-[13px] font-bold text-[#a85e48] shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span aria-hidden="true">☎</span>
            {floorPlansSpecial.phone}
          </a>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mt-6 flex flex-col gap-4 font-[Plus_Jakarta_Sans] xl:flex-row xl:items-center xl:justify-between">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {(["1bed", "2bed"] as BedroomType[]).map((type) => {
              const active = bedroomType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleBedroomChange(type)}
                  className={`min-w-0 rounded-[18px] border px-3 py-3 text-left transition sm:min-w-[145px] sm:px-5 sm:py-4 ${
                    active
                      ? "border-[#1e3872] bg-[#1e3872] text-white shadow-[0_8px_20px_rgba(30,56,114,0.22)]"
                      : "border-[#d7d1c7] bg-[#ece8e1] text-[#2d3230] hover:border-[#1e3872]/30"
                  }`}
                >
                  <span className="block text-[13px] font-semibold sm:text-[16px]">
                    {type === "1bed" ? "1 Bedroom" : "2 Bedrooms"}
                  </span>

                  <span className="mt-1 block text-[10px] opacity-85 sm:text-[13px]">
                    {bedroomPricing[type]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {planIds.map((planId) => {
              const plan = availablePlans[planId];

              if (!plan) return null;

              const active = selectedPlan === planId;

              return (
                <button
                  key={planId}
                  type="button"
                  onClick={() => setSelectedPlan(planId)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-xs transition sm:px-5 sm:py-3 sm:text-sm ${
                    active
                      ? "border-[#1e3872] bg-white font-semibold text-[#1e3872]"
                      : "border-[#cfc8bc] bg-transparent text-[#5a6260] hover:border-[#1e3872]/40"
                  }`}
                >
                  <span className="font-semibold">
                    {plan.title.split("·")[0].trim()}
                  </span>

                  <span className="ml-2">{plan.area} sq ft</span>

                  <span className="ml-2 font-semibold">{plan.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MAIN CARDS
        ===================================================== */}

        <div className="mt-6 grid items-stretch gap-5 sm:gap-7 xl:grid-cols-[1.55fr_1fr]">
          {/* =================================================
              FLOOR PLAN
          ================================================= */}

          <div className="overflow-hidden rounded-[20px] border border-[#ddd7cc] bg-[#fbfaf7] shadow-[0_2px_8px_rgba(26,29,27,0.04)] sm:rounded-[26px]">
            <div className="flex items-start justify-between gap-4 border-b border-[#ddd7cc] px-5 py-4 sm:px-6 sm:py-5 md:px-7">
              <div>
                <p className="mb-2 font-[Plus_Jakarta_Sans] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5f6981]">
                  {currentPlan.title}
                </p>

                <h3 className="font-[Instrument_Serif] text-[24px] leading-none text-[#2d3230] sm:text-[28px] md:text-[36px]">
                  {currentPlan.bed}, {currentPlan.bath}
                </h3>
              </div>

              <div className="shrink-0 rounded-full bg-[#1e3872] px-4 py-2.5 font-[Plus_Jakarta_Sans] text-[16px] font-semibold text-white shadow-[0_8px_18px_rgba(30,56,114,0.22)] sm:px-6 sm:py-3 sm:text-[18px]">
                {currentPlan.price}
              </div>
            </div>

            <div className="relative h-[260px] border-b border-[#ddd7cc] bg-white sm:h-[360px] lg:h-[500px]">
              {floorPlanImage ? (
                <img
                  src={floorPlanImage}
                  alt={`${currentPlan.title} floor plan at Crossings at Irving`}
                  className="h-full w-full object-contain p-4 sm:p-6 md:p-8"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <p className="font-[Plus_Jakarta_Sans] text-sm text-[#6b7280]">
                    Floor plan image unavailable.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 border-b border-[#ddd7cc] sm:grid-cols-4">
              {[
                ["Bedroom", currentPlan.bed],
                ["Bathroom", currentPlan.bath],
                ["Area", currentPlan.area],
                ["Available", "Available Now"],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`border-[#ddd7cc] py-4 text-center sm:py-5 ${
                    index < 3 ? "border-r" : ""
                  } ${index >= 2 ? "border-t sm:border-t-0" : ""}`}
                >
                  <p className="font-[Instrument_Serif] text-[18px] text-[#2d3230] sm:text-[20px]">
                    {value}
                  </p>

                  <p className="mt-1 font-[Plus_Jakarta_Sans] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#50627a] sm:text-[11px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* =================================================
                PLAN FEATURES
            ================================================= */}

            <div className="px-5 py-4 font-[Plus_Jakarta_Sans] sm:px-6 sm:py-5 md:px-7">
              <p className="mb-4 font-[Plus_Jakarta_Sans] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#50627a]">
                Plan Features
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {[
                  ["Highlights", planFeatures.highlights],
                  ["Kitchen", planFeatures.kitchen],
                  ["Interior", planFeatures.interior],
                ].map(([title, items]) => (
                  <div key={String(title)}>
                    <p className="mb-3 font-[Plus_Jakarta_Sans] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1e3872]">
                      {title}
                    </p>

                    <ul className="list-inside list-disc space-y-2 text-[13px] text-[#5a6260] sm:text-[14px]">
                      {(items as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
              GALLERY / AMENITIES
          ================================================= */}

          <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#ddd7cc] bg-[#fbfaf7] font-[Plus_Jakarta_Sans] shadow-[0_2px_8px_rgba(26,29,27,0.04)] sm:rounded-[26px]">
            {/* Tabs */}

            <div className="border-b border-[#ddd7cc] bg-[#f3f0ea] p-3">
              <div className="grid grid-cols-2 rounded-[18px] bg-[#eceff3] p-1">
                {(["photos", "amenities"] as GalleryTab[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTab(item)}
                    className={`rounded-[14px] py-2.5 text-[14px] font-semibold transition sm:py-3 sm:text-[15px] ${
                      tab === item
                        ? "bg-[#1e3872] text-white shadow-[0_4px_12px_rgba(30,56,114,0.18)]"
                        : "text-[#5a6260]"
                    }`}
                  >
                    {item === "photos" ? "Interior Photos" : "Amenities"}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}

            <div className="border-b border-[#ddd7cc] bg-[#fbfaf7] px-3 py-3 sm:px-4">
              <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tab === "photos"
                  ? photoCategories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPreviewCategory(item)}
                        className={`shrink-0 rounded-full border px-4 py-2.5 text-[13px] transition sm:px-6 sm:py-3 sm:text-[15px] ${
                          previewCategory === item
                            ? "border-[#1e3872] bg-[#1e3872] text-white"
                            : "border-[#cbd2d9] bg-[#eceff3] text-[#5a6260]"
                        }`}
                      >
                        {item}
                      </button>
                    ))
                  : amenityCategories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setAmenityCategory(item)}
                        className={`shrink-0 rounded-full border px-4 py-2.5 text-[13px] transition sm:px-6 sm:py-3 sm:text-[15px] ${
                          amenityCategory === item
                            ? "border-[#1e3872] bg-[#1e3872] text-white"
                            : "border-[#cbd2d9] bg-[#eceff3] text-[#5a6260]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
              </div>
            </div>

            {/* Gallery Image */}

            <div className="relative min-h-[320px] flex-1 overflow-hidden bg-[#ece8e1] sm:min-h-[420px]">
              {galleryImage ? (
                <img
                  src={galleryImage}
                  alt={galleryAlt}
                  className="h-full min-h-[320px] w-full object-cover sm:min-h-[420px]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center px-6 text-center sm:min-h-[420px]">
                  <p className="font-[Plus_Jakarta_Sans] text-sm text-[#6b7280]">
                    Image unavailable.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}

            <div className="border-t border-[#ddd7cc] bg-[#fbfaf7] px-4 py-4 sm:px-6 sm:py-5">
              <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2">
                <a
                  href="#"
                  onClick={handleScheduleTour}
                  className="w-full rounded-full border border-[#1e3872] px-5 py-3.5 text-center text-[14px] font-semibold text-[#1e3872] transition hover:bg-[#f2f5fb] sm:py-4 sm:text-[15px]"
                >
                  Schedule a Tour
                </a>

                <a
                  href={applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-[#1e3872] px-5 py-3.5 text-center text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(30,56,114,0.18)] transition hover:bg-[#15306a] sm:py-4 sm:text-[15px]"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TOUR SCHEDULER
      ===================================================== */}

      <TourScheduler
        open={showTourScheduler}
        onClose={() => setShowTourScheduler(false)}
      />
    </section>
  );
}
