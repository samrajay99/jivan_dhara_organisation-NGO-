"use client";

import React, { useState } from "react";
import { Plus, Trash2, Calendar, MapPin, Users, Loader2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminDailyStatusClient({ initialStatuses }: { initialStatuses: any[] }) {
  const [statuses, setStatuses] = useState<any[]>(initialStatuses);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newStatus, setNewStatus] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    location: "Kolkata, West Bengal",
    category: "Health & Medical",
    volunteersCount: 10,
    beneficiariesCount: 50,
    photos: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/daily-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStatus),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create status");

      setStatuses([data.item, ...statuses]);
      setShowModal(false);
      setNewStatus({
        title: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        location: "Kolkata, West Bengal",
        category: "Health & Medical",
        volunteersCount: 10,
        beneficiariesCount: 50,
        photos: "",
      });
    } catch (err: any) {
      alert(err.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this field log?")) return;
    try {
      const res = await fetch(`/api/admin/daily-status?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setStatuses(statuses.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Daily On-Ground Field Logs</h1>
          <p className="text-xs text-slate-500">
            Publish real daily updates, beneficiary counts, and activity logs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add Daily Update
        </button>
      </div>

      <div className="space-y-4">
        {statuses.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {s.category}
                </span>
                <span className="text-xs text-slate-400">{formatDate(s.date)}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
              <div className="flex gap-4 text-xs text-slate-500 pt-1">
                <span>📍 {s.location}</span>
                <span>👥 {s.volunteersCount} Volunteers</span>
                <span>✨ {s.beneficiariesCount} Beneficiaries</span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => handleDelete(s.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Daily Work Log</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Health Camp at Ward 12"
                  value={newStatus.title}
                  onChange={(e) => setNewStatus({ ...newStatus, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newStatus.category}
                    onChange={(e) => setNewStatus({ ...newStatus, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newStatus.date}
                    onChange={(e) => setNewStatus({ ...newStatus, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={newStatus.location}
                  onChange={(e) => setNewStatus({ ...newStatus, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Volunteers Count
                  </label>
                  <input
                    type="number"
                    value={newStatus.volunteersCount}
                    onChange={(e) =>
                      setNewStatus({ ...newStatus, volunteersCount: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Beneficiaries Count
                  </label>
                  <input
                    type="number"
                    value={newStatus.beneficiariesCount}
                    onChange={(e) =>
                      setNewStatus({
                        ...newStatus,
                        beneficiariesCount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description of Activities *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newStatus.description}
                  onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newStatus.photos}
                  onChange={(e) => setNewStatus({ ...newStatus, photos: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Daily Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
