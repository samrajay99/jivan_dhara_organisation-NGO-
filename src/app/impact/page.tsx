import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Heart,
  Users,
  Award,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
} from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Impact & Transparency | Verified Social Metrics",
  description:
    "Explore the verifiable social impact, financial transparency, and community metrics of Jivan Dhara Organisation across West Bengal.",
};

export default async function ImpactPage() {
  const settings = await getSiteSettings();

  const metrics = [
    {
      label: "Total Registered Members",
      val: settings.stat_members,
      sub: "Active verified members contributing ₹50 membership",
    },
    {
      label: "People Directly Assisted",
      val: settings.stat_people_helped,
      sub: "Patients, students, women SHGs & farmers",
    },
    {
      label: "Free Health Camps & Drives",
      val: settings.stat_events,
      sub: "RCH checkups, vaccination & awareness camps",
    },
    {
      label: "Active Field Volunteers",
      val: settings.stat_volunteers,
      sub: "Dedicated community mobilizers & doctors",
    },
  ];

  const fundAllocation = [
    { category: "Child Welfare & School Kits", percentage: "35%", color: "bg-emerald-500" },
    { category: "Free Health Camps & Generic Medicines", percentage: "25%", color: "bg-teal-500" },
    { category: "PMGDISHA & Women Skill Centers", percentage: "20%", color: "bg-amber-500" },
    { category: "Farmer Support & Tree Plantation", percentage: "12%", color: "bg-blue-500" },
    { category: "Administration & Public Reporting", percentage: "8%", color: "bg-slate-400" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Accountability & Impact
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Transparency in Every Action
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We believe trust is built on accountability. All statistics and project figures are
              maintained through our democratically reviewed administrative data.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Real Dynamic Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800">{m.val}</div>
              <div className="text-sm font-bold text-slate-900">{m.label}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{m.sub}</p>
            </div>
          ))}
        </section>

        {/* Fund Transparency Breakdown */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Resource Utilization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Where Do Your Contributions Go?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every ₹50 membership fee and voluntary contribution directly fuels verified grassroots
              initiatives with zero wastage.
            </p>
          </div>

          <div className="space-y-4">
            {fundAllocation.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-800">
                  <span>{item.category}</span>
                  <span className="font-bold text-emerald-800">{item.percentage}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              All financial and project records are reviewed quarterly by the 9-member Governing
              Committee and audited as per democratic trust standards.
            </span>
          </div>
        </section>

        {/* Real Case Studies & Daily Updates Link */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs">
                Live Transparency
              </span>
              <h3 className="text-xl font-bold text-white">Daily Grassroots Status Logs</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                See exactly where our teams operated today, how many beneficiaries received medical
                consultations, and photos from on-ground health camps and distribution drives.
              </p>
            </div>

            <Link
              href="/daily-status"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Explore Live Daily Work Log</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-white text-emerald-900 font-bold text-xs">
                Audited ID Registry
              </span>
              <h3 className="text-xl font-bold text-white">Public Membership Verification</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Verify any active Jivan Dhara member ID card using our secure verification system.
                Protects privacy while ensuring complete authenticity.
              </p>
            </div>

            <Link
              href="/members"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200"
            >
              <span>Search Member Verification Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
