import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Store } from '../lib/store';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Strict email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      const added = Store.addSubscriber(trimmed, 'Homepage Newsletter');
      if (added) {
        setStatus('success');
        setMessage('You are now subscribed to Nexora Curated Deals. Check your inbox for our weekly review.');
        setEmail('');
      } else {
        setStatus('already');
        setMessage('This email is already registered on our subscriber list.');
      }
    }, 400);
  };

  return (
    <section className="py-16 bg-[#071B35] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FF7417]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-[#FF7417] border border-white/10">
            <Mail className="w-3.5 h-3.5" />
            <span>Weekly Editorial Briefing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Never Miss a Verified Deal or In-Depth Review
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join over 12,000+ tech and lifestyle enthusiasts. We deliver curated price drops, tested software tools, and unbiased buying advice straight to your inbox once a week.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter your primary email..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417] focus:border-transparent transition-all"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-[#FF7417] hover:bg-[#E6620A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </div>

            {/* Validation & Feedback States */}
            {status === 'success' && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 text-left">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === 'already' && (
              <div className="p-3 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400">
              Zero spam. Unsubscribe anytime with 1-click. Stored securely and never shared with third parties.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
