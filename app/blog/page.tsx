"use client";
import { useState } from "react";
import HeaderOther from "@/app/components/HeaderOther";
import Footer from "@/app/components/Footer";
import { images, type Post, posts, featuredPost } from "@/app/config/content";

import PromoCardWidget from "@/app/components/PromoCardWidget";
import FooterLegalBar from "@/app/components/FooterLegalBar";

export default function Blog() {
  const getBlogAlt = (src: string) => {
    const altMap: Record<string, string> = {
      [images.blog1]: images.blog_alt1,
      [images.blog2]: images.blog_alt2,
      [images.blog3]: images.blog_alt3,
    };

    return altMap[src] ?? "Crossings at Irving in IRVING, Texas";
  };
  const [showTopBar, setShowTopBar] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <PromoCardWidget />
      <HeaderOther />
      <section className="bg-[#1f376d] text-white pt-32 pb-24 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto relative overflow-hidden">
        <div className="relative z-10 max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-[#E09428] mb-6 mt-[15px] font-bold uppercase">
            IRVING LIVING GUIDE
          </p>

          <h1 className="font-[Instrument_Serif] text-[54px] md:text-[54px] sm:text-[54px] lg:text-[54px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
            The Crossings at Irving
            <br />
            <span className="text-[#E39B2D] italic">Lifestyle Blog</span>
          </h1>

          <p className="mt-8 text-[#bfc6d6] text-base md:text-lg leading-relaxed max-w-2xl font-[Plus_Jakarta_Sans]">
            Your curated guide to life around Crossings at Irving, featuring
            local dining, outdoor recreation, neighborhood attractions, and
            everyday experiences in Irving, Texas.
          </p>
        </div>
      </section>

      {/* FEATURED CARD */}
      <section className="bg-[#f5f2ed] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto  pt-32 py-24 md:py-28 md:pt-14 pb-24 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="grid md:grid-cols-2 rounded-3xl overflow-hidden border bg-white
                shadow-sm hover:shadow-2xl
                hover:-translate-y-1
                transition-all duration-300 ease-in-out"
          >
            <div className="relative min-h-[320px]">
              <img
                src={featuredPost.img}
                alt={getBlogAlt(featuredPost.img)}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-[Plus_Jakarta_Sans] bg-[#E39B2D] text-white text-xs px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="font-[Plus_Jakarta_Sans] bg-[#E39B2D]/90 text-white text-xs px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="font-[Plus_Jakarta_Sans] w-8 h-8 flex items-center justify-center rounded-full border border-[#e7c28d] text-xs font-semibold text-[#E39B2D] bg-[#f4eadc]">
                    {featuredPost.initials}
                  </div>
                  <p className="font-[Plus_Jakarta_Sans] text-[#6b7280]">
                    {featuredPost.author}
                    <span className="mx-2">·</span>
                    {featuredPost.date}
                  </p>
                </div>

                <h2 className="mt-6 text-2xl md:text-4xl font-[Instrument_Serif] leading-tight text-[#2d3230]">
                  {featuredPost.title}
                </h2>

                <p className="font-[Plus_Jakarta_Sans] mt-4 text-[#6b7280] text-base md:text-lg leading-relaxed max-w-xl">
                  {featuredPost.description}
                </p>
              </div>

              <div className="mt-10">
                <p className="font-[Plus_Jakarta_Sans] text-sm text-[#6b7280] flex items-center gap-2">
                  ⏱ {featuredPost.readTime} read
                </p>

                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="font-[Plus_Jakarta_Sans] mt-4 text-[#1E3872] font-semibold hover:underline flex items-center gap-2"
                >
                  Read Article →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="bg-[#f5f2ed] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto pb-24">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-[28px] border border-[#ddd7cf] bg-white
                shadow-sm hover:shadow-2xl
                hover:-translate-y-1
                transition-all duration-300 ease-in-out"
              >
                <div className="font-[Plus_Jakarta_Sans] relative">
                  <img
                    src={post.img}
                    alt={getBlogAlt(post.img)}
                    className="w-full h-[250px] object-cover"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-[#d5cdc2]/90 text-[#1e3872] text-sm font-medium px-4 py-2">
                    {post.category}
                  </span>

                  <span className="absolute top-4 right-4 rounded-full bg-[#444a57]/90 text-white text-sm font-medium px-4 py-2">
                    ◔ {post.readTime}
                  </span>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 text-sm text-[#8a8f98]">
                    <div className="font-[Plus_Jakarta_Sans] w-8 h-8 rounded-full border border-[#b7bfd0] flex items-center justify-center text-[11px] text-[#1e3872] bg-[#edf1f8]">
                      {post.initials}
                    </div>
                    <p>
                      <span className="font-[Plus_Jakarta_Sans] text-[#334155] font-medium">
                        {post.author}
                      </span>
                      <span className="font-[Plus_Jakarta_Sans] mx-2 text-[#b0b4bb]">
                        ·
                      </span>
                      {post.date}
                    </p>
                  </div>

                  <h3 className="mt-5 text-[28px] leading-[1.15] text-[#1f2937] font-[Instrument_Serif]">
                    {post.title}
                  </h3>

                  <p className="font-[Plus_Jakarta_Sans] mt-4 text-[16px] leading-8 text-[#5f6773]">
                    {post.description}
                  </p>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="font-[Plus_Jakarta_Sans] mt-6 text-[#1e3a8a] font-semibold text-[16px] flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read Article <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[999] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[28px] bg-[#f7f4ef] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="sticky top-4 ml-auto mr-4 mt-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/45"
            >
              ✕
            </button>

            <div className="-mt-15">
              <div className="relative h-[260px] md:h-[380px] w-full overflow-hidden">
                <img
                  src={selectedPost.img}
                  alt={getBlogAlt(selectedPost.img)}
                  className="w-full h-full object-cover"
                />

                <div className="absolute left-6 bottom-5">
                  <span className="rounded-full bg-[#E39B2D] text-white text-sm font-medium px-4 py-2">
                    {selectedPost.category}
                  </span>
                </div>
              </div>

              <div className="px-6 md:px-10 py-8 md:py-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8b8f96]">
                  <div className="w-9 h-9 rounded-full border border-[#e2c592] bg-[#f3e7d4] flex items-center justify-center text-[11px] text-[#d8921f] font-semibold">
                    {selectedPost.initials}
                  </div>
                  <span className="text-[#374151] font-medium">
                    {selectedPost.author}
                  </span>
                  <span>·</span>
                  <span>{selectedPost.date}</span>
                  <span>·</span>
                  <span>{selectedPost.readTime} read</span>
                </div>

                <h2 className="mt-6 text-[34px] md:text-[58px] leading-[1.05] text-[#1f2a37] font-[Instrument_Serif] max-w-4xl">
                  {selectedPost.title}
                </h2>

                <p className="mt-5 text-[20px] md:text-[26px] leading-relaxed italic text-[#667085] max-w-3xl">
                  {selectedPost.description}
                </p>

                <div className="mt-8 w-14 h-[2px] bg-[#E39B2D]" />

                <div className="mt-8 space-y-6">
                  {selectedPost.content.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-[18px] md:text-[20px] leading-[2] text-[#243040]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <FooterLegalBar />
    </>
  );
}
