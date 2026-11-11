import React, { useState, useEffect } from 'react';
import { Star, Quote, Send, Plus, CheckCircle2, ShieldCheck, X, ThumbsUp, Trash2, Lock, Sparkles } from 'lucide-react';

export interface UserReview {
  id: string;
  author: string;
  role: string;
  companyType?: string;
  rating: number;
  quote: string;
  metrics?: string;
  date: string;
  status: 'pending' | 'approved';
}

const STORAGE_KEY = 'tripple_ai_user_reviews_v1';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [metrics, setMetrics] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews([]);
      }
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }
  }, []);

  // Sync state to localStorage whenever reviews change
  const saveReviews = (updated: UserReview[]) => {
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const newReview: UserReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      author: author.trim(),
      role: role.trim() || 'Client',
      companyType: companyType.trim() || 'Verified Partner',
      rating,
      quote: quote.trim(),
      metrics: metrics.trim() || undefined,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending' // Requires review before showing publicly
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Send instant WhatsApp notification to Given Arori
    const whatsappText = `Hello Given, a new rating/testimonial was submitted on TRIPPLE AI SYSTEMS:\n\nAuthor: ${newReview.author} (${newReview.role})\nRating: ${'★'.repeat(newReview.rating)}\nQuote: "${newReview.quote}"\n\nPlease log in to approve or publish it.`;
    const whatsappUrl = `https://wa.me/254792767922?text=${encodeURIComponent(whatsappText)}`;

    setSubmittedSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 800);

    // Reset Form
    setAuthor('');
    setRole('');
    setCompanyType('');
    setRating(5);
    setQuote('');
    setMetrics('');
  };

  const handleApprove = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r);
    saveReviews(updated);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const pendingReviews = reviews.filter(r => r.status === 'pending');

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Client Ratings and Testimonials">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow-badge mb-3">06 / VERIFIED REVIEWS &amp; RATINGS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4 tracking-tight">
            Client Feedback &amp; <span className="gold-gradient-text">Ratings</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-8">
            We value genuine client experiences. Read verified client reviews or leave your own rating and testimonial below.
          </p>

          {/* Action Call to Action Button */}
          <button
            onClick={() => {
              setSubmittedSuccess(false);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black hover:shadow-xl hover:shadow-[oklch(0.8_0.14_82/30%)] transition-all transform hover:scale-105 group"
          >
            <Star className="w-4 h-4 fill-current text-black group-hover:rotate-12 transition-transform" />
            <span>Leave a Rating or Testimonial</span>
            <Plus className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Display Approved Testimonials or Empty State */}
        {approvedReviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedReviews.map((t) => (
              <div
                key={t.id}
                className="glass-panel group rounded-3xl p-8 border border-[oklch(0.8_0.12_82/22%)] hover:border-gold transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < t.rating ? 'fill-current text-gold' : 'text-warm-gray/30'}`}
                        />
                      ))}
                    </div>
                    <div className="glass-icon w-9 h-9 rounded-full flex items-center justify-center text-gold">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Impact Metric Badge if present */}
                  {t.metrics && (
                    <div className="mb-4 inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[oklch(0.8_0.14_82/10%)] text-gold border border-[oklch(0.8_0.12_82/25%)]">
                      {t.metrics}
                    </div>
                  )}

                  {/* Quote Body */}
                  <p className="text-champagne/90 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-5 border-t border-[oklch(0.8_0.12_82/15%)]">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.68_0.16_78)] p-[1.5px] shrink-0">
                    <div className="w-full h-full rounded-2xl bg-[oklch(0.14_0.015_70)] flex items-center justify-center font-heading font-bold text-sm text-gold">
                      {t.author.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-champagne">{t.author}</h3>
                    <p className="text-xs text-gold/90 font-medium">{t.role}</p>
                    <span className="text-[11px] text-warm-gray block">{t.companyType || 'Verified Partner'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto glass-panel p-10 rounded-3xl text-center border border-[oklch(0.8_0.12_82/25%)] space-y-4 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-gold/15 flex items-center justify-center text-gold border border-gold/30">
              <Star className="w-7 h-7 fill-current" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-champagne">Be the First to Leave a Rating</h3>
            <p className="text-sm text-warm-gray leading-relaxed max-w-lg mx-auto">
              Have you worked with TRIPPLE AI SYSTEMS or used our automations? Submit your feedback and rating below. Your testimonial will appear here once reviewed and published.
            </p>
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setIsModalOpen(true);
              }}
              className="mt-2 inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold bg-gold text-black hover:bg-gold-hover transition-all"
            >
              <span>Submit Your Testimonial</span>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Founder Admin Review Drawer Toggle */}
        <div className="mt-16 pt-8 border-t border-[oklch(0.8_0.12_82/15%)] text-center">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="inline-flex items-center space-x-2 text-xs font-mono text-warm-gray/70 hover:text-gold transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Founder Portal: Review Submissions ({pendingReviews.length} Pending)</span>
          </button>
        </div>

        {/* Admin Review Drawer Panel */}
        {isAdminOpen && (
          <div className="mt-6 p-6 sm:p-8 glass-panel-elevated rounded-3xl border border-[oklch(0.8_0.12_82/30%)] space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[oklch(0.8_0.12_82/20%)] pb-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-champagne">Founder Testimonial Review Hub</h3>
                <p className="text-xs text-warm-gray mt-0.5">
                  Approve or reject visitor rating submissions. Approved testimonials immediately appear publicly on the website.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/40">
                {pendingReviews.length} Pending Approval
              </span>
            </div>

            {pendingReviews.length > 0 ? (
              <div className="space-y-4">
                {pendingReviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl glass-panel border border-[oklch(0.8_0.12_82/20%)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center space-x-2 text-xs font-mono text-gold">
                        <span className="font-bold text-champagne">{r.author}</span>
                        <span>•</span>
                        <span>{r.role} ({r.companyType})</span>
                        <span>•</span>
                        <span className="text-gold font-bold">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="text-xs text-warm-gray italic">"{r.quote}"</p>
                      {r.metrics && <span className="inline-block text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">{r.metrics}</span>}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve &amp; Publish</span>
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-3 py-2 rounded-xl text-xs font-medium glass-panel text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500 transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-warm-gray text-center py-4">No pending testimonial submissions awaiting review.</p>
            )}
          </div>
        )}

      </div>

      {/* Leave a Rating & Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-[oklch(0.8_0.12_82/40%)] p-6 sm:p-8 space-y-6 relative gold-glow">
            
            {/* Close Modal Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel text-warm-gray hover:text-champagne transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-champagne">Testimonial Submitted!</h3>
                <p className="text-sm text-warm-gray leading-relaxed max-w-md mx-auto">
                  Thank you for your rating! Your review has been submitted for verification. It will appear live on the website once approved by Given Arori.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold bg-gold text-black hover:bg-gold-hover transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <div className="eyebrow-badge mb-2">SUBMIT YOUR RATING</div>
                  <h3 className="text-2xl font-bold font-heading text-champagne">Leave a Rating &amp; Testimonial</h3>
                  <p className="text-xs text-warm-gray mt-1">
                    Your feedback helps us maintain high standards. Submissions are reviewed before appearing publicly on the site.
                  </p>
                </div>

                {/* Star Rating Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-2">
                    Select Your Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? 'fill-current text-gold'
                              : 'text-warm-gray/30'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-gold font-bold ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. David Mutua"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)]"
                  />
                </div>

                {/* Role / Title & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. CEO / Operations Lead"
                      className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      placeholder="e.g. Retail Logistics Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)]"
                    />
                  </div>
                </div>

                {/* Optional Metric achieved */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Key Result or Impact Achieved (Optional)
                  </label>
                  <input
                    type="text"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    placeholder="e.g. Saved 20+ hours weekly • 80% Faster Replies"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)]"
                  />
                </div>

                {/* Testimonial Quote */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Your Testimonial / Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Describe your experience working with TRIPPLE AI SYSTEMS or using our automations..."
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black hover:shadow-xl hover:shadow-[oklch(0.8_0.14_82/30%)] transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Testimonial for Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;