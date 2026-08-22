"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

import { headerConfig } from "@/app/config/content";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

type HeaderProps = {
  showTopBar: boolean;
};

export default function Header({ showTopBar }: HeaderProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = ["amenities", "neighborhood"];

    const handleScroll = () => {
      const position = window.scrollY + 180;

      let current: string | null = null;

      for (const id of sections) {
        const element = document.getElementById(id);

        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (position >= top && position < bottom) {
          current = id;
          break;
        }
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;

    if (href.includes("#")) {
      const hash = href.split("#")[1];

      return pathname === "/" && activeSection === hash;
    }

    if (href === "/") {
      return pathname === "/" && !activeSection;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const desktopLinkClass = (active: boolean) =>
    `relative flex h-16 items-center text-sm font-semibold transition-colors duration-200 ${
      active ? "text-[#1e3872]" : "text-[#2d3230] hover:text-[#1e3872]"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
      active
        ? "bg-[#1e3872]/10 text-[#1e3872]"
        : "text-[#2d3230] hover:bg-gray-50 hover:text-[#1e3872]"
    }`;

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        showTopBar ? "top-0 md:top-11" : "top-0"
      }`}
    >
      <div className="border-b border-gray-200/50 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6 sm:px-6 xl:px-40 xxl:px-80">
          {/* Logo */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-2 md:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--primary)]">
              <Image
                src={headerConfig.logo.image_url}
                alt={headerConfig.logo.alt_title}
                width={40}
                height={40}
                priority
              />
            </div>

            <div className="min-w-0">
              <p
                className={`${instrumentSerif.className} truncate font-semibold text-gray-700 md:text-lg`}
              >
                {headerConfig.logo.title}
              </p>

              <p
                className={`${jakarta.className} text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--light-grey)] md:text-[9px]`}
              >
                {headerConfig.logo.subtitle}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden h-16 items-center gap-8 lg:flex">
            {headerConfig.navLinks.map((link) => {
              const active = isActive(link.href, link.external);

              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={desktopLinkClass(false)}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={desktopLinkClass(active)}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-[3px] left-0 h-[2px] rounded-full bg-[#1e3872] transition-all duration-300 ${
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}

          <a
            href={headerConfig.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#1e3872] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#152750] hover:shadow-md lg:inline-flex"
          >
            <span>{headerConfig.applyText}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-[#2d3230] transition-all duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-[#2d3230] transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-[#2d3230] transition-all duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}

        {open && (
          <div className="border-t border-gray-200 bg-white shadow-lg lg:hidden">
            <nav className="flex flex-col gap-1 p-6">
              {headerConfig.navLinks.map((link) => {
                const active = isActive(link.href, link.external);

                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={mobileLinkClass(false)}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className={mobileLinkClass(active)}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}

                      {active && (
                        <span className="h-2 w-2 rounded-full bg-[#1e3872]" />
                      )}
                    </span>
                  </Link>
                );
              })}

              {/* Mobile CTA */}

              <a
                href={headerConfig.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1e3872] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#152750]"
              >
                <span>{headerConfig.applyText}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
