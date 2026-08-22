export default function ComplianceNotice() {
  return (
    <div className="bg-[#0f1e48] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-4">
      <div className="mx-auto border border-style:solid border-width: 16px  border-[#24468d] flex max-w-[1920px] flex-col gap-6 rounded-[26px] bg-[#0f1e48] px-8 md:px-12 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-[Instrument_Serif] text-[24px] leading-none text-[#8e99ad]">
            Equal Housing Opportunity
          </h2>

          <p className="font-[Plus_Jakarta_Sans] mt-4 text-[15px] text-[#8e99ad]">
            Our community proudly welcomes Housing Choice Voucher households. We
            market all available restricted and non-restricted units to voucher
            holders and notify local housing authorities of voucher acceptance,
            operating in full compliance with Texas Section §394.0026(c)(7) and
            affirmative marketing policies.
          </p>
        </div>
      </div>
    </div>
  );
}
