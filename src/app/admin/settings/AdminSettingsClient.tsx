"use client";

import React, { useState } from "react";
import { Save, CheckCircle, Loader2, Building, Phone, Heart, ShieldCheck } from "lucide-react";
import { SiteSettingsMap } from "@/lib/settings";

export default function AdminSettingsClient({
  initialSettings,
}: {
  initialSettings: SiteSettingsMap;
}) {
  const [settings, setSettings] = useState<SiteSettingsMap>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  const update = (key: keyof SiteSettingsMap, val: string) => {
    setSettings({ ...settings, [key]: val });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Website CMS & Global Settings</h1>
          <p className="text-xs text-slate-500">
            Control branding, contact details, UPI gateway parameters, and dynamic statistics.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-4 h-4 text-emerald-300" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saved ? "Settings Saved!" : "Save All Changes"}</span>
        </button>
      </div>

      {/* 1. Organisation Identity */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-700" /> Organisation Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full NGO Name</label>
            <input
              type="text"
              value={settings.ngo_name}
              onChange={(e) => update("ngo_name", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Name / Acronym</label>
            <input
              type="text"
              value={settings.ngo_short_name}
              onChange={(e) => update("ngo_short_name", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Founded Year</label>
            <input
              type="text"
              value={settings.founded_year}
              onChange={(e) => update("founded_year", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Homepage Tagline</label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
      </div>

      {/* 2. Contact & Payment Info */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-amber-600" /> Contact & Payment Gateway (UPI)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone / Helpline</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Registered Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => update("address", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Official UPI ID</label>
            <input
              type="text"
              value={settings.upi_id}
              onChange={(e) => update("upi_id", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">UPI Phone Number</label>
            <input
              type="text"
              value={settings.upi_number}
              onChange={(e) => update("upi_number", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Membership Fee (₹)</label>
            <input
              type="text"
              value={settings.membership_fee}
              onChange={(e) => update("membership_fee", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-emerald-800"
            />
          </div>
        </div>
      </div>

      {/* 3. Mission, Vision, and Governance */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Mission, Vision & Governance
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Mission Statement</label>
          <textarea
            rows={2}
            value={settings.mission}
            onChange={(e) => update("mission", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Vision Statement</label>
          <textarea
            rows={2}
            value={settings.vision}
            onChange={(e) => update("vision", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
      </div>

      {/* 4. Real Dynamic Statistics */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Dynamic Public Statistics</h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Members Stat</label>
            <input
              type="text"
              value={settings.stat_members}
              onChange={(e) => update("stat_members", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">People Helped</label>
            <input
              type="text"
              value={settings.stat_people_helped}
              onChange={(e) => update("stat_people_helped", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Events Stat</label>
            <input
              type="text"
              value={settings.stat_events}
              onChange={(e) => update("stat_events", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Volunteers</label>
            <input
              type="text"
              value={settings.stat_volunteers}
              onChange={(e) => update("stat_volunteers", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Years of Service</label>
            <input
              type="text"
              value={settings.stat_years}
              onChange={(e) => update("stat_years", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
