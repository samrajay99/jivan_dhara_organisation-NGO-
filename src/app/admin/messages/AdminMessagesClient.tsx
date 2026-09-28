"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, User, CheckCircle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  subject: string;
  message: string;
  createdAt: string | Date;
}

interface VolunteerApp {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  skills: string;
  areasOfInterest: string;
  message?: string | null;
  status: string;
  createdAt: string | Date;
}

export default function AdminMessagesClient({
  messages,
  volunteers,
}: {
  messages: ContactMessage[];
  volunteers: VolunteerApp[];
}) {
  const [activeTab, setActiveTab] = useState<"MESSAGES" | "VOLUNTEERS">("MESSAGES");

  return (
    <div className="space-y-6">
      {/* Top Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Inquiries & Volunteer Applications</h1>
          <p className="text-xs text-slate-500">
            Review communications sent from the public website contact and volunteer forms.
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab("MESSAGES")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "MESSAGES"
                ? "bg-white text-emerald-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Contact Inquiries ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("VOLUNTEERS")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "VOLUNTEERS"
                ? "bg-white text-emerald-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Volunteer Applications ({volunteers.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "MESSAGES" ? (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No contact inquiries received.
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm text-slate-900">{m.subject}</h3>
                    <div className="text-xs text-slate-500">
                      From: <strong>{m.name}</strong> • {m.email} {m.mobile && `• ${m.mobile}`}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(m.createdAt)}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {m.message}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {volunteers.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No volunteer applications submitted yet.
            </div>
          ) : (
            volunteers.map((v) => (
              <div
                key={v.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{v.name}</h3>
                    <div className="text-xs text-slate-500">
                      {v.phone} • {v.email} • 📍 {v.location}
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {v.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-400">Skills / Profession:</strong> {v.skills}
                  </div>
                  <div>
                    <strong className="text-slate-400">Interests:</strong> {v.areasOfInterest}
                  </div>
                </div>

                {v.message && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    &ldquo;{v.message}&rdquo;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
