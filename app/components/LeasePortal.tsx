"use client";

import Link from "next/link";
import { leasePortalConfig } from "@/app/config/content";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Building2,
  PawPrint,
  ChevronDown,
  Search,
  CircleCheck,
  X,
} from "lucide-react";

const monthNames = leasePortalConfig.months;
const units = leasePortalConfig.units;

type UnitTab = "all" | "1bed" | "2bed";

export default function LeasePortal() {
  const [hasPets, setHasPets] = useState(false);
  const [checked, setChecked] = useState(false);

  // Desktop dropdown state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  // Mobile sheet state
  const [mobileSheet, setMobileSheet] = useState<
    "date" | "unit" | "pet" | null
  >(null);

  const today = useMemo(() => new Date(), []);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [unitTab, setUnitTab] = useState<UnitTab>("all");

  const [selectedUnit, setSelectedUnit] = useState<string>("All Homes");

  const monthLabel = `${monthNames[currentMonth]} ${currentYear}`;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const leadingEmptyDays = new Date(currentYear, currentMonth, 1).getDay();

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth],
  );

  // ============================================================
  // FILTER HOMES
  // ============================================================

  const filteredUnits = useMemo(() => {
    if (unitTab === "1bed") {
      return units.filter((unit) => unit.beds === 1);
    }

    if (unitTab === "2bed") {
      return units.filter((unit) => unit.beds === 2);
    }

    return units;
  }, [unitTab]);

  // ============================================================
  // DATE HELPERS
  // ============================================================

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return date < todayOnly;
  };

  const isSelectedDate = (day: number) =>
    !!selectedDate &&
    selectedDate.getFullYear() === currentYear &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getDate() === day;

  const handleSelectDate = (day: number) => {
    if (isPastDate(day)) return;

    setSelectedDate(new Date(currentYear, currentMonth, day));

    setShowDatePicker(false);
    setMobileSheet(null);
  };

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const formattedSelectedDate = selectedDate
    ? `${monthNames[selectedDate.getMonth()].slice(
        0,
        3,
      )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    : "Choose a move-in date";

  // ============================================================
  // HOME COUNTS
  // ============================================================

  const unitCountLabel = useMemo(() => filteredUnits.length, [filteredUnits]);

  const selectedUnitLabel = useMemo(() => {
    if (selectedUnit === "All Homes" || selectedUnit === "All Units") {
      return "All Home Types";
    }

    const selected = units.find((unit) => unit.code === selectedUnit);

    return selected?.label ?? selectedUnit;
  }, [selectedUnit]);

  // ============================================================
  // CALENDAR
  // ============================================================

  const CalendarGrid = () => (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          aria-label="Previous month"
          className="rounded-lg p-1.5 text-[#5a6260] hover:bg-black/5"
        >
          <ChevronDown size={15} className="rotate-90" aria-hidden="true" />
        </button>

        <span className="font-[Instrument_Serif] text-[15px] text-[#2d3230]">
          {monthLabel}
        </span>

        <button
          type="button"
          onClick={goNextMonth}
          aria-label="Next month"
          className="rounded-lg p-1.5 text-[#5a6260] hover:bg-black/5"
        >
          <ChevronDown size={15} className="-rotate-90" aria-hidden="true" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="py-1.5 text-center font-[Plus_Jakarta_Sans] text-[10px] font-bold tracking-[0.08em] text-[#5a6260]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[2px]">
        {Array.from({
          length: leadingEmptyDays,
        }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {days.map((day) => {
          const disabled = isPastDate(day);
          const selected = isSelectedDate(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectDate(day)}
              className={`flex aspect-square items-center justify-center rounded-lg border-[1.5px] font-[Plus_Jakarta_Sans] text-[12px] transition ${
                selected
                  ? "border-[#1e3872] bg-transparent font-semibold text-[#2d3230]"
                  : disabled
                    ? "cursor-default border-transparent text-[rgba(45,50,48,0.22)]"
                    : "cursor-pointer border-transparent text-[#2d3230] hover:border-[#1e3872]/30 hover:bg-[#1e3872]/5"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ============================================================
  // HOME LIST
  // ============================================================

  const UnitList = ({ onSelect }: { onSelect: () => void }) => (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-[rgba(30,56,114,0.09)] px-4 pt-3">
        {(["all", "1bed", "2bed"] as UnitTab[]).map((tab) => {
          const labels: Record<UnitTab, string> = {
            all: leasePortalConfig.unitTabs.all || "All Homes",

            "1bed": leasePortalConfig.unitTabs["1bed"] || "1 Bedroom",

            "2bed": leasePortalConfig.unitTabs["2bed"] || "2 Bedrooms",
          };

          const counts: Record<UnitTab, number> = {
            all: units.length,

            "1bed": units.filter((unit) => unit.beds === 1).length,

            "2bed": units.filter((unit) => unit.beds === 2).length,
          };

          const active = unitTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setUnitTab(tab);
                setSelectedUnit("All Homes");
              }}
              className={`flex-1 border-b-2 px-1 py-2.5 text-[12px] tracking-[0.01em] ${
                active
                  ? "border-[#1e3872] font-bold text-[#1e3872]"
                  : "border-transparent font-medium text-[#5a6260]"
              }`}
            >
              {labels[tab]}

              <span
                className={`ml-1 rounded-full px-1.5 py-[1px] text-[10px] font-semibold ${
                  active
                    ? "bg-[#1e3872]/10 text-[#1e3872]"
                    : "bg-[rgba(45,50,48,0.06)] text-[rgba(90,98,96,0.55)]"
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Home rows */}
      <div className="pb-1 pt-2">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit, index) => (
            <button
              key={unit.code}
              type="button"
              onClick={() => {
                setSelectedUnit(unit.code);
                onSelect();
              }}
              className={`flex w-full items-center gap-3 border-b border-[rgba(30,56,114,0.06)] px-5 py-3 text-left last:border-b-0 ${
                index % 2 === 1
                  ? "bg-[rgba(30,56,114,0.027)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(30,56,114,0.14)] bg-[rgba(30,56,114,0.08)]">
                <span className="font-[Instrument_Serif] text-[13px] text-[#1e3872]">
                  {unit.code}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[#2d3230]">
                  {unit.label}
                </div>

                <div className="text-[11px] text-[#5a6260]">{unit.area}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-[Instrument_Serif] text-[15px] text-[#2d3230]">
                  {unit.price}
                </div>

                <div className="text-[10px] font-semibold text-[#1e3872]">
                  Available
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="px-5 py-8 text-center">
            <div className="font-[Instrument_Serif] text-[18px] text-[#1e3872]">
              No homes currently available
            </div>

            <p className="mt-1 text-[11px] leading-[1.5] text-[#5a6260]">
              Try another home type or check back for new availability.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-[rgba(30,56,114,0.07)] px-5 pb-3 pt-2.5">
        <p className="text-[10px] leading-[1.5] text-[#5a6260]">
          {leasePortalConfig.availabilityText ||
            "Availability and pricing may change. Select a home to continue."}
        </p>
      </div>
    </div>
  );

  // ============================================================
  // MOBILE SHEET
  // ============================================================

  const MobileSheet = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="fixed inset-0 z-[300] flex flex-col justify-end md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setMobileSheet(null)}
      />

      {/* Sheet */}
      <div className="relative flex max-h-[85svh] flex-col rounded-t-[24px] bg-[rgb(250,250,248)] shadow-[0_-8px_40px_rgba(0,0,0,0.2)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[rgba(30,56,114,0.08)] px-5 pb-3 pt-5">
          <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-[rgba(30,56,114,0.15)]" />

          <span className="mt-2 font-[Instrument_Serif] text-[18px] text-[#2d3230]">
            {title}
          </span>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setMobileSheet(null)}
            className="mt-2 rounded-full p-1.5 text-[#5a6260] hover:bg-black/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ======================================================
          MOBILE
      ====================================================== */}

      <div className="block w-full md:hidden">
        <div className="overflow-hidden rounded-[20px] border border-[rgba(30,56,114,0.18)] bg-[rgba(245,242,237,0.97)] shadow-[0_16px_48px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]">
          {/* Row 1 */}
          <div className="grid grid-cols-2 divide-x divide-[rgba(30,56,114,0.1)]">
            {/* Move-in Date */}
            <button
              type="button"
              onClick={() => setMobileSheet("date")}
              className="flex flex-col gap-0.5 px-4 py-4 text-left transition active:bg-black/5"
            >
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
                <CalendarDays size={10} className="text-[#1e3872]" />
                Move-in Date
              </div>

              <span className="font-[Instrument_Serif] text-[15px] leading-tight tracking-[-0.015em] text-[#2d3230]">
                {selectedDate ? (
                  `${monthNames[selectedDate.getMonth()].slice(
                    0,
                    3,
                  )} ${selectedDate.getDate()}`
                ) : (
                  <span className="text-[rgba(45,50,48,0.5)]">
                    Choose move-in date
                  </span>
                )}
              </span>
            </button>

            {/* Home Type */}
            <button
              type="button"
              onClick={() => setMobileSheet("unit")}
              className="flex flex-col gap-0.5 px-4 py-4 text-left transition active:bg-black/5"
            >
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
                <Building2 size={10} className="text-[#1e3872]" />
                Home Type
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-[Instrument_Serif] text-[15px] leading-tight tracking-[-0.015em] text-[#2d3230]">
                  {selectedUnitLabel}
                </span>

                <span className="rounded-full bg-[#1e3872]/10 px-1.5 py-[1px] text-[9px] font-bold text-[#1e3872]">
                  {unitCountLabel}
                </span>
              </div>
            </button>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 divide-x divide-[rgba(30,56,114,0.1)] border-t border-[rgba(30,56,114,0.1)]">
            {/* Pet Friendly */}
            <button
              type="button"
              onClick={() => setMobileSheet("pet")}
              className="flex flex-col gap-0.5 px-4 py-4 text-left transition active:bg-black/5"
            >
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
                <PawPrint size={10} className="text-[#1e3872]" />
                Pet Friendly
              </div>

              <span className="font-[Instrument_Serif] text-[15px] leading-tight tracking-[-0.015em] text-[#2d3230]">
                {hasPets
                  ? leasePortalConfig.labels.petsYes
                  : leasePortalConfig.labels.noPets}
              </span>
            </button>

            {/* CTA */}
            <div className="flex items-center justify-center px-4 py-4">
              <button
                type="button"
                onClick={() => setChecked(true)}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#162b5e] px-4 py-3 font-[Plus_Jakarta_Sans] text-[13px] font-bold tracking-[0.01em] text-[#f5f2ed] shadow-[0_2px_12px_rgba(30,56,114,0.38)] transition active:bg-[#0c2457]"
              >
                {checked ? (
                  <>
                    <CircleCheck size={14} />
                    {unitCountLabel} {unitCountLabel === 1 ? "Home" : "Homes"}{" "}
                    Found
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    {leasePortalConfig.labels.checkNow ||
                      "Explore Available Homes"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        {checked && (
          <div className="flex justify-center pt-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(100,140,210,0.35)] bg-[rgba(30,56,114,0.92)] px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.22)]">
              <CircleCheck size={12} className="text-[#7BAAF0]" />

              <span className="font-[Plus_Jakarta_Sans] text-[11px] font-bold tracking-[0.01em] text-[#f5f2ed]">
                {leasePortalConfig.labels.residencesMatch ||
                  `${unitCountLabel} homes available`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================
          DESKTOP
      ====================================================== */}

      <div className="mx-auto hidden max-w-[1920px] md:block">
        <div className="relative flex flex-col rounded-[20px] border border-[rgba(30,56,114,0.18)] bg-[rgba(245,242,237,0.97)] shadow-[0_32px_80px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[28px] lg:flex-row lg:items-stretch">
          {/* ==================================================
              DATE
          ================================================== */}

          <div className="relative min-w-0 flex-[1.5] border-r border-[rgba(30,56,114,0.1)] px-8 py-[30px]">
            <button
              type="button"
              onClick={() => {
                setShowDatePicker((previous) => !previous);
                setShowUnitPicker(false);
              }}
              className="w-full text-left"
            >
              <div className="mb-1 flex items-center gap-1 font-[Plus_Jakarta_Sans] text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
                <CalendarDays size={11} className="text-[#1e3872]" />
                Move-in Date
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-[Instrument_Serif] text-[17px] tracking-[-0.015em] text-[rgba(45,50,48,0.72)]">
                  {formattedSelectedDate}
                </span>

                <ChevronDown
                  size={13}
                  className={`shrink-0 text-[#5a6260] transition-transform duration-200 ${
                    showDatePicker ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {showDatePicker && (
              <div className="absolute left-0 top-[calc(100%+10px)] z-[200] w-[300px] rounded-[18px] border border-[rgba(30,56,114,0.14)] bg-[rgb(250,250,248)] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.22)]">
                <CalendarGrid />
              </div>
            )}
          </div>

          {/* ==================================================
              HOME TYPE
          ================================================== */}

          <div className="relative min-w-[220px] border-r border-[rgba(30,56,114,0.1)] px-6 py-[30px]">
            <button
              type="button"
              onClick={() => {
                setShowUnitPicker((previous) => !previous);
                setShowDatePicker(false);
              }}
              className="w-full text-left"
            >
              <div className="mb-1 flex items-center gap-1 font-[Plus_Jakarta_Sans] text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
                <Building2 size={11} className="text-[#1e3872]" />
                Home Type
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-[Instrument_Serif] text-[17px] tracking-[-0.015em] text-[#2d3230]">
                  {selectedUnitLabel}
                </span>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-[#1e3872]/10 px-2 py-[2px] font-[Plus_Jakarta_Sans] text-[10px] font-bold tracking-[0.04em] text-[#1e3872]">
                    {unitCountLabel} available
                  </span>

                  <ChevronDown
                    size={13}
                    className={`text-[#5a6260] transition-transform duration-200 ${
                      showUnitPicker ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>

            {showUnitPicker && (
              <div className="absolute left-0 top-[calc(100%+10px)] z-[200] w-[420px] overflow-hidden rounded-[18px] border border-[rgba(30,56,114,0.14)] bg-[rgb(250,250,248)] shadow-[0_24px_72px_rgba(0,0,0,0.22)]">
                <UnitList onSelect={() => setShowUnitPicker(false)} />
              </div>
            )}
          </div>

          {/* ==================================================
              PETS
          ================================================== */}

          <div className="flex min-w-[220px] flex-1 flex-col justify-center px-6 py-[20px]">
            <div className="mb-1 flex items-center gap-1 font-[Plus_Jakarta_Sans] text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a6260]">
              <PawPrint size={11} className="text-[#1e3872]" />
              Pet Friendly
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="whitespace-nowrap font-[Instrument_Serif] text-[17px] tracking-[-0.015em] text-[rgba(45,50,48,0.65)]">
                {hasPets ? "Yes, I have a pet" : "No pets"}
              </span>

              <button
                type="button"
                aria-pressed={hasPets}
                aria-label={
                  hasPets ? "Remove pet preference" : "Add pet preference"
                }
                onClick={() => setHasPets((previous) => !previous)}
                className={`relative h-[26px] w-[46px] rounded-full transition ${
                  hasPets ? "bg-[#1e3872]" : "bg-[rgba(45,50,48,0.14)]"
                }`}
              >
                <div
                  className={`absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.22)] transition-all duration-200 ${
                    hasPets ? "left-[23px]" : "left-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ==================================================
              CTA
          ================================================== */}

          <div className="flex min-w-0 flex-[0.9] items-center justify-center px-8 py-[30px]">
            <Link
              href="/#unit"
              onClick={() => setChecked(true)}
              className="flex w-full max-w-[260px] items-center justify-center gap-[9px] rounded-[14px] bg-[#162b5e] px-8 py-[14px] font-[Plus_Jakarta_Sans] text-[14px] font-bold tracking-[0.01em] text-[#f5f2ed] shadow-[0_2px_16px_rgba(30,56,114,0.38)] transition hover:bg-[#0c2457]"
            >
              {checked ? (
                <>
                  <CircleCheck size={15} />

                  {leasePortalConfig.labels.homesFound || "Homes Available"}
                </>
              ) : (
                <>
                  <Search size={15} />

                  {leasePortalConfig.labels.checkNow ||
                    "Explore Available Homes"}
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Result */}
        {checked && (
          <div className="flex justify-center pt-[14px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(100,140,210,0.35)] bg-[rgba(30,56,114,0.92)] px-[20px] py-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.22)] backdrop-blur-[16px]">
              <CircleCheck size={12} className="text-[#7BAAF0]" />

              <span className="font-[Plus_Jakarta_Sans] text-[12px] font-bold tracking-[0.01em] text-[#f5f2ed]">
                {unitCountLabel} {unitCountLabel === 1 ? "home" : "homes"}{" "}
                available · Explore floor plans below
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================
          MOBILE SHEETS
      ====================================================== */}

      {mobileSheet === "date" && (
        <MobileSheet title={leasePortalConfig.labels.moveInDate}>
          <CalendarGrid />
        </MobileSheet>
      )}

      {mobileSheet === "unit" && (
        <MobileSheet
          title={`Choose ${leasePortalConfig.labels.unitType || "Home Type"}`}
        >
          <UnitList onSelect={() => setMobileSheet(null)} />
        </MobileSheet>
      )}

      {mobileSheet === "pet" && (
        <MobileSheet title={leasePortalConfig.labels.petFriendly}>
          <div className="space-y-4">
            <p className="text-[14px] leading-relaxed text-[#5a6260]">
              Have a pet? Crossings at Irving welcomes your furry companions.
              Select your preference to explore suitable homes.
            </p>

            <div className="flex items-center justify-between rounded-[14px] border border-[rgba(30,56,114,0.14)] bg-white px-5 py-4">
              <span className="font-[Instrument_Serif] text-[18px] text-[#2d3230]">
                {hasPets
                  ? leasePortalConfig.labels.petsYes
                  : leasePortalConfig.labels.noPets}
              </span>

              <button
                type="button"
                aria-pressed={hasPets}
                aria-label={
                  hasPets ? "Remove pet preference" : "Add pet preference"
                }
                onClick={() => setHasPets((previous) => !previous)}
                className={`relative h-[30px] w-[52px] rounded-full transition ${
                  hasPets ? "bg-[#1e3872]" : "bg-[rgba(45,50,48,0.14)]"
                }`}
              >
                <div
                  className={`absolute top-[4px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.22)] transition-all duration-200 ${
                    hasPets ? "left-[26px]" : "left-[4px]"
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileSheet(null);

                document.getElementById("unit")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="w-full rounded-[14px] bg-[#162b5e] py-3.5 font-[Plus_Jakarta_Sans] text-[14px] font-bold text-[#f5f2ed] shadow-[0_2px_12px_rgba(30,56,114,0.38)]"
            >
              Apply Preference
            </button>
          </div>
        </MobileSheet>
      )}
    </>
  );
}
