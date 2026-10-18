import React from 'react';
import { Microscope, Award, BadgeDollarSign, ShieldAlert } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const pillars = [
    {
      icon: Microscope,
      title: 'Lab & Real-World Vetting',
      description:
        'Every product is evaluated for build longevity, ergonomics, and sustained utility over 30 days of actual workflow testing.',
    },
    {
      icon: Award,
      title: 'Zero Paid Rankings',
      description:
        'Merchants cannot pay to boost ratings or buy an Editor’s Choice badge. Recommendations are strictly determined by performance.',
    },
    {
      icon: BadgeDollarSign,
      title: 'Verified Deal Pricing',
      description:
        'We cross-reference list prices with historical merchant trackers to ensure discounts and deals are genuine, never synthetic.',
    },
    {
      icon: ShieldAlert,
      title: 'FTC-Compliant Transparency',
      description:
        'We disclose all qualifying affiliate relationships openly. You never pay a penny more when purchasing through our curated links.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            Our Editorial Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-2">
            Why Discerning Buyers Trust Nexora Picks
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            We cut through marketing noise to recommend products that actually merit your hard-earned investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#071B35] text-[#FF7417] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
