"use client";

import React, { useState } from "react";
import { Star, Send, CheckCircle, AlertCircle, Loader2, Quote, UserCheck } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  roleOrTitle?: string | null;
  rating: number;
  content: string;
  photoUrl?: string | null;
  isMember: boolean;
}

export default function ReviewsClient({ reviews }: { reviews: ReviewItem[] }) {
  const [formData, setFormData] = useState({
    name: "",
    roleOrTitle: "",
    rating: 5,
    content: "",
    isMember: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Col: Approved Reviews List */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Community Feedback
          </span>
          <h2 className="text-2xl font-bold text-slate-900">What People Say About JDO</h2>
        </div>

        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            No approved testimonials yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.isMember && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <UserCheck className="w-3 h-3" /> Verified Member
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-slate-500">{rev.roleOrTitle || "Community Supporter"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Col: Submit Review Form */}
      <div className="lg:col-span-5">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md sticky top-24 space-y-6">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase">
              Share Your Voice
            </span>
            <h3 className="text-xl font-bold text-slate-900">Submit a Testimonial</h3>
            <p className="text-xs text-slate-500">
              Your review helps other citizens and donors understand our genuine grassroots work.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-950 text-base">Thank You for Your Feedback!</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your testimonial has been submitted successfully and is currently under administrative
                review. It will be published shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", roleOrTitle: "", rating: 5, content: "", isMember: false });
                }}
                className="text-xs font-bold text-emerald-700 underline pt-2 block mx-auto"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Anirban Mukherjee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Designation / Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Medical Volunteer / Kolkata Supporter"
                  value={formData.roleOrTitle}
                  onChange={(e) => setFormData({ ...formData, roleOrTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your interaction with Jivan Dhara Organisation..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isMember"
                  checked={formData.isMember}
                  onChange={(e) => setFormData({ ...formData, isMember: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isMember" className="text-xs text-slate-700 font-medium">
                  I am a registered member of Jivan Dhara Organisation
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Review for Approval</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
