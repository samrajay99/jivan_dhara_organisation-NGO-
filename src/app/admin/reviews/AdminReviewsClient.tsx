"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsClient({ initialReviews }: { initialReviews: any[] }) {
  const [reviews, setReviews] = useState<any[]>(initialReviews);

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setReviews(reviews.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Testimonial & Review Moderation</h1>
        <p className="text-xs text-slate-500">
          Moderate community testimonials before making them publicly visible on the website.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No testimonials submitted yet.
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800"
                        : r.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {r.status}
                  </span>

                  {r.isMember && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Member Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed">&ldquo;{r.content}&rdquo;</p>

                <div className="text-[11px] text-slate-500">
                  <strong>{r.name}</strong> • {r.roleOrTitle || "Supporter"} • {formatDate(r.createdAt)}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {r.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(r.id, "APPROVED")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(r.id, "REJECTED")}
                      className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold"
                    >
                      Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
