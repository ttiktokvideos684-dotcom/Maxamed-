import React from 'react';
import { ShieldCheck, Info, CheckCircle2, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../types';

interface AffiliateDisclosurePageProps {
  settings: SiteSettings;
}

export const AffiliateDisclosurePage: React.FC<AffiliateDisclosurePageProps> = ({
  settings,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FTC 16 CFR § 255 Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Full Affiliate & Advertising Disclosure
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Last Updated: March 2026. In accordance with the Federal Trade Commission (FTC) Guides Concerning the Use of Endorsements and Testimonials in Advertising, we provide full transparency regarding our merchant partnerships.
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-[#071B35] text-white p-8 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold font-display text-white">
            Plain English Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Nexora Picks is an editorial affiliate product recommendation platform, <strong>not a direct retail store</strong>. When you click on buttons such as "Check Price" or "View Deal", you are redirected to the verified external merchant (e.g. Amazon or Digistore24) to complete your transaction safely on their secure platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417]" />
              <span>Zero extra cost to you as the purchaser</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417]" />
              <span>Independent editorial ratings and reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417]" />
              <span>No fabricated checkout or faux stock urgency</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417]" />
              <span>Transparent tracking IDs on all outlinks</span>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* 1. Amazon Associates */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              1. Amazon Associates Program
            </h3>
            <p>
              Nexora Picks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for websites to earn advertising fees by advertising and linking to Amazon.com and affiliated international Amazon websites.
            </p>
            <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
              "As an Amazon Associate, Nexora Picks earns from qualifying purchases."
            </p>
            <p>
              Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product.
            </p>
          </section>

          {/* 2. Digistore24 */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              2. Digistore24 Partnership
            </h3>
            <p>
              We promote digital products, creator software, and educational courses distributed via Digistore24 under our verified merchant partner agreements. Digistore24 acts as the merchant of record and processes digital product orders with statutory consumer refund guarantees.
            </p>
          </section>

          {/* 3. Tracking Cookies & How Outlinks Work */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              3. How Affiliate Tracking Cookies Work
            </h3>
            <p>
              When you click an affiliate link on Nexora Picks, a tracking cookie is placed in your web browser by the respective merchant. This cookie identifies Nexora Picks as the referring source so that if you complete a qualifying purchase within the merchant’s cookie window (typically 24 hours on Amazon, up to 60 days on Digistore24), the merchant credits our account.
            </p>
            <p>
              These cookies do not collect sensitive personal financial information such as credit card numbers or banking credentials.
            </p>
          </section>

          {/* 4. No Fake Store Guarantee */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-lg">
              <Info className="w-5 h-5 text-[#FF7417]" />
              <span>4. Our Anti-Deception & Integrity Pledge</span>
            </div>
            <p>
              To maintain absolute transparency with our readers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>We never implement fake shopping carts, faux checkout flows, or simulated orders.</li>
              <li>We never fabricate customer reviews, testimonials, or artificial scarcity countdown timers.</li>
              <li>All sample or benchmark data is explicitly labeled as demo/editorial material.</li>
              <li>Every product links directly to its authentic merchant URL.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
