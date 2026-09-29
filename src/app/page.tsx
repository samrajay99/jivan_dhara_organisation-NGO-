import React from "react";
import Link from "next/link";
import {
  Heart,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  FileText,
  Activity,
  CheckCircle,
  Users,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  Stethoscope,
  Laptop,
  Sprout,
  Sun,
  Award,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Fresh dynamic content

export default async function HomePage() {
  const settings = await getSiteSettings();

  // Fetch real dynamic data from database safely
  let dailyStatuses: any[] = [];
  let notices: any[] = [];
  let upcomingEvents: any[] = [];
  let galleryItems: any[] = [];
  let reviews: any[] = [];

  try {
    const results = await Promise.all([
      prisma.dailyStatus.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.notice.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.event.findMany({
        where: { isPublished: true },
        orderBy: { date: "asc" },
        take: 3,
      }),
      prisma.galleryItem.findMany({
        where: { isFeatured: true },
        orderBy: { order: "asc" },
        take: 6,
      }),
      prisma.review.findMany({
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);
    dailyStatuses = results[0] || [];
    notices = results[1] || [];
    upcomingEvents = results[2] || [];
    galleryItems = results[3] || [];
    reviews = results[4] || [];
  } catch {
    // Graceful fallback to default state if database is still initializing
  }

  const activities = [
    {
      title: "PMGDISHA Digital Literacy",
      desc: "Empowering rural youth and women with practical computer literacy, online government services, and digital financial tools under the PMGDISHA national mission.",
      icon: Laptop,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      link: "/activities",
    },
    {
      title: "Free Health Checkups & RCH Camps",
      desc: "Organizing regular free medical consultations, maternal-child health screening (RCH), diagnostic checkups, vaccination awareness, and essential medicine distribution.",
      icon: Stethoscope,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      link: "/activities",
    },
    {
      title: "Child Welfare & Education Support",
      desc: "Preventing school dropouts through free educational kits, school bags, notebooks, and learning centers for underprivileged children across West Bengal.",
      icon: BookOpen,
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      link: "/activities",
    },
    {
      title: "Women Empowerment & Skill Training",
      desc: "Vocational tailoring, handicrafts, and self-reliance workshops for women to foster financial independence and entrepreneurial dignity.",
      icon: Sparkles,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      link: "/activities",
    },
    {
      title: "Agricultural Program & Farmer Guidance",
      desc: "Supporting smallholder farmers with modern organic techniques, soil health advice, and navigation of government grants and crop protection schemes.",
      icon: Sprout,
      color: "bg-lime-500/10 text-lime-600 border-lime-200",
      link: "/activities",
    },
    {
      title: "Environment & Green Drives",
      desc: "Massive sapling plantation, forest preservation awareness, wildlife education, and environmental protection initiatives in community zones.",
      icon: Sun,
      color: "bg-teal-500/10 text-teal-600 border-teal-200",
      link: "/activities",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Established 2008 in Kolkata • 18 Years of Grassroots Sewa</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Serving Humanity with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Dignity & Compassion
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Jivan Dhara Organisation is a community-first sewa trust dedicated to empowering
                marginalized children, women, youth, and farmers through quality education, free healthcare,
                digital literacy, and sustainable livelihood support.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all"
                >
                  <UserPlus className="w-5 h-5 text-amber-300" />
                  <span>Become a Member (₹50)</span>
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <Heart className="w-5 h-5 fill-slate-950/70" />
                  <span>Donate Online</span>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/15 transition-all"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">9-Member Board</div>
                    <div className="text-[10px] text-slate-400">Democratic elections</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">100% Grassroots</div>
                    <div className="text-[10px] text-slate-400">On-ground verified</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Instant NGO ID</div>
                    <div className="text-[10px] text-slate-400">QR verified card</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-gradient-to-tr from-emerald-800/40 to-slate-900/80 p-2.5 rounded-3xl border border-emerald-700/40 backdrop-blur-xl shadow-2xl">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80"
                      alt="Jivan Dhara Organisation Child Welfare and Education"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-extrabold uppercase">
                        Education Support
                      </span>
                      <h3 className="text-lg font-bold mt-1 text-white">
                        Distributing Learning Kits to Marginalized Students
                      </h3>
                      <p className="text-xs text-slate-300">
                        Ensuring every child in urban & rural settlements continues their schooling.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Member Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white text-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ₹50
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Online Membership</div>
                    <div className="text-[11px] text-emerald-700 font-medium">
                      Instant verification & PDF ID Card
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC IMPACT STATS SECTION */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-800">
                {settings.stat_members}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Total Members</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div className="text-2xl sm:text-4xl font-extrabold text-amber-700">
                {settings.stat_people_helped}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">People Helped</div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
              <div className="text-2xl sm:text-4xl font-extrabold text-blue-800">
                {settings.stat_events}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Events & Camps
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <div className="text-2xl sm:text-4xl font-extrabold text-purple-800">
                {settings.stat_volunteers}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Active Volunteers
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
              <div className="text-2xl sm:text-4xl font-extrabold text-teal-800">
                {settings.stat_years}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Years of Service (2008)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT JEEVAN DHARA & CORE MISSION */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                About Our Organisation
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Dedicated to Uplifting the Deprived Sections of Society
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded in the year <strong>2008 in Kolkata</strong>, Jivan Dhara Organisation (JDO)
                works actively on challenges affecting both urban and rural communities in West Bengal.
                Our multidisciplinary team unites people who share a common vision: to uplift those
                growing up with inadequate education, healthcare, resources, and social guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Our Mission
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {settings.mission}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-amber-700">
                    <CheckCircle className="w-4 h-4 text-amber-600" /> Our Vision
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {settings.vision}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-700"
                >
                  <span>Learn more about our governance & history</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80"
                alt="Health checkup camp"
                className="rounded-2xl shadow-md object-cover h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                alt="Women skill center"
                className="rounded-2xl shadow-md object-cover h-64 w-full mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR ACTIVITIES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Community Programs
            </h2>
            <p className="text-sm text-slate-600">
              From digital education to free medical checkups and sustainable agriculture, our initiatives
              focus on long-term empowerment and human dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.title}
                  className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg border border-slate-200/80 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center ${act.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60">
                    <Link
                      href={act.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Read Full Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 transition-all"
            >
              <span>View All Programs & Activities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LATEST DAILY WORK LOG & NOTICES (SIDE BY SIDE DYNAMIC) */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Daily NGO Status */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Real On-Ground Work
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Daily NGO Activity Log
                  </h3>
                </div>
                <Link
                  href="/daily-status"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  View All Logs <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {dailyStatuses.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                  No daily status updates published yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {dailyStatuses.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                          {item.category}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(item.date)}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          {item.location}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-emerald-700">
                            {item.volunteersCount} Volunteers
                          </span>
                          <span>•</span>
                          <span className="font-medium text-amber-700">
                            {item.beneficiariesCount} Beneficiaries
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Official Notices */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Official Announcements
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Notice Board
                  </h3>
                </div>
                <Link
                  href="/notices"
                  className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  All Notices <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {notices.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                  No active notices at this moment.
                </div>
              ) : (
                <div className="space-y-3">
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 rounded-xl bg-white border transition-all space-y-2 ${
                        n.priority === "URGENT"
                          ? "border-red-300 bg-red-50/20"
                          : n.priority === "IMPORTANT"
                          ? "border-amber-300 bg-amber-50/20"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            n.priority === "URGENT"
                              ? "bg-red-100 text-red-700"
                              : n.priority === "IMPORTANT"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {n.priority}
                        </span>
                        <span className="text-[11px] text-slate-500">{formatDate(n.date)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS & HEALTH CAMPS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Get Involved On-Ground
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Upcoming Events & Camps
              </h2>
            </div>
            <Link
              href="/events"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>View Full Events Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-200">
                    <img
                      src={
                        evt.coverImage ||
                        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                      }
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                      {formatDate(evt.date)}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px] font-bold">
                      {evt.status}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-slate-900">{evt.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {evt.startTime} - {evt.endTime}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/events#${evt.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center block transition-colors"
                  >
                    Register for Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY JOIN US & WHY DONATE CTA SECTION */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Membership Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900/60 to-slate-950 border border-emerald-600/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase border border-emerald-500/30">
                  Membership Drive • ₹50 Only
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Why Should You Become a Member?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Join our verified community network across West Bengal. Your membership fee of ₹50
                  supports grassroots activities and entitles you to:
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Official Jivan Dhara Membership ID Card with QR Verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Voting eligibility in general body meetings every 5 years
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Priority participation in health camps, PMGDISHA workshops & volunteer drives
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Access to Member Dashboard, notice notifications, and activity certificates
                  </li>
                </ul>
              </div>

              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg transition-all"
              >
                <UserPlus className="w-4 h-4" /> Apply Online Now (₹50)
              </Link>
            </div>

            {/* Donation Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 to-slate-950 border border-amber-600/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase border border-amber-500/30">
                  Transparent Contributions
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Why Should You Donate?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every contribution is channeled directly towards verified on-ground social welfare.
                  We publish periodic reports so you know your support creates real human impact:
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ₹100 provides notebooks & school bags for 1 disadvantaged child
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ₹500 sponsors health checkup medicines & hygiene kit for 5 elderly persons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ₹1,000 supports practical computer literacy modules under PMGDISHA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    Instant downloadable official donation receipt with unique serial number
                  </li>
                </ul>
              </div>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg transition-all"
              >
                <Heart className="w-4 h-4 fill-slate-950" /> Donate via UPI / QR Code
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & COMMUNITY REVIEWS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Community Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Testimonials & Feedback
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Feedback from volunteers, beneficiaries, and monthly supporters across West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rev.name}</div>
                    <div className="text-[11px] text-slate-500">{rev.roleOrTitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
            >
              Write a Review / View All Testimonials <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. PHOTO GALLERY PREVIEW */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Visual Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Our Work in Pictures
              </h2>
            </div>
            <Link
              href="/gallery"
              className="mt-4 md:mt-0 text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Explore Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-sm"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {item.category.replace("_", " ")}
                  </span>
                  <p className="text-xs font-bold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            &ldquo;Together, We Can Make a Difference.&rdquo;
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether through ₹50 membership, participating in local health camps, or contributing to
            child education, your association gives strength to our grassroots mission.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/membership"
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-extrabold text-sm sm:text-base shadow-xl hover:bg-emerald-50 active:scale-95 transition-all"
            >
              Become a Member (₹50)
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/80 text-white font-bold text-sm sm:text-base border border-emerald-400/40 transition-all"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
