import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  UserPlus,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: About & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-white flex-shrink-0 shadow">
                <Image
                  src="/logo.png"
                  alt="Jivan Dhara Organisation Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Jivan Dhara <span className="text-emerald-400">Organisation</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  Registered Non-Governmental Sewa Trust • Founded 2008
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Jivan Dhara Organisation is a grassroots NGO based in Kolkata, dedicated to uplifting
              marginalized and socio-economically weaker communities across West Bengal through
              quality education, digital literacy (PMGDISHA), free health camps, women empowerment,
              child welfare, and sustainable agriculture.
            </p>

            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Decentralized Democratic Governance
              </div>
              <p>
                Governed by a democratically elected 9-member Governing Committee elected every five
                years by the General Body, headed by the Secretary.
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  About Us & History
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Our Activities
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-emerald-400 transition-colors">
                  Impact & Transparency
                </Link>
              </li>
              <li>
                <Link href="/daily-status" className="hover:text-emerald-400 transition-colors">
                  Daily Work Log
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Events & Health Camps
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-emerald-400 transition-colors">
                  Official Notices
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-emerald-400 transition-colors">
                  Community Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Member & Community */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Involvement</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/membership"
                  className="text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Become a Member (₹50)
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5" /> Donate Online
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-emerald-400 transition-colors">
                  Verify Membership ID
                </Link>
              </li>
              <li>
                <Link href="/contact#volunteer" className="hover:text-emerald-400 transition-colors">
                  Volunteer Application
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Member Portal Login
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span className="text-xs leading-relaxed">
                  12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919211420420" className="text-xs hover:text-emerald-400">
                  +91 9211420420
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:kumarpradip0303@gmail.com" className="text-xs hover:text-emerald-400">
                  kumarpradip0303@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-1">Official UPI ID for Contributions:</span>
                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 font-semibold select-all">
                  jivandhara@upi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>
            Copyright © {currentYear} <strong>Jivan Dhara Organisation</strong> (JDO NGO). All rights
            reserved.
          </p>

          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacy-policy" className="hover:text-slate-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200">
              Terms & Conditions
            </Link>
            <Link href="/members" className="hover:text-slate-200">
              Public Verification
            </Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-400">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
