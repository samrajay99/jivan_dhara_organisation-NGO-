import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Laptop,
  BookOpen,
  Stethoscope,
  Sparkles,
  Sprout,
  Sun,
  HeartHandshake,
  UserCheck,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Activities & Programs | PMGDISHA, Healthcare & Welfare",
  description:
    "Explore the key social programs of Jivan Dhara Organisation: PMGDISHA digital literacy, free health camps, school bag distribution, women empowerment, agricultural guidance, and elderly care in West Bengal.",
};

export default function ActivitiesPage() {
  const activitiesList = [
    {
      id: "pmgdisha",
      title: "PMGDISHA (Digital Literacy Mission)",
      category: "Digital Empowerment",
      icon: Laptop,
      color: "from-blue-600 to-indigo-700",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      overview:
        "Under the Pradhan Mantri Gramin Digital Saksharta Abhiyaan (PMGDISHA), Jivan Dhara Organisation works tirelessly to make rural and semi-urban households digitally literate.",
      details: [
        "Hands-on training in operating computers, smartphones, and tablets.",
        "Education on digital payments (BHIM, UPI, Net Banking) and cyber safety.",
        "Accessing essential government portals (e-District, DigiLocker, Aadhaar services).",
        "Empowering one digitally trained member in every eligible rural family.",
      ],
    },
    {
      id: "healthcare",
      title: "Free Health Checkups, RCH Camps & Vaccination",
      category: "Public Healthcare",
      icon: Stethoscope,
      color: "from-emerald-600 to-teal-700",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
      overview:
        "Addressing poor sanitation, lack of hygiene awareness, and health vulnerabilities by bringing doctors and medical care directly to underserved neighborhoods.",
      details: [
        "Reproductive and Child Health (RCH) awareness and maternal health checkups.",
        "Routine child vaccination mobilization and nutritional counseling.",
        "Pad Yatras (awareness foot marches) and community health meetings.",
        "Free distribution of generic medicines, vitamins, and hygiene kits.",
      ],
    },
    {
      id: "education",
      title: "Education & School Bag Distribution",
      category: "Child Education",
      icon: BookOpen,
      color: "from-amber-600 to-orange-700",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
      overview:
        "Making the child a self-motivated and independent learner by eliminating economic barriers to elementary and secondary schooling.",
      details: [
        "Annual distribution of school bags, uniform sets, notebooks, and stationery to BPL children.",
        "Community mobilization to eliminate school dropouts.",
        "Evening remedial study centers for children in disadvantaged wards.",
        "Parent counseling on the long-term value of uninterrupted education.",
      ],
    },
    {
      id: "women",
      title: "Women Empowerment & Vocational Training",
      category: "Gender Equality",
      icon: Sparkles,
      color: "from-purple-600 to-pink-700",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      overview:
        "Empowering women with technical skills, legal literacy, and financial self-sufficiency to establish equal dignity in family and community livelihood.",
      details: [
        "Certified vocational training in tailoring, stitching, and local handicrafts.",
        "Self-Help Group (SHG) formation and micro-finance guidance.",
        "Workshops on women's legal rights and domestic violence prevention.",
        "Market linkage support for women micro-entrepreneurs.",
      ],
    },
    {
      id: "agriculture",
      title: "Agricultural Program & Farmer Guidance",
      category: "Rural Livelihood",
      icon: Sprout,
      color: "from-lime-600 to-green-700",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2225a?w=800&auto=format&fit=crop&q=80",
      overview:
        "Supporting the backbone of India's economy with climate-resilient practices, debt awareness, and government subsidy navigation.",
      details: [
        "Training on organic bio-fertilizers, soil health, and water conservation.",
        "Awareness camps on crop insurance (PMFBY) and institutional credit schemes.",
        "Guidance to prevent debt trap and distress in rural farming communities.",
        "Promoting community seed banks and indigenous crop varieties.",
      ],
    },
    {
      id: "elderly",
      title: "Old Age Welfare & Senior Care",
      category: "Senior Support",
      icon: HeartHandshake,
      color: "from-rose-600 to-red-700",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?w=800&auto=format&fit=crop&q=80",
      overview:
        "Reaching out to elderly citizens living in vulnerability due to inadequate pensions and changing socio-economic structures.",
      details: [
        "Regular doorstep health monitoring and free prescription medicines.",
        "Winter relief distribution of warm blankets, clothes, and dry rations.",
        "Assistance with old age pension enrollments and government welfare schemes.",
        "Social interaction days to mitigate loneliness and emotional neglect.",
      ],
    },
    {
      id: "environment",
      title: "Environment & Wildlife Conservation",
      category: "Eco Protection",
      icon: Sun,
      color: "from-teal-600 to-emerald-700",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      overview:
        "Fostering reverence for nature and wildlife through community afforestation and eco-literacy.",
      details: [
        "Massive native tree plantation drives across school campuses and public lands.",
        "Community awareness against plastic pollution and river degradation.",
        "Wildlife education workshops explaining ecosystem equilibrium.",
        "Rainwater harvesting and clean drinking water awareness.",
      ],
    },
    {
      id: "youth-skills",
      title: "Youth Skill Development",
      category: "Employability",
      icon: UserCheck,
      color: "from-cyan-600 to-blue-700",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80",
      overview:
        "Equipping rural and urban youth with vocational capabilities that match real market demand.",
      details: [
        "Spoken English, communication, and workplace readiness sessions.",
        "Technical certificate courses in data entry, electronics repair, and retail.",
        "Career counseling to prevent youth underemployment.",
        "Mentorship from established professionals and community leaders.",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Jivan Dhara Programs
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Activities & Social Initiatives
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every initiative of Jivan Dhara Organisation is driven by authentic on-ground needs.
              Explore our core areas of impact spanning education, healthcare, digital literacy, and
              rural welfare.
            </p>
          </div>
        </div>
      </div>

      {/* Activities Detailed List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 gap-12">
          {activitiesList.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 transition-all hover:shadow-md"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center font-bold shadow-md`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          {item.category}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{item.title}</h2>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed">{item.overview}</p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Key Interventions:
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                        {item.details.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <Link
                        href="/membership"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        <span>Join as Member (₹50)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/events"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
                      >
                        <span>View Related Events</span>
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Call */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Support Real Grassroots Activities</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            All our programs are maintained through democratic committee planning and verified community
            contributions. Become a part of our movement today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/membership"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm"
            >
              Become a Member (₹50)
            </Link>
            <Link
              href="/donate"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm"
            >
              Donate via UPI QR
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
