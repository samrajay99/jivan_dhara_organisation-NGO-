"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, Loader2, X } from "lucide-react";

export default function AdminGalleryClient({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState<any[]>(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    title: "",
    category: "EVENTS",
    url: "",
    caption: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to add");

      setItems([data.item, ...items]);
      setShowModal(false);
      setNewItem({ title: "", category: "EVENTS", url: "", caption: "" });
    } catch (err: any) {
      alert("Failed to add image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo from gallery?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems(items.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Photo & Media Gallery CMS</h1>
          <p className="text-xs text-slate-500">
            Upload and organize authentic field photos and album categories.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-xs text-slate-900 truncate">{item.title}</h3>
                {item.caption && (
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.caption}</p>
                )}
              </div>
            </div>

            <div className="p-4 pt-0 flex justify-end">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Gallery Photo</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Health Checkup at Ward 12"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="EVENTS">EVENTS</option>
                  <option value="HEALTH_CAMPS">HEALTH CAMPS</option>
                  <option value="EDUCATION">EDUCATION</option>
                  <option value="SOCIAL_WORK">SOCIAL WORK</option>
                  <option value="COMMUNITY">COMMUNITY</option>
                  <option value="VOLUNTEERS">VOLUNTEERS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Photo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
