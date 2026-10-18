import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            Terms of Use & Operation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Terms and Conditions
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Effective Date: March 2026. Please read these terms carefully before utilizing the Nexora Picks website and recommendation services.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-display">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Nexora Picks, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">2. Nature of Website & Non-Store Status</h2>
            <p>
              Nexora Picks is an editorial affiliate marketing blog and curated recommendation service. Nexora Picks is not an online store, manufacturer, or direct seller of physical or digital merchandise. When you purchase through our links, transactions occur entirely on third-party merchant platforms (e.g. Amazon.com or Digistore24). Any contractual relationship, shipping dispute, warranty claim, or refund request exists solely between you and the respective third-party merchant.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">3. Accuracy of Pricing & Availability</h2>
            <p>
              While we endeavor to verify product pricing, discount percentages, and specifications continuously, merchant prices and inventory fluctuations occur frequently. Nexora Picks cannot guarantee that a price displayed on our site will match the merchant’s final checkout amount at the time of purchase.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">4. Intellectual Property</h2>
            <p>
              All original text, editorial reviews, layout design, and brand assets on Nexora Picks are protected by copyright and intellectual property laws. Product images, brand names, and trademarks are the property of their respective owners and are used strictly under editorial nominative fair-use principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
