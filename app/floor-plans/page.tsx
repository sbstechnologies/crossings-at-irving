"use client";

import HeaderOther from "@/app/components/HeaderOther";
import PromoCardWidget from "@/app/components/PromoCardWidget";
import Footer from "@/app/components/Footer";
import FooterLegalBar from "@/app/components/FooterLegalBar";

import { Bed, Bath, MoveUpRight } from "lucide-react";

import { useMemo, useState } from "react";

import {
  images,
  floorPlans,
  type FloorPlan,
  headerConfig,
} from "@/app/config/content";

// ============================================================
// TYPES
// ============================================================

type CardProps = {
  plan: FloorPlan;
  isSelected: boolean;
  canSelectMore: boolean;
  onToggleCompare: (title: string) => void;
  onViewDetail: (plan: FloorPlan) => void;
};

// ============================================================
// IMAGE ALT HELPERS
// ============================================================

function getFloorPlanAlt(plan: FloorPlan): string {
  const title = plan.title.toLowerCase();

  if (title.includes("florence")) {
    return "Florence one bedroom one bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("brescia")) {
    return "Brescia one bedroom one bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("siena")) {
    return "Siena one bedroom one bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("verona")) {
    return "Verona one bedroom one bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("venice")) {
    return "Venice two bedroom one bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("milan")) {
    return "Milan two bedroom two bath apartment floor plan at Crossings at Irving";
  }

  if (title.includes("pompeii")) {
    return "Pompeii two bedroom two bath apartment floor plan at Crossings at Irving";
  }

  return `${plan.title} floor plan at Crossings at Irving`;
}

function getInteriorAlt(plan: FloorPlan): string {
  return `${plan.title} apartment interior at Crossings at Irving in Irving, Texas`;
}

// ============================================================
// FLOOR PLAN CARD
// ============================================================

function Card({
  plan,
  isSelected,
  canSelectMore,
  onToggleCompare,
  onViewDetail,
}: CardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const interiorImages = plan.interiorImages?.length
    ? plan.interiorImages
    : plan.images;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % interiorImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? interiorImages.length - 1 : prev - 1,
    );
  };

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e5ded3] bg-[#fffdf9] shadow-[0_18px_45px_rgba(26,29,27,0.12)]">
      {/* ======================================================
          INTERIOR IMAGE
      ====================================================== */}

      <div className="relative h-[275px] w-full overflow-hidden rounded-t-[26px]">
        <img
          src={interiorImages[currentImage]}
          alt={getInteriorAlt(plan)}
          className="h-full w-full object-cover"
        />

        {/* Premium */}
        {plan.popular && (
          <div className="absolute left-4 top-4 rounded-full bg-[#E09428] px-4 py-2 font-[Plus_Jakarta_Sans] text-[12px] font-bold text-white shadow-md">
            Featured
          </div>
        )}

        {/* Availability */}
        <div className="absolute right-4 top-4 rounded-full bg-[#2f3642]/95 px-4 py-2 font-[Plus_Jakarta_Sans] text-[13px] font-bold text-white shadow-md">
          {plan.available}
        </div>

        {/* Previous */}
        {interiorImages.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={prevImage}
            className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-[24px] leading-none text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            ‹
          </button>
        )}

        {/* Next */}
        {interiorImages.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={nextImage}
            className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-[24px] leading-none text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            ›
          </button>
        )}

        {/* Dots */}
        {interiorImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {interiorImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`View image ${index + 1}`}
                onClick={() => setCurrentImage(index)}
                className={`rounded-full transition-all ${
                  currentImage === index
                    ? "h-[7px] w-[23px] bg-white"
                    : "h-[7px] w-[7px] bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ======================================================
          FLOOR PLAN
      ====================================================== */}

      <div className="relative h-[355px] w-full border-b border-[#eee7dc] bg-[#fbfaf7]">
        <img
          src={plan.images[0]}
          alt={getFloorPlanAlt(plan)}
          className="h-full w-full object-contain p-8"
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="bg-[#fffdf9] px-6 pb-7 pt-7 md:px-7">
        <p className="mb-2 font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.22em] text-[#E09428]">
          {plan.series}
        </p>

        <h3 className="font-[Instrument_Serif] text-[31px] leading-none tracking-[-0.02em] text-[#111827]">
          {plan.title}
        </h3>

        <p className="mt-5 min-h-[48px] font-[Plus_Jakarta_Sans] text-[16px] leading-[1.45] tracking-[-0.02em] text-[#314057]">
          {plan.description}
        </p>

        {/* Specs */}
        <div className="mt-6 flex flex-wrap items-center gap-6 font-[Plus_Jakarta_Sans] text-[15px] font-bold text-[#15191f]">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-[#1f376d]" strokeWidth={2} />
            <span>{plan.beds}</span>
          </div>

          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-[#1f376d]" strokeWidth={2} />
            <span>{plan.baths}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5 text-[#1f376d]">
              <MoveUpRight
                className="absolute inset-0 h-5 w-5"
                strokeWidth={2}
              />

              <MoveUpRight
                className="absolute inset-0 h-5 w-5 rotate-180"
                strokeWidth={2}
              />
            </div>

            <span>{plan.area} sq ft</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-7 flex items-end gap-2">
          <p className="font-[Instrument_Serif] text-[39px] leading-none tracking-[-0.04em] text-[#1f376d]">
            {plan.price}
          </p>

          <span className="mb-[3px] font-[Plus_Jakarta_Sans] text-[13px] text-[#555]">
            per month
          </span>
        </div>

        {/* Tags */}
        <div className="mt-7 flex min-h-[68px] flex-wrap content-start gap-2">
          {plan.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#cbd3df] bg-[#f3f6fb] px-4 py-[7px] font-[Plus_Jakarta_Sans] text-[13px] font-bold leading-none text-[#18376f]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-[50px] flex flex-col gap-3">
          {plan.tour?.trim() && (
            <button
              type="button"
              onClick={() =>
                window.open(plan.tour, "_blank", "noopener,noreferrer")
              }
              className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#e09428] bg-white font-[Plus_Jakarta_Sans] text-[15px] font-bold text-[#e09428] transition hover:bg-[#faf7ef]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>

              <span>Virtual Tour</span>
            </button>
          )}

          <div className="grid grid-cols-[1fr_105px] gap-3">
            <button
              type="button"
              onClick={() => onViewDetail(plan)}
              className="h-[50px] rounded-[11px] bg-[#223f82] font-[Plus_Jakarta_Sans] text-[16px] font-bold text-white transition hover:bg-[#19346f]"
            >
              View Details
            </button>

            <button
              type="button"
              onClick={() => onToggleCompare(plan.title)}
              disabled={!isSelected && !canSelectMore}
              className={`h-[50px] rounded-[11px] border font-[Plus_Jakarta_Sans] text-[15px] font-bold transition ${
                isSelected
                  ? "border-[#223f82] bg-[#223f82] text-white"
                  : canSelectMore
                    ? "border-[#cbd3df] bg-white text-[#3c3c3c] hover:bg-[#f5f7fb]"
                    : "cursor-not-allowed border-[#e4ddd2] bg-[#f3efe8] text-[#b2aaa0]"
              }`}
            >
              {isSelected ? "Selected" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPARISON DRAWER
// ============================================================

function ComparisonDrawer({
  leftPlan,
  rightPlan,
  onClear,
}: {
  leftPlan: FloorPlan;
  rightPlan: FloorPlan;
  onClear: () => void;
}) {
  const rows = [
    {
      label: "BEDROOMS",
      left: leftPlan.beds,
      right: rightPlan.beds,
    },
    {
      label: "BATHROOMS",
      left: leftPlan.baths,
      right: rightPlan.baths,
    },
    {
      label: "SQ FOOTAGE",
      left: leftPlan.area,
      right: rightPlan.area,
    },
    {
      label: "PRICE",
      left: leftPlan.price,
      right: rightPlan.price,
    },
    {
      label: "AVAILABLE",
      left: leftPlan.available,
      right: rightPlan.available,
    },
  ];

  const numericValue = (value: string) =>
    parseInt(value.replace(/[^0-9]/g, ""), 10);

  const biggerArea = (a: string, b: string) =>
    numericValue(a) > numericValue(b);

  const cheaperPrice = (a: string, b: string) =>
    numericValue(a) < numericValue(b);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClear} />

      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[82vh] overflow-y-auto rounded-t-[28px] border-t border-[#d8d2c7] bg-[#F5F2ED] shadow-2xl">
        <div className="sticky top-0 border-b border-[#ddd7cc] bg-[#F5F2ED] px-6 pb-6 pt-3 md:px-20 lg:px-40">
          <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[#d1cbc1]" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#29488d]" />

              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#29488d] md:text-[22px]">
                Comparing {leftPlan.title} vs {rightPlan.title}
              </p>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="whitespace-nowrap text-sm text-[#5c5752] md:text-base"
            >
              × Clear Comparison
            </button>
          </div>
        </div>

        <div className="mx-auto px-6 py-8 md:px-20 lg:px-40">
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-[220px_1fr_1fr] md:gap-8">
            <div className="pt-[74px]">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex h-[52px] items-center border-t border-[#d8d2c7] text-[15px] font-semibold tracking-[0.08em] text-[#666b67]"
                >
                  {row.label}
                </div>
              ))}
            </div>

            <div>
              <div className="flex h-[74px] items-center border-b border-[#d8d2c7]">
                <h3 className="font-[Instrument_Serif] text-[38px] text-[#2d3230]">
                  {leftPlan.title}
                </h3>
              </div>

              {rows.map((row) => {
                const highlight =
                  row.label === "PRICE"
                    ? cheaperPrice(leftPlan.price, rightPlan.price)
                    : row.label === "SQ FOOTAGE"
                      ? biggerArea(leftPlan.area, rightPlan.area)
                      : false;

                return (
                  <div
                    key={row.label}
                    className="flex h-[52px] items-center border-b border-[#d8d2c7] text-[22px] text-[#2d3230]"
                  >
                    <span
                      className={
                        highlight ? "font-semibold text-[#29488d]" : ""
                      }
                    >
                      {row.left}
                    </span>

                    {highlight && (
                      <span className="ml-2 text-[#E09428]">★</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <div className="flex h-[74px] items-center gap-3 border-b border-[#d8d2c7]">
                <h3 className="font-[Instrument_Serif] text-[38px] text-[#2d3230]">
                  {rightPlan.title}
                </h3>

                {rightPlan.popular && (
                  <span className="rounded-full bg-[#E09428] px-3 py-1 text-xs font-medium text-white">
                    Featured
                  </span>
                )}
              </div>

              {rows.map((row) => {
                const highlight =
                  row.label === "PRICE"
                    ? cheaperPrice(rightPlan.price, leftPlan.price)
                    : row.label === "SQ FOOTAGE"
                      ? biggerArea(rightPlan.area, leftPlan.area)
                      : false;

                return (
                  <div
                    key={row.label}
                    className="flex h-[52px] items-center border-b border-[#d8d2c7] text-[22px] text-[#2d3230]"
                  >
                    <span
                      className={
                        highlight ? "font-semibold text-[#29488d]" : ""
                      }
                    >
                      {row.right}
                    </span>

                    {highlight && (
                      <span className="ml-2 text-[#E09428]">★</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-6 md:hidden">
            {[leftPlan, rightPlan].map((plan) => (
              <div
                key={plan.title}
                className="rounded-2xl border border-[#ddd7cc] bg-white p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-[Instrument_Serif] text-[28px] text-[#2d3230]">
                    {plan.title}
                  </h3>

                  {plan.popular && (
                    <span className="rounded-full bg-[#E09428] px-2.5 py-1 text-[10px] font-medium text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 border-b border-[#ece5d9] pb-3"
                    >
                      <span className="text-xs font-semibold tracking-[0.08em] text-[#666b67]">
                        {row.label}
                      </span>

                      <span className="font-medium text-[#2d3230]">
                        {plan.title === leftPlan.title ? row.left : row.right}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// UNIT DETAIL MODAL
// ============================================================

function UnitDetailModal({
  plan,
  onClose,
}: {
  plan: FloorPlan;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const interiorImages = plan.interiorImages?.length
    ? plan.interiorImages
    : plan.images;

  const allImages = [...interiorImages, plan.images[0]];

  const features = [
    "Clean Finish Countertops",
    "LVP Flooring",
    "9 ft Ceilings",
    "In-Unit W/D Connections",
    "Covered Patio/Balcony",
    "Central Air & Heat",
  ];

  const isFloorPlanImage = activeImage === allImages.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07122b]/75 px-4 py-6 backdrop-blur-[6px]">
      <div className="relative max-h-[92vh] w-full max-w-[1080px] overflow-hidden rounded-[26px] bg-[#fffdf9] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e5ded3] px-6 py-6 md:px-8">
          <div>
            <p className="font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.24em] text-[#E09428]">
              {plan.series}
            </p>

            <h2 className="mt-2 font-[Instrument_Serif] text-[34px] leading-none text-[#111827]">
              {plan.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f1efec] text-[26px] text-[#222] hover:bg-[#e7e2dc]"
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(92vh-105px)] overflow-y-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Images */}
            <div className="border-r border-[#e5ded3]">
              <div className="relative h-[320px] bg-[#f7f4ee] md:h-[365px]">
                <img
                  src={allImages[activeImage]}
                  alt={
                    isFloorPlanImage
                      ? getFloorPlanAlt(plan)
                      : getInteriorAlt(plan)
                  }
                  className={`h-full w-full ${
                    isFloorPlanImage ? "object-contain p-6" : "object-cover"
                  }`}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto px-5 py-4">
                {allImages.slice(0, 5).map((img, index) => {
                  const floor = index === allImages.length - 1;

                  return (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`h-[58px] w-[78px] shrink-0 overflow-hidden rounded-[9px] border-2 ${
                        activeImage === index
                          ? "border-[#1e3872]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={
                          floor ? getFloorPlanAlt(plan) : getInteriorAlt(plan)
                        }
                        className={`h-full w-full ${
                          floor ? "object-contain bg-[#f7f4ee]" : "object-cover"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Floor Plan */}
              <div className="bg-[#fbfaf7] px-6 pb-8 pt-4">
                <img
                  src={plan.images[0]}
                  alt={getFloorPlanAlt(plan)}
                  className="mx-auto max-h-[360px] w-full object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div className="px-6 py-8 md:px-8">
              <p className="font-[Plus_Jakarta_Sans] text-[17px] leading-[1.7] text-[#314057]">
                {plan.description}
              </p>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ["BEDROOMS", plan.beds],
                  ["BATHROOMS", plan.baths],
                  ["SQUARE FEET", plan.area],
                  ["STARTING FROM", plan.price],
                  ["AVAILABLE", plan.available.replace("available", "units")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[12px] bg-[#f1efec] px-4 py-4"
                  >
                    <p className="font-[Plus_Jakarta_Sans] text-[11px] font-bold uppercase tracking-[0.16em] text-[#4b5563]">
                      {label}
                    </p>

                    <p className="mt-2 font-[Instrument_Serif] text-[24px] leading-none text-[#111827]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-8">
                <p className="font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.22em] text-[#334155]">
                  Apartment Features
                </p>

                <div className="mt-5 space-y-3">
                  {features.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-3 font-[Plus_Jakarta_Sans] text-[16px] text-[#111827]"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#1e3872] text-[10px] text-[#1e3872]">
                        ✓
                      </span>

                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Apply */}
              <a
                href={headerConfig.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 flex h-[62px] w-full items-center justify-center rounded-[14px] bg-[#223f82] font-[Plus_Jakarta_Sans] text-[18px] font-bold text-white shadow-[0_12px_28px_rgba(30,56,114,0.28)] transition hover:bg-[#19346f]"
              >
                Apply for This Home →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN FLOOR PLANS PAGE
// ============================================================

export default function Floor() {
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);

  const [detailPlan, setDetailPlan] = useState<FloorPlan | null>(null);

  const [selectedBedroom, setSelectedBedroom] = useState("All Plans");

  // Village Green has ONLY 1 & 2 bedroom homes.
  const bedroomFilters = ["All Plans", "1 Bedroom", "2 Bedrooms"];

  // Only Village Green plans.
  const villageGreenPlans = useMemo(
    () =>
      floorPlans.filter((plan) => {
        const bedrooms = Number(String(plan.beds).match(/\d+/)?.[0] ?? 0);

        return bedrooms === 1 || bedrooms === 2;
      }),
    [],
  );

  const filteredFloorPlans = useMemo(() => {
    if (selectedBedroom === "All Plans") {
      return villageGreenPlans;
    }

    const bedroomCount = Number(selectedBedroom.match(/\d+/)?.[0] ?? 0);

    return villageGreenPlans.filter((plan) => {
      const planBedrooms = Number(String(plan.beds).match(/\d+/)?.[0] ?? 0);

      return planBedrooms === bedroomCount;
    });
  }, [selectedBedroom, villageGreenPlans]);

  // ==========================================================
  // COMPARISON
  // ==========================================================

  const toggleCompare = (title: string) => {
    setSelectedCompare((previous) => {
      if (previous.includes(title)) {
        return previous.filter((item) => item !== title);
      }

      if (previous.length === 2) {
        return previous;
      }

      return [...previous, title];
    });
  };

  const selectedPlans = useMemo(
    () =>
      villageGreenPlans.filter((plan) => selectedCompare.includes(plan.title)),
    [selectedCompare, villageGreenPlans],
  );

  const clearComparison = () => setSelectedCompare([]);

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const planCount = villageGreenPlans.length;

  const oneBedroomCount = villageGreenPlans.filter((plan) =>
    String(plan.beds).includes("1"),
  ).length;

  const twoBedroomCount = villageGreenPlans.filter((plan) =>
    String(plan.beds).includes("2"),
  ).length;

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <HeaderOther />

      <PromoCardWidget />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative mx-auto min-h-[620px] overflow-hidden bg-[#1f376d] px-6 pb-20 pt-[84px] text-[#F5F2ED] md:px-20 md:py-28 lg:px-40">
        {/* Dots */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(245,242,237,0.45)_1px,transparent_1px)] [background-size:50px_50px]" />

        <div className="relative z-10 max-w-[720px]">
          <p className="mb-6 mt-[15px] font-[Plus_Jakarta_Sans] text-xs font-bold uppercase tracking-[0.3em] text-[#E09428]">
            Crossings at Irving · Euless, TX
          </p>

          <h1 className="font-[Instrument_Serif] text-[48px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED] md:text-[64px]">
            Floor Plans & <br />
            <span className="italic text-[#E09428]">Pricing</span>
          </h1>

          <p className="mt-[28px] max-w-[1920px] font-[Plus_Jakarta_Sans] text-[18px] leading-[1.72] tracking-[-0.02em] text-[#b7bfd0] md:text-[20px]">
            Seven thoughtfully designed 1 and 2-bedroom layouts from cozy
            one-bedroom residences with private balconies to expansive
            two-bedroom apartment homes featuring fireplaces and washer/dryer
            connections.
          </p>

          {/* Stats */}
          <div className="mt-[58px] grid grid-cols-2 gap-x-[52px] gap-y-8 md:grid-cols-4">
            {[
              [String(planCount), "FLOOR PLANS"],
              [String(oneBedroomCount + twoBedroomCount), "UNITS AVAILABLE"],
              ["597 - 1,102", "Sq Ft Range"],
              ["$ 999", "STARTING FROM"],
            ].map(([value, label]) => (
              <div key={label}>
                <h2 className="font-[Instrument_Serif] text-[34px] leading-none tracking-[-0.05em] text-white">
                  {value}
                </h2>

                <p className="mt-[15px] whitespace-nowrap font-[Plus_Jakarta_Sans] text-[11px] font-bold uppercase tracking-[0.12em] text-[#8f9fc3] md:text-[13px] md:tracking-[0.16em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          FLOOR PLANS
      ====================================================== */}

      <section className="bg-[#F5F2ED]">
        {/* Filters */}
        <div className="border-b border-[#dedbd6] bg-white">
          <div className="mx-auto flex max-w-[1920px] items-center gap-2 overflow-x-auto px-6 py-4 md:px-20 lg:px-40">
            {bedroomFilters.map((filter) => {
              const active = selectedBedroom === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedBedroom(filter)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-6 py-2.5 font-[Plus_Jakarta_Sans] text-[15px] font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#1f376d] bg-[#1f376d] text-white"
                      : "border-[#d5d3d0] bg-white text-[#555b5b] hover:border-[#1f376d] hover:text-[#1f376d]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="px-6 py-16 md:px-20 lg:px-40">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredFloorPlans.length > 0 ? (
              filteredFloorPlans.map((plan) => (
                <Card
                  key={plan.title}
                  plan={plan}
                  isSelected={selectedCompare.includes(plan.title)}
                  canSelectMore={selectedCompare.length < 2}
                  onToggleCompare={toggleCompare}
                  onViewDetail={setDetailPlan}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="font-[Instrument_Serif] text-3xl text-[#1f376d]">
                  No floor plans available
                </p>

                <p className="mt-2 font-[Plus_Jakarta_Sans] text-sm text-[#666b67]">
                  No floor plans are currently available for this bedroom type.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          COMPARISON HELP
      ====================================================== */}

      <section className="bg-[#F5F2ED] px-6 pb-24 md:px-20 lg:px-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="rounded-[20px] border border-dashed border-[#bdc8d8] bg-[#f1eeee] px-6 py-7 md:px-9">
            <div className="flex items-center gap-4">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] bg-[#d9dce4]">
                <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-[#173a7a] text-[13px] font-bold text-[#173a7a]">
                  ✓
                </span>
              </div>

              <div>
                <p className="font-[Plus_Jakarta_Sans] text-[17px] font-bold text-[#123a78]">
                  Compare any two floor plans
                </p>

                <p className="mt-1 font-[Plus_Jakarta_Sans] text-[14px] text-[#334155] md:text-[15px]">
                  Click "Compare" on any two homes to see a side-by-side
                  breakdown of features, dimensions and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          COMPARISON DRAWER
      ====================================================== */}

      {selectedPlans.length === 2 && (
        <ComparisonDrawer
          leftPlan={selectedPlans[0]}
          rightPlan={selectedPlans[1]}
          onClear={clearComparison}
        />
      )}

      {/* ======================================================
          DETAIL MODAL
      ====================================================== */}

      {detailPlan && (
        <UnitDetailModal
          plan={detailPlan}
          onClose={() => setDetailPlan(null)}
        />
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

      <FooterLegalBar />
    </>
  );
}
