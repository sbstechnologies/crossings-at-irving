import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function HousingVoucher() {
  return (
    <section className="bg-[#F4F0EA] py-6 py-16 md:py-24">
      <div className="mx-auto px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 ">
        <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          <div className="border-l-[6px] border-[#C8A97E] p-8 sm:p-10 lg:p-14 xl:p-16">
            {/* Section Label */}
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-14 bg-[#C8A97E]" />

              <span
                className={`${jakarta.className} text-xs font-medium uppercase tracking-[0.35em] text-[#A88456]`}
              >
                Resident Information
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`${instrumentSerif.className} max-w-3xl text-3xl leading-tight text-stone-900 sm:text-4xl lg:text-5xl`}
            >
              Housing Choice Vouchers
              <span className="block text-stone-500">& Rental Assistance</span>
            </h2>

            {/* Divider */}
            <div className="my-8 h-px w-24 bg-[#C8A97E]/40" />

            {/* Content */}
            <div
              className={`${jakarta.className} space-y-7 text-[16px] leading-8 text-stone-600 md:text-[17px]`}
            >
              <p>
                Crossings at Irving Apartments, located at 6700 Sandshell Blvd,
                Fort Worth, TX 76137 welcomes applicants and residents
                participating in the Housing Choice Voucher Program and other
                rental assistance programs, subject to unit availability,
                standard screening criteria, applicable income and rent
                restrictions, Public Housing Authority (PHA) approval
                requirements, and all applicable program guidelines.
              </p>

              <p>
                Our community does not deny housing solely because an applicant
                or household participates in the Housing Choice Voucher Program
                or receives rental assistance. For voucher households, any
                minimum income requirement applies only to the tenant-paid
                portion of rent and will not exceed 250% of that amount.
              </p>

              <p>
                Crossings at Irving Apartments actively markets both restricted
                and unrestricted apartment homes to eligible voucher households
                and works with local housing authorities to ensure equal access
                to available housing opportunities.
              </p>

              {/* Compliance Card */}
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="text-stone-700">
                  This community operates in accordance with all applicable
                  requirements for HFC multifamily residential developments,
                  including Texas Local Government Code §394.9026(c)(7).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
