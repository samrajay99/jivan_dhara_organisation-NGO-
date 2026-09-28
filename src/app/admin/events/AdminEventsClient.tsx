"use client";

import React, { useState } from "react";
import { Plus, Trash2, Calendar, MapPin, Users, Loader2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminEventsClient({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState<any[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "09:30 AM",
    endTime: "03:30 PM",
    location: "12, Raicharan Sadhukhan Road Community Hall, Kolkata - 700037",
    description: "",
    maxAttendees: 100,
    coverImage: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      setEvents([data.event, ...events]);
      setShowModal(false);
      setNewEvent({
        title: "",
        date: "",
        startTime: "09:30 AM",
        endTime: "03:30 PM",
        location: "12, Raicharan Sadhukhan Road Community Hall, Kolkata - 700037",
        description: "",
        maxAttendees: 100,
        coverImage: "",
      });
    } catch (err: any) {
      alert(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      setEvents(events.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Events & Registration Management</h1>
          <p className="text-xs text-slate-500">
            Publish upcoming medical camps, farmer workshops, and track registrations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {evt.status}
                </span>
                <span className="text-xs text-slate-400">{formatDate(evt.date)}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{evt.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>

              <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{evt.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {evt.registrations?.length || 0} Registered / Max {evt.maxAttendees}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleDelete(evt.id)}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Event / Camp</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Eye & General Medical Screening"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Seats</label>
                  <input
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, maxAttendees: parseInt(e.target.value) || 100 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newEvent.coverImage}
                  onChange={(e) => setNewEvent({ ...newEvent, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details of services, doctors attending, etc."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
