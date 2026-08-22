"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerConfig } from "@/app/config/content";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;

    // Hash links such as /#amenities
    if (href.includes("#")) {
      const [path] = href.split("#");

      // Active only when on the homepage
      return pathname === (path || "/");
    }

    // Homepage
    if (href === "/") {
      return pathname === "/";
    }

    // Exact page or nested route
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="flex items-center gap-8">
      {headerConfig.navLinks.map((item) => {
        const active = isActive(item.href, item.external);

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative text-sm font-medium transition-colors ${
              active ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {item.label}

            {active && (
              <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-[#c9a96e]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
