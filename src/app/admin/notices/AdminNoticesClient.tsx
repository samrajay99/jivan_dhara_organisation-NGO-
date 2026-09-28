"use client";

import React, { useState } from "react";
import { Plus, Trash2, FileText, Loader2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminNoticesClient({ initialNotices }: { initialNotices: any[] }) {
  const [notices, setNotices] = useState<any[]>(initialNotices);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    priority: "NORMAL",
    date: new Date().toISOString().slice(0, 10),
    attachmentUrl: "",
    expiryDate: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create notice");

      setNotices([data.notice, ...notices]);
      setShowModal(false);
      setNewNotice({
        title: "",
        description: "",
        priority: "NORMAL",
        date: new Date().toISOString().slice(0, 10),
        attachmentUrl: "",
        expiryDate: "",
      });
    } catch (err: any) {
      alert(err.message || "Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`/api/admin/notices?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete notice");
      setNotices(notices.filter((n) => n.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notice Board CMS</h1>
          <p className="text-xs text-slate-500">
            Publish urgent announcements, circulars, and official updates.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add Notice
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    n.priority === "URGENT"
                      ? "bg-red-100 text-red-700"
                      : n.priority === "IMPORTANT"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {n.priority}
                </span>
                <span className="text-xs text-slate-400">{formatDate(n.date)}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{n.description}</p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => handleDelete(n.id)}
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Publish Official Notice</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urgent: Blood Donation Camp Registration"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="IMPORTANT">IMPORTANT</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newNotice.date}
                    onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notice Body / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Full text of the announcement..."
                  value={newNotice.description}
                  onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Attachment / Document URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newNotice.attachmentUrl}
                  onChange={(e) => setNewNotice({ ...newNotice, attachmentUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Notice"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
