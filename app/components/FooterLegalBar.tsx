import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

export default function FooterLegalBar() {
  return (
    <section className="bg-[#0f1e48] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto text-white">
      <div className="py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center text-[11px]">
          <span className="text-white/30">
            © 2026 Crossings at Irving · A LiveNJoy Community.
          </span>
          {[
            { label: "Privacy Policy", href: "/legal/" },
            { label: "Terms of Use", href: "/legal/" },
            { label: "Fair Housing", href: "/legal/" },
            { label: "Accessibility", href: "/legal/" },
          ].map((item) => (
            <div key={item.label} className="inline-flex items-center">
              <span className="mx-2 text-white/20">·</span>

              <Link
                href={item.href}
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                {item.label}
              </Link>
            </div>
          ))}

          <div className="px-4">
            <Image
              src="/images/eho.png"
              alt="Fair Housing Logo"
              width={200}
              height={80}
              className="w-[50px] h-auto object-contain opacity-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://www.sbstechnologies.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#6B8FD4]/60 hover:text-[#6B8FD4] transition-colors"
          >
            Built by SBS Technologies →
          </Link>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-9 h-9 rounded-lg border border-[#1E3872]/40 bg-[#1E3872]/15 flex items-center justify-center hover:bg-[#1E3872]/25 transition-all"
          >
            <ArrowUp size={14} className="text-white/60" />
          </button>
        </div>
      </div>
    </section>
  );
}
