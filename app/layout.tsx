import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";
import { Instrument_Serif } from "next/font/google";

import "@/app/globals.css";

import DisableInspect from "@/app/components/DisableInspect";
import SmoothScroll from "@/app/components/SmoothScroll";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://crossingsatirvingapts.com";

const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Crossings at Irving Apartment Homes";

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? "9724570421";

const LEASING_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL ?? "crossingsmanager@livenjoymgt.com";

const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS ?? "1900 Estrada Pkwy";

const CITY = process.env.NEXT_PUBLIC_CITY ?? "Irving";

const STATE = process.env.NEXT_PUBLIC_STATE ?? "TX";

const ZIP = process.env.NEXT_PUBLIC_ZIP ?? "75061";

const OG_IMAGE = `${SITE_URL}/images/logo.png`;

const FULL_PHONE = `+1${PHONE}`;

/* =========================================================
   DISPLAY FONT
========================================================= */

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3872",
  colorScheme: "light",
};

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Crossings at Irving | Apartments in Irving, TX",
    template: "%s | Crossings at Irving",
  },

  description:
    "Discover Crossings at Irving Apartment Homes in Irving, Texas. Explore 1 and 2 bedroom apartments, floor plans, community amenities, local attractions, and leasing options.",

  keywords: [
    "Crossings at Irving",
    "Crossings at Irving Apartments",
    "Crossings Apartments Irving TX",
    "Irving Apartments",
    "Apartments in Irving TX",
    "Irving Texas Apartments",
    "1 Bedroom Apartments Irving",
    "2 Bedroom Apartments Irving",
    "Pet Friendly Apartments Irving",
    "Apartments near DFW Airport",
    "Apartments near Highway 183",
    "Apartments near Highway 161",
    "Apartments near North Lake College",
    "Apartments near University of Dallas",
    "Apartments near Las Colinas",
    "DFW Area Apartments",
  ],

  applicationName: COMPANY_NAME,

  authors: [
    {
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  ],

  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,

  category: "Real Estate",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  manifest: "/site.webmanifest",

  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY_NAME,

    title: "Crossings at Irving | Apartments in Irving, TX",

    description:
      "Explore 1 and 2 bedroom apartment homes, floor plans, community amenities, and convenient living at Crossings at Irving in Irving, Texas.",

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Crossings at Irving Apartment Homes in Irving, Texas",
      },
    ],
  },

  /* =======================================================
     TWITTER
  ======================================================= */

  twitter: {
    card: "summary_large_image",

    title: "Crossings at Irving | Apartments in Irving, TX",

    description:
      "Explore 1 and 2 bedroom apartments, floor plans, community amenities, and convenient living at Crossings at Irving.",

    images: [OG_IMAGE],
  },

  /* =======================================================
     FAVICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  referrer: "origin-when-cross-origin",
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const apartmentSchema = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",

  "@id": `${SITE_URL}/#apartment-complex`,

  name: COMPANY_NAME,

  description:
    "Crossings at Irving Apartment Homes offers comfortable one and two bedroom apartment homes in Irving, Texas.",

  url: SITE_URL,

  image: [OG_IMAGE],

  telephone: FULL_PHONE,

  email: LEASING_EMAIL,

  priceRange: "$$",

  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: CITY,
    addressRegion: STATE,
    postalCode: ZIP,
    addressCountry: "US",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: FULL_PHONE,
    contactType: "leasing",
    email: LEASING_EMAIL,
    areaServed: "US",
    availableLanguage: ["English"],
  },

  numberOfBedrooms: ["1", "2"],

  petsAllowed: true,

  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Swimming Pool",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Fitness Center",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Sports & Recreation Areas",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Playground",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "BBQ & Picnic Areas",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Pet Friendly",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Pet Park",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Package Lockers",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Controlled Access",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "High-Speed Internet",
      value: true,
    },
  ],
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className="min-h-screen font-sans antialiased">
        {/* Google Tag Manager */}
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(apartmentSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Production Protection */}
        {process.env.NODE_ENV === "production" && <DisableInspect />}

        {/* Smooth Scroll */}
        <SmoothScroll />

        {/* Application */}
        {children}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1E3872",
              color: "#ffffff",
              borderRadius: "12px",
              fontFamily: '"Plus Jakarta Sans Variable", sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
