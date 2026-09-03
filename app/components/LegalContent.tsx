import { motion } from "framer-motion";

import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "../config/content";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export default function LegalContent() {
  return (
    <main className={`${jakarta.variable} bg-[#F5F2ED] text-[#4A4A4A]`}>
      <motion.div
        className="bg-[#F5F2ED] pt-10 pb-24 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
      >
        {/* =========================
    PRIVACY POLICY
========================= */}

        <motion.h1 className="font-[Instrument_Serif] text-[58px] leading-[0.95] tracking-[-0.03em] text-[#232323] mt-10 mb-10">
          Privacy Policy
        </motion.h1>

        {/* Your Acceptance Through Express Consent */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Your Acceptance Through Express Consent
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          Your privacy and informed consent are important to us. This Privacy
          Policy explains how{" "}
          <strong className="font-semibold text-[#232323]">
            Crossings at Irving
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-[#232323]">
            LiveNJoy Management
          </strong>{" "}
          collect, use, protect, and disclose personal information obtained
          through our website and standard community leasing activities. By
          using this website or submitting your information through our forms,
          you expressly consent to the practices described in this Privacy
          Policy. We reserve the right to update this policy at any time and
          encourage you to review it periodically to remain informed of any
          changes.
        </motion.p>

        {/* The Types of Information We Collect */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          The Types of Information We Collect
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          We may collect personal information that you voluntarily provide or
          that is automatically collected while using our website. The
          information we collect includes:
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Application &amp; Identity Data:
          </strong>{" "}
          When you apply for a lease or submit a pre-application, we may collect
          your name, physical address, email address, mobile number,
          government-issued identification, date of birth, household income, and
          employment history.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Digital &amp; Network Activity:
          </strong>{" "}
          When you visit our website, we automatically collect technical
          information such as your IP address, device identifier, browser type,
          approximate location, and details about the pages you visit and your
          interactions with the website.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Communications Data:
          </strong>{" "}
          When you communicate with our leasing office through contact forms,
          email, or text messages, we retain records of those communications in
          order to respond to your inquiries, provide requested services, and
          improve our customer support.
        </motion.p>

        {/* =========================
    HOW WE USE YOUR INFORMATION
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          How We Use Your Information
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Offerings Where You Expressed Interest:
          </strong>{" "}
          When you provide personal information through our scheduling tools or
          contact forms, we use it to communicate with you about apartment
          availability, community pricing, and the residential services you have
          requested.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Marketing &amp; Community Updates:
          </strong>{" "}
          To keep prospects and residents informed about community news, special
          offers, and upcoming events, we may send emails, text messages, and
          marketing communications to the contact information you provide. You
          may unsubscribe at any time by following the opt-out instructions
          included in the message or by replying{" "}
          <strong className="font-semibold text-[#232323]">STOP</strong> to text
          messages.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            General Operations:
          </strong>{" "}
          We may also use your personal information to evaluate and improve our
          business operations, pricing strategies, website functionality, and
          resident satisfaction.
        </motion.p>

        {/* =========================
    THIRD PARTIES WITH WHOM WE SHARE PERSONAL INFORMATION
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Third Parties With Whom We Share Personal Information
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          We do{" "}
          <strong className="font-semibold text-[#232323]">not sell</strong>{" "}
          your personal information. However, we may share your information with
          trusted third-party companies that assist us in operating and managing
          our community and services.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          These service providers may include property management platforms,
          applicant screening providers, credit reporting agencies, cloud
          hosting providers, marketing and advertising partners, analytics
          services such as{" "}
          <strong className="font-semibold text-[#232323]">
            Microsoft Clarity
          </strong>
          , utility billing providers, maintenance dispatchers, pest control
          contractors, and other vendors necessary to support property
          operations and resident services.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Legally Compelled Disclosure:
          </strong>{" "}
          We may disclose personal information when required by law, court
          order, subpoena, or other lawful governmental request, or when
          necessary to protect our legal rights, property, residents, or the
          safety of others.
        </motion.p>

        {/* =========================
            DATA RETENTION & SECURITY
            ========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Data Retention &amp; Security
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          We retain the personal information we collect only for as long as
          necessary to fulfill the purpose for which it was collected or to
          comply with applicable
          <strong className="font-semibold text-[#232323]">
            {" "}
            Texas real estate record-keeping
          </strong>{" "}
          and
          <strong className="font-semibold text-[#232323]">
            {" "}
            financial regulatory requirements
          </strong>
          .
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          We utilize industry-standard security measures, including{" "}
          <strong className="font-semibold text-[#232323]">
            Secure Socket Layer (SSL)
          </strong>{" "}
          encryption technology, to help protect personal information during
          both transmission and storage.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          While we strive to safeguard your information, no method of Internet
          transmission or electronic storage is completely secure. By using this
          website, you acknowledge and accept the inherent risks associated with
          online communications and data transmission.
        </motion.p>

        {/* =========================
    YOUR TEXAS DATA PRIVACY RIGHTS
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Your Texas Data Privacy Rights (TDPSA)
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          In accordance with the{" "}
          <strong className="font-semibold text-[#232323]">
            Texas Data Privacy and Security Act (TDPSA)
          </strong>
          , Texas residents have specific rights regarding their personal
          information. These rights may be exercised by contacting our
          designated privacy representative.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Right to Access:
          </strong>{" "}
          You may request confirmation that we are processing your personal
          information and request access to the data we have collected about
          you.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Right to Correction &amp; Deletion:
          </strong>{" "}
          You may request corrections to inaccurate information or request
          deletion of personal data when it is no longer required for active
          leasing or legal compliance.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Right to Opt-Out:
          </strong>{" "}
          You may opt out of the processing of personal information for targeted
          advertising through our Cookie Preference Manager.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B]">
          <strong className="font-semibold text-[#232323]">
            To Submit a Request:
          </strong>{" "}
          Please send all requests regarding data access, correction, or
          deletion to{" "}
          <a
            href="mailto:wstmanager@livenjoymgt.com"
            className="font-semibold text-[#294B86] hover:underline"
          >
            wstmanager@livenjoymgt.com
          </a>
          .
        </motion.p>

        {/* =========================
    OUR COOKIE POLICY
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Our Cookie Policy
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          By browsing our website, you consent to the use of cookies. A cookie
          is a small text file stored on your computer, mobile phone, or other
          device that helps improve your browsing experience and enables certain
          website features. We categorize cookies into different functional
          groups that you can manage at any time through our Cookie Settings.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Strictly Necessary Cookies:
          </strong>{" "}
          Required to enable essential security features, validate user
          sessions, and support online leasing applications. These cookies are
          necessary for the website to function properly and cannot be disabled.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Performance &amp; Analytics Cookies:
          </strong>{" "}
          Used to analyze website traffic and improve user experience through
          services such as Microsoft Clarity. These cookies remain disabled
          until you provide your consent.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Marketing &amp; Targeting Cookies:
          </strong>{" "}
          Used by trusted advertising partners to measure campaign performance
          and deliver relevant promotional content. These cookies are disabled
          by default until consent is provided.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          <strong className="font-semibold text-[#232323]">
            Avoiding and Disabling Cookies:
          </strong>{" "}
          If you prefer not to use cookies, you may restrict, block, or delete
          them at any time through your web browser settings. Please note that
          disabling certain cookies may affect the functionality of this
          website.
        </motion.p>

        {/* =========================
    LINKS TO OTHER WEBSITES
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Links to Other Websites
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          Our website may contain links to third-party websites for your
          convenience. Crossings at Irving and LiveNJoy Management are not
          responsible for the privacy practices, content, or security of
          external websites. We encourage you to review the privacy policies of
          any website you visit before providing your personal information.
        </motion.p>

        {/* =========================
    TEXT MESSAGING
========================= */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Text Messaging
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          If you choose to opt in to receive text messages from our property,
          you may receive notifications regarding your lease, maintenance
          requests, community events, upcoming payments, and other important
          community updates.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          You may unsubscribe from text messages at any time by replying{" "}
          <strong className="font-semibold text-[#232323]">STOP</strong>. If you
          wish to receive messages again, you can opt back in through the
          resident portal. Standard message and data rates may apply.
        </motion.p>

        {/* =========================
    TERMS OF USE
========================= */}

        <motion.h1 className="font-[Instrument_Serif] text-[58px] leading-[0.95] tracking-[-0.03em] text-[#232323] mt-10 mb-10">
          Terms of Use
        </motion.h1>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          Welcome to Crossings at Irving. By accessing and using this website,
          you agree to comply with and be bound by the following terms and
          conditions of use, which govern the relationship between{" "}
          <strong className="font-semibold text-[#232323]">
            Crossings at Irving
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-[#232323]">
            LiveNJoy Management
          </strong>{" "}
          in relation to this website.
        </motion.p>

        {/* User Eligibility */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          User Eligibility &amp; Accuracy
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          By utilizing our online{" "}
          <strong className="font-semibold text-[#232323]">
            pre-application
          </strong>
          , scheduling tools, or contact forms, you agree to provide{" "}
          <strong className="font-semibold text-[#232323]">
            true, accurate, and current information
          </strong>
          . Attempting to submit fraudulent information or impersonate another
          individual is strictly prohibited and may result in denial of services
          or other legal action.
        </motion.p>

        {/* Intellectual Property */}

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86] mt-10 mb-10">
          Intellectual Property
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          This website contains material that is owned by or licensed to Parks
          on Taylor and LiveNJoy Management. This includes, but is not limited
          to, the{" "}
          <strong className="font-semibold text-[#232323]">design</strong>,{" "}
          <strong className="font-semibold text-[#232323]">layout</strong>,{" "}
          <strong className="font-semibold text-[#232323]">appearance</strong>,
          original digital illustrations,{" "}
          <strong className="font-semibold text-[#232323]">floor plans</strong>,
          and{" "}
          <strong className="font-semibold text-[#232323]">photography</strong>.
          Reproduction, copying, redistribution, or unauthorized scraping of
          this content for commercial purposes is strictly prohibited without
          prior written permission.
        </motion.p>

        <motion.h2 className="font-[Plus_Jakarta_Sans] text-[21px] font-medium leading-[1.45] text-[#294B86]  mt-10 mb-10">
          Limitation of Liability &amp; Pricing Disclosures
        </motion.h2>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          The information contained on this website is provided for general
          informational purposes only. While we strive to keep community
          information accurate, all{" "}
          <strong className="font-semibold text-[#232323]">
            apartment pricing
          </strong>
          ,{" "}
          <strong className="font-semibold text-[#232323]">
            floor plan availability
          </strong>
          , and{" "}
          <strong className="font-semibold text-[#232323]">
            advertised leasing specials
          </strong>{" "}
          are subject to change without notice. Real-time availability is based
          on current property management data and may change at any time.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          Neither Crossings at Irving, LiveNJoy Management, nor any third
          parties provide any warranty or guarantee regarding the absolute
          accuracy, completeness, or timeliness of the information displayed on
          this website. All{" "}
          <strong className="font-semibold text-[#232323]">
            rental incentives
          </strong>
          ,{" "}
          <strong className="font-semibold text-[#232323]">
            concession specials
          </strong>
          , and{" "}
          <strong className="font-semibold text-[#232323]">
            community gift card promotions
          </strong>{" "}
          are subject to{" "}
          <strong className="font-semibold text-[#232323]">
            approved credit (OAC)
          </strong>{" "}
          and will be processed after move-in. By using this website, you
          acknowledge and agree that Crossings at Irving and LiveNJoy Management
          shall not be liable for any actions, decisions, or losses arising from
          reliance on the content presented on this website.
        </motion.p>

        <motion.h1 className="font-[Instrument_Serif] text-[58px] leading-[0.95] tracking-[-0.03em] text-[#232323] mt-10 mb-10">
          Fair Housing Statement
        </motion.h1>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-10">
          Crossings at Irving is committed to compliance with all federal,
          state, and local fair housing laws. We operate under a{" "}
          <strong className="font-semibold text-[#232323]">
            Resident First Approach
          </strong>{" "}
          and do not discriminate against any person because of race, color,
          religion, sex, handicap, familial status, national origin, or source
          of income.
        </motion.p>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B] mb-5">
          In full compliance with the{" "}
          <strong className="font-semibold text-[#232323]">
            Texas Department of Housing and Community Affairs (TDHCA)
          </strong>{" "}
          requirements and{" "}
          <strong className="font-semibold text-[#232323]">
            Section §394.0026(c)(7)
          </strong>
          , our community proudly welcomes{" "}
          <strong className="font-semibold text-[#232323]">
            Housing Choice Voucher (Section 8)
          </strong>{" "}
          households. All restricted and non-restricted rental units are
          marketed openly, and our leasing team works actively with local
          housing authorities to ensure equal access to clean, safe, and
          affordable housing in{" "}
          <strong className="font-semibold text-[#232323]">Sherman, TX</strong>.
        </motion.p>

        <motion.h1 className="font-[Instrument_Serif] text-[58px] leading-[0.95] tracking-[-0.03em] text-[#232323] mt-10 mb-10">
          Accessibility Statement
        </motion.h1>

        <motion.p className="font-[Plus_Jakarta_Sans] text-[18px] font-normal leading-[1.9] tracking-[0.01em] text-[#4B4B4B]">
          LiveNJoy Management is dedicated to providing a digital environment
          that is accessible to all individuals, including those with
          disabilities. We actively design and maintain the Crossings at Irving
          Apartment Homes website to align with the{" "}
          <strong className="font-semibold text-[#232323]">
            Web Content Accessibility Guidelines (WCAG)
          </strong>{" "}
          core principles directly within our native code footprint. Our goal is
          to ensure a frictionless experience for every visitor. If you are
          experiencing difficulty accessing any content, interactive modules, or
          online application flows on this website, or if you require assistance
          with any part of our site, please contact our leasing office at{" "}
          <a
            href={siteConfig.tel}
            className="font-semibold text-[#294B86] hover:underline"
          >
            {siteConfig.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${siteConfig.propertyManagerEmail}`}
            className="font-semibold text-[#294B86] hover:underline"
          >
            {siteConfig.propertyManagerEmail}
          </a>{" "}
          during regular business hours, and we will be happy to assist you.
        </motion.p>
      </motion.div>
    </main>
  );
}
