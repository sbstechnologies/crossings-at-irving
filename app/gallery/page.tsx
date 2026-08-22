"use client";

import { useState, useEffect } from "react";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import {
  images,
  type Category,
  type GalleryItem,
  gallery,
} from "@/app/config/content";
import FooterLegalBar from "@/app/components/FooterLegalBar";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

type FilterType = "All" | Category;

type ImageCardProps = {
  item: GalleryItem;
  index: number;
  onView: (index: number) => void;
};

function ImageCard({ item, index, onView }: ImageCardProps) {
  return (
    <div
      onClick={() => onView(index)}
      className="relative group cursor-pointer overflow-hidden rounded-[22px] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out break-inside-avoid mb-5"
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-auto object-cover transition duration-300 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition duration-300" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute bottom-4 left-4 z-10 text-white  pr-4">
        <h3
          className={`text-sm md:text-lg leading-snug ${instrumentSerif.className}`}
        >
          {item.name}
        </h3>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Filters out the 18th item globally (index 17 corresponds to 6th row, 3rd column in a 3-column setup)
  const filteredGallery = (
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeFilter)
  ).filter((_, index) => index !== 17);

  const filters: { label: FilterType; count: string }[] = [
    {
      label: "All",
      count: String(gallery.length),
    },
    {
      label: "Exteriors",
      count: String(
        gallery.filter((item) => item.category === "Exteriors").length,
      ),
    },
    {
      label: "Interiors",
      count: String(
        gallery.filter((item) => item.category === "Interiors").length,
      ),
    },
    {
      label: "Amenities",
      count: String(
        gallery.filter((item) => item.category === "Amenities").length,
      ),
    },
    {
      label: "Neighborhood",
      count: String(
        gallery.filter((item) => item.category === "Neighborhood").length,
      ),
    },
  ];

  const closeModal = () => setCurrentIndex(null);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredGallery.length,
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + filteredGallery.length) % filteredGallery.length,
    );
  };

  useEffect(() => {
    setCurrentIndex(null);
  }, [activeFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, filteredGallery.length]);

  return (
    <>
      <PromoCardWidget />
      <HeaderOther />

      {/* HERO SECTION */}
      <section className="bg-[#1E3872] text-[#F5F2ED] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-24 md:py-28 font-[Plus_Jakarta_Sans]">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] text-[#E09428] mb-6 mt-[15px] font-bold uppercase">
            Community Gallery
          </p>

          <h1 className="font-[Instrument_Serif] text-[56px] md:text-[56px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
            Life at <br />
            <span className="text-[#E09428] italic">Crossings at Irving</span>
          </h1>

          <p className="mt-8 text-[#c7c3bd] max-w-xl text-sm md:text-base leading-relaxed">
            Explore our community — from beautifully appointed,
            rustic-yet-refined interiors to our luxury amenity spaces and
            vibrant surrounding Fossil Creek neighborhood.
          </p>
          <p className="mt-8 text-[#c7c3c0] max-w-xl text-sm md:text-base leading-relaxed">
            {gallery.length} PHOTOS ACROSS{" "}
            {new Set(gallery.map(({ category }) => category)).size} CATEGORIES
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-[#e5e1d8] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-4 font-[Plus_Jakarta_Sans]">
        <div className="max-w-[1920px] mx-auto flex gap-3 overflow-x-auto">
          {filters.map(({ label }) => {
            const count =
              label === "All"
                ? gallery.length
                : gallery.filter(({ category }) => category === label).length;

            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={`shrink-0 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  activeFilter === label
                    ? "bg-[#1e3872] text-white border-[#1e3872]"
                    : "bg-white text-[#4d5552] border-[#d4d9e2] hover:bg-[#f5f2ee]"
                }`}
              >
                {label}

                <span
                  className={`ml-2 text-xs ${
                    activeFilter === label ? "text-white/75" : "text-[#9aa3af]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GALLERY SECTION */}
      <section className="bg-[#F5F2ED] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-10 md:py-14">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-5">
            {filteredGallery.map((item, index) => (
              <ImageCard
                key={`${item.src}-${index}`}
                item={item}
                index={index}
                onView={setCurrentIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FULL IMAGE MODAL */}
      {currentIndex !== null && filteredGallery[currentIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 md:top-7 md:right-7 text-white text-3xl md:text-4xl z-50"
            aria-label="Close image"
          >
            ✕
          </button>

          <button
            onClick={prevImage}
            className="absolute left-3 md:left-6 text-white text-4xl md:text-5xl z-50 bg-white/10 hover:bg-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="w-full max-w-6xl flex flex-col items-center">
            <img
              src={filteredGallery[currentIndex].src}
              alt={filteredGallery[currentIndex].alt}
              className="max-w-[92%] max-h-[82vh] object-contain rounded-xl"
            />

            <div className="mt-4 text-center text-white px-4">
              <p className="text-xs md:text-sm opacity-70 uppercase tracking-[0.18em]">
                Full View
              </p>
              <h3 className="text-lg md:text-2xl font-serif mt-1">
                {filteredGallery[currentIndex].name}
              </h3>
              <p className="text-sm opacity-70 mt-1">
                {currentIndex + 1} / {filteredGallery.length}
              </p>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-3 md:right-6 text-white text-4xl md:text-5xl z-50 bg-white/10 hover:bg-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      <Footer />

      <FooterLegalBar />
    </>
  );
}
