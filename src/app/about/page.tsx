import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  Users,
  Target,
  Award,
  Heart,
  Calendar,
  Building,
  ArrowRight,
} from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About Us | History, Mission & Governance",
  description:
    "Learn about Jivan Dhara Organisation, established in 2008 in Kolkata. Discover our mission, 9-member governing body, decentralized management, and history of grassroots service across West Bengal.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const timelineEvents = [
    {
      year: "2008",
      title: "Foundation in Kolkata",
      desc: "Jivan Dhara Organisation was founded by dedicated social workers in Kolkata to address critical socio-economic gaps in education, health, and rural livelihood across West Bengal.",
    },
    {
      year: "2012",
      title: "Free RCH & General Health Camp Expansion",
      desc: "Launched regular community health camps, maternal & child healthcare (RCH), and immunization awareness in under-served urban slums and rural districts.",
    },
    {
      year: "2017",
      title: "PMGDISHA Digital Saksharta Mission",
      desc: "Partnered with national digital literacy initiatives to train thousands of rural youth and women in basic computer operations, cyber safety, and digital financial transactions.",
    },
    {
      year: "2020",
      title: "COVID-19 Relief & Food Distribution",
      desc: "Mobilized active volunteer networks to supply dry rations, cooked meals, sanitization kits, and mask distribution across affected communities.",
    },
    {
      year: "2024 - Present",
      title: "Decentralized Empowerment & Online Membership",
      desc: "Strengthening community governance through democratically elected committee structures, digital membership ID cards, and expanded agricultural skill programs.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              About Jivan Dhara Organisation
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Rooted in Compassion, Driven by Community
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Established in 2008 in Kolkata, we are a democratic, non-governmental sewa trust
              dedicated to creating lasting improvements in the lives of deprived and marginalized
              communities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              About Our Organisation & Origins
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong>Jivan Dhara Organisation (JDO)</strong> is a non-governmental organization
              based in Kolkata founded in the year 2008. We work on crucial issues affecting both the
              urban and rural masses, with special emphasis on <em>Education, Agriculture, Environment,
              Health, and Women Empowerment</em>.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Our team comprises people from multidisciplinary and multi-sector backgrounds across
              West Bengal who share a common platform of thinking. We put collective effort into
              uplifting the lives of those who grow up with inadequate education, healthcare,
              resources, and psychological support.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-base text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Democratic & Decentralized Governance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A <strong>Governing Committee consisting of 9 persons</strong> elected democratically by
                its General Body governs JDO (NGO). Elections on the board are held every five years.
                JDO runs on a decentralized management system headed by the Secretary, supported by a
                cadre of dedicated professional and administrative staff. Program performances are
                monitored in regular quarterly review and planning meetings.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                &ldquo;{settings.vision}&rdquo;
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-600 text-slate-950 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-bold text-xl">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                &ldquo;{settings.mission}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Organisation Timeline */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Organisation Milestones (2008 – Present)
            </h2>
          </div>

          <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-32 space-y-8 py-4">
            {timelineEvents.map((evt) => (
              <div key={evt.year} className="relative pl-6 sm:pl-10 group">
                {/* Year Badge */}
                <div className="sm:absolute sm:-left-32 sm:top-0 font-extrabold text-sm sm:text-lg text-emerald-800 mb-1 sm:mb-0">
                  {evt.year}
                </div>

                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-base text-slate-900">{evt.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Guiding Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Human Rights with Dignity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensuring every child, woman, and senior citizen possesses fundamental rights and self-respect.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Grassroots Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Democratic 9-member board reviews, public daily work logs, and verified beneficiary records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Collaborative Action</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building partnerships with local government bodies, healthcare workers, and active volunteers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900">Self-Reliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focusing on practical skills, vocational training, and PMGDISHA computer literacy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-emerald-950 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Join Our 18-Year Legacy of Social Service
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Become a registered member for ₹50, volunteer in health camps, or support educational kits for
            marginalized students.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/membership"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm"
            >
              Become a Member (₹50)
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
