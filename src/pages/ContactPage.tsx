import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Product Review Suggestion',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedback('Please fill out all required fields before submitting.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedback('Please provide a valid email address so we can reply.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFeedback('Thank you for reaching out. Our editorial team reviews every inquiry within 24 to 48 business hours.');
      setFormData({
        name: '',
        email: '',
        subject: 'Product Review Suggestion',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#FF7417]/10 text-[#FF7417]">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Editorial Contact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Get in Touch with {settings.brandName || 'Maha 00'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Have a product you’d like our team to review, a pricing update, or a merchant partnership inquiry? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Left */}
          <div className="md:col-span-5 bg-[#071B35] text-white p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold font-display text-white">
              Editorial Inquiries
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We respond to technical questions, affiliate partnership proposals, and reader inquiries during standard business hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                  General & Editorial Contact
                </span>
                <span className="font-semibold text-white">
                  {settings.contactEmail || 'contact@maha00.com'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                  Affiliate Networks
                </span>
                <span className="font-semibold text-white">
                  Amazon Associates & Digistore24
                </span>
                <span className="block text-slate-300">
                  Verified Merchant Partnerships
                </span>
              </div>

              <div>
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                  Response Commitment
                </span>
                <span className="text-slate-300">
                  Within 24–48 hours for verified requests
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Inquiry Topic *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
                  disabled={status === 'loading'}
                >
                  <option value="Product Review Suggestion">Product Review Suggestion</option>
                  <option value="Merchant & Affiliate Partnership">Merchant & Affiliate Partnership</option>
                  <option value="Price or Deal Correction">Price or Deal Correction</option>
                  <option value="General Editorial Feedback">General Editorial Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your product, question, or feedback in detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl bg-[#071B35] hover:bg-[#0D2445] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#FF7417]" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
