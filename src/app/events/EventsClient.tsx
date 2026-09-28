"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight } from "lucide-react";
import EventRegistrationModal from "@/components/events/EventRegistrationModal";
import { formatDate } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  coverImage?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  organizer: string;
  status: string;
  maxAttendees: number;
}

export default function EventsClient({ events }: { events: EventItem[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredEvents = events.filter((ev) => {
    if (filter === "ALL") return true;
    return ev.status === filter;
  });

  return (
    <>
      {/* Event Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          {["ALL", "UPCOMING", "ONGOING", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === st
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredEvents.length} events
        </span>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No Events in this Category</h3>
          <p className="text-xs text-slate-500">
            Please check back soon or browse other active schedules.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => {
            const isUpcoming = evt.status === "UPCOMING";

            return (
              <div
                key={evt.id}
                id={evt.slug}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-100">
                    <img
                      src={
                        evt.coverImage ||
                        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                      }
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-bold">
                      {formatDate(evt.date)}
                    </div>
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-white ${
                        isUpcoming ? "bg-emerald-600" : "bg-slate-700"
                      }`}
                    >
                      {evt.status}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{evt.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="space-y-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {evt.startTime} - {evt.endTime}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {isUpcoming ? (
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Register Now (Free)
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                    >
                      Event Concluded
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
