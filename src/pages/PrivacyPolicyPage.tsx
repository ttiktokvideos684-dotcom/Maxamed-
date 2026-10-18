import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            Legal & Compliance Template
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Effective Date: March 2026. This template outlines how Nexora Picks collects, uses, and safeguards information when you visit our website.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-display">1. Information We Collect</h2>
            <p>
              Nexora Picks collects information voluntarily provided by users, such as email addresses submitted via our newsletter subscription form or inquiry messages submitted through our contact form. We also collect non-identifying telemetry (such as browser type, operating system, and referral source) to improve user experience.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">2. Affiliate Tracking & Third-Party Cookies</h2>
            <p>
              Our website contains affiliate links to partner networks including Amazon Associates and Digistore24. When you click an affiliate link, a small cookie file is stored on your device by the merchant to attribute your visit and ensure proper commission calculation. Please refer to each merchant’s privacy policy for details on their data handling practices.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">3. Newsletter & Email Communications</h2>
            <p>
              When you subscribe to our newsletter, we store your email address solely to send you curated weekly product reviews, deal alerts, and guides. You can unsubscribe at any time using the one-click unsubscribe link provided in every email. We do not sell or rent our subscriber lists.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">4. Data Security & Storage</h2>
            <p>
              We implement industry-standard technical measures to protect user data from unauthorized access, disclosure, or alteration. In our local demo environment, configuration and wishlist items are safely isolated in your client-side browser storage.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">5. Contact Information</h2>
            <p>
              For privacy-related inquiries, requests to delete personal subscriber data, or questions regarding this policy, please reach out via our contact page or at <span className="font-semibold text-slate-900">editorial@nexorapicks.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
