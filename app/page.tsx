"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import Footer from "@/app/components/Footer";
import LeasePortal from "@/app/components/LeasePortal";
import { articles, headerConfig } from "@/app/config/content";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import Header from "@/app/components/Header";
import HeaderTop from "@/app/components/HeaderTop";

import { siteConfig } from "@/app/config/content";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

import { Clock, Phone, Mail } from "lucide-react";
import { Dumbbell, PawPrint, Trees, Waves } from "lucide-react";

import { UsersRound, PackageCheck } from "lucide-react";

import {
  images,
  homePageConfig,
  plans,
  type PlanKey,
  type PreviewCategory,
  type AmenityCategory,
} from "@/app/config/content";

import FooterLegalBar from "@/app/components/FooterLegalBar";
import TourScheduler from "@/app/components/TourScheduler";
import HousingVoucher from "@/app/components/HousingVoucher";
import UnitOverview from "@/app/components/UnitOverview";

export default function Home() {
  const [tab, setTab] = useState("amenities");
  const [reviewIndex, setReviewIndex] = useState(0);

  const reviews = homePageConfig.residentVoices;
  const stories = homePageConfig.stories;
  const amenities = homePageConfig.amenities;

  const [previewCategory, setPreviewCategory] =
    useState<PreviewCategory>("Living Room");
  const [amenityCategory, setAmenityCategory] =
    useState<AmenityCategory>("Pool");
  const [storyPage, setStoryPage] = useState(0);
  const totalStoryPages = Math.ceil(stories.length / 3);
  const [showTopBar, setShowTopBar] = useState(true);

  // ── Responsive carousel columns ──────────────────────────────────────────
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, articles.length - cols);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when cols change so we never sit past the new maxIndex
  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(0, articles.length - cols)),
    );
  }, [cols]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const getAmenityIcon = (title = "", tag = "") => {
    const text = `${title} ${tag}`.toLowerCase();
    const iconClass = "h-3 w-3 shrink-0";

    if (
      text.includes("sports") ||
      text.includes("fitness") ||
      text.includes("court")
    ) {
      return <Dumbbell className={iconClass} />;
    }

    if (
      text.includes("clubhouse") ||
      text.includes("meeting") ||
      text.includes("community")
    ) {
      return <UsersRound className={iconClass} />;
    }

    if (
      text.includes("pool") ||
      text.includes("swimming") ||
      text.includes("relaxation")
    ) {
      return <Waves className={iconClass} />;
    }

    if (
      text.includes("recreational") ||
      text.includes("playground") ||
      text.includes("outdoor")
    ) {
      return <Trees className={iconClass} />;
    }

    if (text.includes("pet") || text.includes("bark") || text.includes("dog")) {
      return <PawPrint className={iconClass} />;
    }

    if (
      text.includes("package") ||
      text.includes("locker") ||
      text.includes("convenience")
    ) {
      return <PackageCheck className={iconClass} />;
    }

    return null;
  };

  const getAmenityDescription = (title = "") => {
    const descriptions: Record<string, string> = {
      "Fitness Center":
        "Stay active close to home with a convenient community fitness center designed to support your everyday wellness routine.",

      "Resident Clubhouse & Lounge":
        "Relax, gather, and connect with neighbors in the welcoming resident clubhouse and lounge at Crossings at Irving.",

      "Community Swimming Pool":
        "Cool off and unwind at the community swimming pool, a relaxing outdoor space for sunny days and time spent close to home.",

      "BBQ & Picnic Area":
        "Enjoy outdoor meals and gatherings with convenient BBQ and picnic areas designed for relaxing with family and friends.",

      "Pet Park":
        "Give your four-legged companions room to play and enjoy the outdoors in the community's pet-friendly park area.",

      "Package Locker Service":
        "Make deliveries more convenient with package locker service, providing residents with an easy way to retrieve packages.",

      "Sports Court":
        "Stay active outdoors with a community sports court offering residents another convenient way to enjoy recreation close to home.",

      Playground:
        "Enjoy outdoor recreation with a community playground designed to provide an inviting space for families and children.",

      "Tennis Court":
        "Enjoy an active lifestyle with a community tennis court available for recreation and outdoor play.",

      "Volleyball Court":
        "Get outside and enjoy a friendly game with access to a community volleyball court.",

      "Laundry Facilities":
        "Enjoy added everyday convenience with on-site laundry facilities available within the Crossings at Irving community.",

      "Controlled Access":
        "Enjoy added peace of mind with controlled community access designed to provide residents with a comfortable living environment.",
    };

    return descriptions[title] ?? "";
  };

  // Card gap in px at each breakpoint (matches gap-4 sm:gap-5 lg:gap-6)
  const cardGap = cols === 1 ? 0 : cols === 2 ? 20 : 24;

  const [showTourScheduler, setShowTourScheduler] = useState(false);

  const handleScheduleTour = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTourScheduler(true);
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-screen w-full overflow-hidden">
        <HeaderTop show={showTopBar} setShow={setShowTopBar} />

        <Header showTopBar={showTopBar} />

        <Image
          src={"/images/2026/Pool.webp"}
          alt={"Swimming Pool & Residential View at Crossings at Irving"}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50" />

        {/* MAIN LAYOUT WRAPPER (Now handles the entire animation entry) */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div
            className={`w-full max-w-[1920px] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto flex flex-col items-center justify-center text-center text-white select-none animate-hero-container ${
              showTopBar ? "pt-20 md:pt-24" : "pt-12 md:pt-16"
            }`}
          >
            {/* 1. TOP BADGE STRIP */}
            <div className="mb-8 flex items-center gap-4 w-full max-w-[900px] justify-center">
              <div className="h-px flex-1 max-w-[72px] bg-[#F5F2ED]/15" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5F2ED]/50">
                Crossings at Irving • Irving, TX • NOW LEASING
              </span>
              <div className="h-px flex-1 max-w-[72px] bg-[#F5F2ED]/15" />
            </div>

            {/* 2. HERO HEADING */}
            <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(3rem,7.3vw,9.3rem)] leading-[1.05] tracking-[-0.03em] text-[#F5F2ED]">
              Peaceful Living
              <br />
              <em className="inline-block italic text-[#E09428]/90">
                in Central Irving.
              </em>
            </h1>

            {/* 3. DIVIDER */}
            <div className="my-6 flex items-center gap-2.5">
              <div className="h-px w-[52px] bg-[#E09428]/45" />
              <div className="h-1 w-1 rounded-full bg-[#E09428]/60" />
              <div className="h-1 w-1 rounded-full bg-[#E09428]/35" />
              <div className="h-1 w-1 rounded-full bg-[#E09428]/60" />
              <div className="h-px w-[52px] bg-[#E09428]/45" />
            </div>

            {/* 4. SUBTEXT */}
            <p className="text-[clamp(12px,1.3vw,15px)] leading-[1.72] text-[#F5F2ED]/70 mb-10 max-w-[500px]">
              A welcoming community offering spacious 1 and 2-bedroom floor
              plans, relaxing outdoor amenities, and seamless highway access
              right in the heart of DFW.
            </p>

            {/* 5. CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[320px] sm:max-w-none">
              <a
                href="/#unit"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full bg-[#1e3872] text-[#f5f2ed] text-[14px] font-bold shadow-[rgba(30,56,114,0.5)_0px_4px_22px] transition duration-300 hover:brightness-110"
              >
                <span>View Available Units</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <a
                href="#"
                onClick={handleScheduleTour}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[#f5f2ed] text-[14px] font-semibold transition duration-300 hover:bg-white/10"
              >
                Schedule a Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEASE PORTAL ================= */}
      <div className="relative z-30 -mt-10 -mb-16 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
        <div className="max-w-[1920px] mx-auto">
          <LeasePortal />
        </div>
      </div>

      <UnitOverview
        plans={plans}
        images={images}
        planFeatures={homePageConfig.planFeatures}
      />

      {/* ================= AMENITIES ================= */}
      <section
        id="amenities"
        className="bg-[#0c2340]  px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-14 md:py-20"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-10 md:mb-12">
            <div>
              <p className="font-[Plus_Jakarta_Sans] text-[12px] md:text-[13px] tracking-[0.24em] uppercase text-[#E09428] mb-4 font-semibold">
                Amenities
              </p>
              <h2 className="font-[Instrument_Serif] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] text-white leading-[0.95] tracking-[-0.03em]">
                Everything You Need,
                <br />
                Right Where You Live
              </h2>
            </div>
            <div className="md:flex md:items-center">
              <p className="font-[Plus_Jakarta_Sans] text-[15px] sm:text-[16px] md:text-[19px] leading-[1.75] text-[#9faac0] max-w-[680px]">
                Our collection of community amenities makes every day at
                Crossings at Irving relaxing and convenient. Unwind by our
                sparkling swimming pool, enjoy outdoor matches on the sports
                courts, let your pup play in the dedicated pet park, or take
                advantage of hassle-free on-site resident services.
              </p>
            </div>
          </div>

          {/* AMENITY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {amenities.map((item, i) => (
              <div
                key={i}
                className="relative h-[240px] sm:h-[280px] md:h-[310px] rounded-[20px] sm:rounded-[26px] overflow-hidden group shadow-md hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* Dark image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Brand color hover overlay */}
                <div className="absolute inset-0 bg-[#0c2340]/0 group-hover:bg-[#0c2340]/25 transition-colors duration-500" />

                {/* Amenity tag */}
                <div className="font-[Plus_Jakarta_Sans] absolute top-4 sm:top-5 left-4 sm:left-5 z-10 bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold tracking-[0.13em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 border border-white/15">
                  <span aria-hidden="true">{getAmenityIcon(item.title)}</span>
                  <span>{item.tag}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                  <p className="font-[Instrument_Serif] text-white text-[24px] sm:text-[28px] md:text-[34px] leading-none tracking-[-0.03em]">
                    {item.title}
                  </p>

                  {/* Hover description */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="font-[Plus_Jakarta_Sans] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7] text-white/75 mt-3 max-w-[95%]">
                        {getAmenityDescription(item.title)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ALSO INCLUDED */}
          <div className="mt-8 sm:mt-9 md:mt-10 rounded-[16px] sm:rounded-[18px] bg-[#112a4d] border border-white/10 px-4 sm:px-5 md:px-7 py-5 sm:py-6 md:py-7">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-5 lg:gap-7">
              <p className="font-[Plus_Jakarta_Sans] text-[12px] tracking-[0.24em] uppercase text-[#5f86c8] font-semibold whitespace-nowrap pt-2">
                Also Included
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {homePageConfig.alsoIncluded.map((item, i) => (
                  <span
                    key={i}
                    className="font-[Plus_Jakarta_Sans] inline-flex items-center gap-2 rounded-full border border-[#284a7a] bg-[#112f58] px-3 sm:px-4 py-1.5 sm:py-2 text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#c8d1df]"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#4778bd] text-[9px] text-[#7fb2ff]">
                      ✓
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCATION INTRO ================= */}
      <section
        id="neighborhood"
        className="bg-[#f1eee9] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-10 md:py-14 lg:py-20"
      >
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-28 items-center">
          {/* Heading */}
          <div>
            <p className="font-[Plus_Jakarta_Sans] text-xs tracking-[3px] uppercase text-[#7b7f7d] mb-4 font-bold">
              Your Neighborhood
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Instrument_Serif] text-[#2d3230] leading-[1.2]">
              Discover The <br />
              Best Of Irving & DFW.
            </h2>
          </div>

          {/* Description */}
          <div className="lg:pl-8 xl:pl-12">
            <p className="font-[Plus_Jakarta_Sans] text-sm md:text-base text-[#5a6260] text-justify leading-relaxed max-w-xxl">
              Crossings at Irving places you in a prime central location
              surrounded by top-tier dining, shopping centers, and local
              recreation. Enjoy seamless everyday commutes with instant
              connectivity to TX-183, TX-161, and DFW Airport, along with close
              proximity to premier Irving ISD schools and major corporate hubs.
            </p>
          </div>
        </div>
      </section>
      {/* ================= LOCATION MAP + DESTINATIONS ================= */}
      <section className="bg-[#f1eee9] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1  xxl:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* MAP */}
          <div className="h-[350px] w-full overflow-hidden rounded-2xl sm:h-[450px] lg:h-[550px]">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `Crossings at Irving, ${siteConfig.address}`,
              )}&output=embed`}
              title="Crossings at Irving location map"
              className="h-[350px] w-full border-0 md:h-[450px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          {/* DESTINATIONS */}
          <div className="py-2">
            <p className="font-[Plus_Jakarta_Sans] text-xs sm:text-base font-bold tracking-[2px] uppercase text-[#2d3230]">
              Key Destinations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 py-4">
              {homePageConfig.keyDestinations.map((item) => {
                const badgeStyles: Record<string, string> = {
                  gray: "bg-[#EEF1F7] text-[#1e3872] border-[#DCE3EF]",
                  blue: "bg-[#E7EDF8] text-[#244A92] border-[#DCE3EF]",
                  orange: "bg-[#FFF5E8] text-[#B9771B] border-[#F4E3C3]",
                };

                return (
                  <div
                    key={item.title}
                    className="group w-full min-h-[80px] sm:min-h-[80px] md:min-h-[80px] lg:min-h-[80px] xl:min-h-[80px]
        bg-[#F8F5EE] rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4
        flex items-center justify-between border border-[#E6DED2]
        shadow-[0_2px_10px_rgba(0,0,0,0.03)]
        transform transition-all duration-300 ease-out
        hover:-translate-y-2 hover:bg-white
        hover:border-[#d8cbb7]
        hover:shadow-[0_12px_30px_rgba(30,56,114,0.12)]"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl
            bg-[#EEF1F7] border border-[#DCE3EF]
            flex items-center justify-center text-lg sm:text-xl shrink-0
            transition-all duration-300
            group-hover:scale-110 group-hover:rotate-3"
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="font-bold text-[14px] sm:text-[14px] md:text-[14px]
              text-[#2d3230] truncate transition-colors duration-300
              group-hover:text-[#1e3872]"
                        >
                          {item.title}
                        </h3>

                        <p className="font-medium text-[11px] sm:text-[11px] md:text-[11px] text-[#5a6260] truncate mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="ml-2 sm:ml-3 md:ml-4 shrink-0 flex flex-col items-end min-w-[90px] sm:min-w-[110px]">
                      <span
                        className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[8px] md:text-[12px] font-bold border whitespace-nowrap transition-all duration-300 group-hover:scale-105 ${
                          badgeStyles[item.theme]
                        }`}
                      >
                        {item.badge}
                      </span>

                      {item.distance && (
                        <p className="font-semibold text-[10px] sm:text-[10px] md:text-[10px] text-[#2d3230] mt-1 sm:mt-2">
                          {item.distance}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nearby Employers & Schools */}
            <div className="pt-4 pb-4 border-t border-[#e3dfd8]">
              <p className="text-xs font-bold uppercase text-[#5a6260] mb-3 tracking-[1.5px]">
                Nearby Employers & Schools
              </p>

              <div className="flex flex-wrap gap-2">
                {(homePageConfig.nearbyPlaces ?? []).map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="inline-flex items-center text-[11px] sm:text-[12px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#e8ecf4] text-[#1e3872] whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}

                {/* Pet Friendly */}
                <span className="font-[Plus_Jakarta_Sans] inline-flex items-center gap-2 text-xs font-bold bg-[#fdf3e7] text-[#d9871e] px-4 py-2.5 rounded-full border border-[#e09428]/15 whitespace-nowrap ml-auto">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="4" r="2" />
                    <circle cx="18" cy="8" r="2" />
                    <circle cx="20" cy="16" r="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
                    />
                  </svg>
                  Pet Friendly with Bark Park
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= RESIDENT VOICES ================= */}
      <section
        id="residents"
        className="bg-[#0c2340]  px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-12 md:py-20 text-white overflow-hidden relative"
      >
        <div className="max-w-[900px] mx-auto text-center mb-8 md:mb-10 lg:mb-12 relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[rgba(224,148,40,0.8)] mb-3 font-[Plus_Jakarta_Sans] font-extrabold">
            Resident Voices
          </p>
          <h2
            className={`text-2xl sm:text-3xl md:text-5xl ${instrumentSerif.className} font-normal tracking-tight text-[#f5f2ed] leading-tight`}
          >
            Real Stories. Real Residents.
          </h2>
          <p className="text-xs sm:text-sm md:text-[14px] text-[rgba(245,242,237,0.46)] mt-4 max-w-[480px] mx-auto font-[Plus_Jakarta_Sans] leading-[1.65]">
            We're not asking you to forget the past — we're asking for the
            chance to show what's changed.
          </p>
        </div>

        <div className="w-full max-w-[760px] xl:max-w-[820px] mx-auto relative">
          {/* REVIEW CARD */}
          <div
            className={`${instrumentSerif.className} bg-[rgba(245,242,237,0.04)] border border-[rgba(245,242,237,0.1)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 md:p-10 xl:p-[46px] backdrop-blur-[18px] shadow-[0px_24px_64px_rgba(0,0,0,0.36),_inset_0px_1px_0px_rgba(255,255,255,0.05)] relative overflow-hidden`}
          >
            <div
              className={`${instrumentSerif.className} absolute -top-10 -left-10 w-[160px] h-[160px] rounded-full bg-[#1e3872] opacity-60 filter blur-[40px] pointer-events-none`}
            />

            {/* STARS */}
            <div
              className={`${instrumentSerif.className} flex items-center gap-1 mb-4 sm:mb-5`}
            >
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={
                    i < reviews[reviewIndex].rating ? "#1E3872" : "transparent"
                  }
                  stroke={
                    i < reviews[reviewIndex].rating
                      ? "#1E3872"
                      : "rgba(245,242,237,0.20)"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              ))}
              <span className="font-[Plus_Jakarta_Sans] text-[11px] font-semibold text-[rgba(245,242,237,0.38)] ml-1.5">
                {reviews[reviewIndex].rating}.0 / 5
              </span>
            </div>

            {/* QUOTE GLYPH — smaller on mobile */}
            <div className="font-serif text-[3rem] sm:text-[4.5rem] font-normal leading-[0.7] text-[rgba(224,148,40,0.25)] mb-4 select-none tracking-tight">
              &ldquo;
            </div>

            {/* REVIEW TEXT */}
            <p className="text-[14px] sm:text-[16px] md:text-[17px] xl:text-[1.22rem] font-serif italic leading-[1.68] text-[rgba(245,242,237,0.86)] mb-6 sm:mb-7">
              {reviews[reviewIndex].text}
            </p>

            {/* USER INFO */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5 mt-6 sm:mt-8 font-[Plus_Jakarta_Sans]">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] rounded-full bg-[#1e3872] flex items-center justify-center text-[11px] sm:text-[12px] font-extrabold text-white tracking-wide shrink-0 shadow-[0_4px_14px_rgba(30,56,114,0.27)]">
                  {reviews[reviewIndex].initials}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#f5f2ed]">
                    {reviews[reviewIndex].name}
                  </p>
                  <p className="text-[11px] text-[rgba(245,242,237,0.45)] mt-0.5">
                    {reviews[reviewIndex].role}
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(30,56,114,0.15)] border border-[rgba(100,140,210,0.26)] shrink-0 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(100,140,210,0.85)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-[Plus_Jakarta_Sans] text-[11px] font-bold text-[rgba(100,140,210,0.9)] tracking-wide">
                  {reviews[reviewIndex].years}
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <button
            type="button"
            onClick={() =>
              setReviewIndex(
                (reviewIndex - 1 + reviews.length) % reviews.length,
              )
            }
            className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[rgba(245,242,237,0.14)] bg-[rgba(245,242,237,0.05)] items-center justify-center hover:bg-[rgba(245,242,237,0.15)] transition-all duration-200 z-20 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(245,242,237,0.65)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}
            className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[rgba(245,242,237,0.14)] bg-[rgba(245,242,237,0.05)] items-center justify-center hover:bg-[rgba(245,242,237,0.15)] transition-all duration-200 z-20 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(245,242,237,0.65)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          {/* MOBILE NAV */}
          <div className="flex xl:hidden justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={() =>
                setReviewIndex(
                  (reviewIndex - 1 + reviews.length) % reviews.length,
                )
              }
              className="w-11 h-11 rounded-full border border-[rgba(245,242,237,0.14)] bg-[rgba(245,242,237,0.05)] flex items-center justify-center active:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(245,242,237,0.65)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}
              className="w-11 h-11 rounded-full border border-[rgba(245,242,237,0.14)] bg-[rgba(245,242,237,0.05)] flex items-center justify-center active:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(245,242,237,0.65)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setReviewIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === reviewIndex ? "w-7 bg-[#1e3872]" : "w-2 bg-[rgba(245,242,237,0.18)]"}`}
            />
          ))}
        </div>

        {/* TRUST PROMISES — grid on mobile, flex on sm+ */}
        <div className="mt-8 md:mt-11 pt-6 md:pt-9 border-t border-[rgba(245,242,237,0.07)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 justify-items-start sm:justify-items-center max-w-[860px] mx-auto">
            {[
              {
                icon: (
                  <>
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </>
                ),
                label: "Professionally Managed",
                sub: "LiveNJoy Management since 2025",
              },
              {
                icon: (
                  <>
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </>
                ),
                label: "Resident-First Approach",
                sub: "Maintenance · Communication · Care",
              },
              {
                icon: (
                  <>
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </>
                ),
                label: "Honest & Transparent",
                sub: "No gimmicks — just a better home",
              },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[rgba(30,56,114,0.2)] border border-[rgba(100,140,210,0.24)] flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(100,140,210,0.88)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="font-[Plus_Jakarta_Sans] text-xs font-bold text-[rgba(245,242,237,0.82)]">
                    {label}
                  </p>
                  <p className="font-[Plus_Jakarta_Sans] text-[10px] text-[rgba(245,242,237,0.36)] mt-0.5">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ARTICLES CAROUSEL ================= */}
      <section className="w-full bg-[#f5f2ed] py-14 sm:py-16 md:py-20 font-[Plus_Jakarta_Sans] antialiased select-none">
        <div className="mx-auto max-w-[1920px] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
          {/* HEADER */}
          <div className="mb-8 sm:mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5A6260]">
                Fort worth Living Guide
              </p>
              <h2
                className={`${instrumentSerif.className} text-[28px] sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.1] text-[#2D3230]`}
              >
                Stories from the Neighborhood
              </h2>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-3 pb-2 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-full border border-black/5 transition-all duration-200 ${
                  currentIndex === 0
                    ? "bg-black/[0.02] text-[#2D3230] opacity-20 cursor-default"
                    : "bg-white text-[#1e3872] shadow-sm cursor-pointer hover:bg-white/80 active:scale-95"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className={`flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-full transition-all duration-200 ${
                  currentIndex === maxIndex
                    ? "border border-black/5 bg-black/[0.02] text-[#2D3230] opacity-20 cursor-default"
                    : "bg-[#1e3872] text-[#f5f2ed] shadow-[rgba(30,56,114,0.2)_0px_4px_12px] cursor-pointer hover:bg-[#152750] active:scale-95"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <div className="mx-1 sm:mx-2 h-5 w-px bg-[#D6D0C8]" />

              <Link
                href="/blog/"
                className="group hidden sm:flex items-center gap-1 text-[13px] font-bold text-[#1e3872] tracking-wide transition-all duration-300 hover:text-[#152750]"
              >
                View All
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* CAROUSEL TRACK */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pb-4"
              style={{
                gap: `${cardGap}px`,
                transform: `translateX(calc(-${currentIndex * (100 / cols)}% - ${(currentIndex * cardGap) / cols}px))`,
              }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(cols - 1) * cardGap}px) / ${cols})`,
                  }}
                >
                  <article className="overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#fdfcfa] border border-[#e5e1dc]/40 shadow-[rgba(30,56,114,0.02)_0px_1px_4px]">
                    <div className="relative h-[200px] sm:h-[240px] overflow-hidden p-2.5 sm:p-3 pb-0">
                      <img
                        className="h-full w-full rounded-[14px] sm:rounded-[16px] object-cover"
                        src={article.image}
                        alt={article.title}
                      />
                      <div
                        className={`absolute left-5 sm:left-6 top-5 sm:top-6 rounded-full px-2.5 sm:px-3 py-1 text-[10px] font-bold tracking-wide ${article.categoryColor}`}
                      >
                        {article.category}
                      </div>
                      <div className="absolute right-5 sm:right-6 top-5 sm:top-6 flex items-center gap-1 rounded-full bg-black/60 px-2 sm:px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-[9px] font-semibold text-white/80">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-4 sm:p-6 pt-4 sm:pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`flex h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${article.authorBg}`}
                        >
                          {article.authorInitials}
                        </div>
                        <span className="text-[11px] font-medium text-[#5A6260]">
                          {article.authorName}
                        </span>
                        <span className="text-[11px] text-[#A09890]">·</span>
                        <span className="text-[11px] text-[#A09890]">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-serif text-[18px] sm:text-[21px] font-normal leading-[1.25] text-[#2D3230] mb-2 sm:mb-2.5 line-clamp-2 min-h-[44px] sm:min-h-[52px]">
                        {article.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] font-light leading-relaxed text-[#5A6260]/90 mb-4 sm:mb-5 line-clamp-2 min-h-[34px] sm:min-h-[38px]">
                        {article.description}
                      </p>
                      <Link
                        href="/blog/"
                        className="group hidden sm:flex items-center gap-1 text-[13px] font-bold text-[#1e3872] tracking-wide transition-all duration-300 hover:text-[#152750]"
                      >
                        <div className="flex items-center gap-1 text-[12px] font-bold text-[#1e3872] cursor-pointer hover:text-[#152750] transition-colors w-fit">
                          <span>Read Article</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* PAGINATION DOTS */}
          <div className="mt-5 sm:mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
              <div
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`h-[7px] rounded-full cursor-pointer transition-all duration-300 ease-out ${
                  currentIndex === dotIndex
                    ? "w-6 bg-[#1e3872]"
                    : "w-[7px] bg-[#C8C3BB] hover:bg-[#C8C3BB]/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <HousingVoucher />

      {/* ================= LEASING CTA ================= */}
      <section
        id="leasing-cta"
        className="bg-[#0c1a3a] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-16 sm:py-[100px] scroll-mt-[72px] relative overflow-hidden text-white"
      >
        {/* Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 80%, rgba(30, 56, 114, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Decorative glyph — scaled per breakpoint */}
        <div className="absolute -right-[40px] sm:-right-[60px] -top-[60px] sm:-top-[80px] font-serif text-[10rem] sm:text-[18rem] lg:text-[28rem] leading-none text-[rgba(245,242,237,0.024)] tracking-[-0.05em] select-none pointer-events-none font-normal">
          P
        </div>

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-[5.56vw] relative z-10 text-center">
          <p className="font-[Plus_Jakarta_Sans] text-[11px] font-bold tracking-[0.14em] uppercase text-[rgba(224,148,40,0.85)] mb-4">
            Ready to Begin?
          </p>

          <h2
            className={`${instrumentSerif.className} text-[clamp(2rem,5vw,4.2rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[#f5f2ed] mb-5 max-w-[1920px] mx-auto`}
          >
            Make Crossings at Irving
            <br />
            <span className="text-[rgba(245,242,237,0.6)] italic">
              Your Home
            </span>
          </h2>

          <p className="font-[Plus_Jakarta_Sans] text-[14px] sm:text-[16px] leading-[1.65] text-[rgba(245,242,237,0.55)] mb-8 sm:mb-11 max-w-[480px] mx-auto">
            Start your application online or schedule a private tour with our
            leasing team today.
          </p>

          {/* CTA BUTTONS — stack on mobile */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-3.5 flex-wrap mb-10 sm:mb-12 px-4 sm:px-0">
            <a
              href={headerConfig.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 sm:px-9 py-4 sm:py-[15px] rounded-full bg-[#1e3872] text-[#f5f2ed] font-[Plus_Jakarta_Sans] text-[14px] sm:text-[15px] font-bold cursor-pointer shadow-[rgba(30,56,114,0.5)_0px_4px_24px] tracking-[0.01em] border-none outline-none hover:opacity-95 transition-opacity"
            >
              Apply Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#"
              onClick={handleScheduleTour}
              className="flex items-center justify-center gap-2 px-8 sm:px-9 py-4 sm:py-[15px] rounded-full bg-transparent text-[rgba(245,242,237,0.85)] font-[Plus_Jakarta_Sans] text-[14px] sm:text-[15px] font-semibold border-[1.5px] border-[rgba(245,242,237,0.25)] cursor-pointer tracking-[0.01em] hover:bg-white/[0.03] transition-colors"
            >
              Schedule a Private Tour
            </a>
          </div>

          {/* CONTACT INFO — stack on mobile */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <Phone size={17} className="text-[#76a1ff] shrink-0" />

              <span className="font-[Plus_Jakarta_Sans] text-[13px] text-[rgba(245,242,237,0.55)]">
                {siteConfig.phone}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={17} className="text-[#76a1ff] shrink-0" />

              <span className="font-[Plus_Jakarta_Sans] text-[13px] text-[rgba(245,242,237,0.55)]">
                {siteConfig.email}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={17} className="text-[#76a1ff] shrink-0 mt-[3px]" />

              <span className="font-[Plus_Jakarta_Sans] text-[13px] text-[rgba(245,242,237,0.55)]">
                {siteConfig.hours}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-[Plus_Jakarta_Sans] text-[13px] text-[rgba(245,242,237,0.55)]">
                {siteConfig.hours1}
              </span>
            </div>
          </div>
        </div>
      </section>

      <PromoCardWidget />

      <Footer />

      <FooterLegalBar />
      <TourScheduler
        open={showTourScheduler}
        onClose={() => setShowTourScheduler(false)}
      />
    </>
  );
}
