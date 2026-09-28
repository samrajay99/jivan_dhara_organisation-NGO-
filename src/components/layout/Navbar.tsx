"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Heart,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  Phone,
  Mail,
  Home,
  Info,
  Calendar,
  Image as ImageIcon,
  FileText,
  Activity,
  CheckCircle,
  HelpCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

interface NavUser {
  name?: string;
  role?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check session on mount
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Activities", href: "/activities" },
    {
      name: "Updates",
      dropdown: [
        { name: "Daily Status", href: "/daily-status", desc: "Grassroots work logs" },
        { name: "Notice Board", href: "/notices", desc: "Urgent & general announcements" },
        { name: "Events", href: "/events", desc: "Camps, drives & meetings" },
      ],
    },
    { name: "Impact", href: "/impact" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Jivan Dhara Organisation • Est. 2008 (Kolkata, WB)
            </span>
            <a
              href="tel:+919211420420"
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              +91 9211420420
            </a>
            <a
              href="mailto:kumarpradip0303@gmail.com"
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              kumarpradip0303@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/faq"
              className="hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </Link>
            <Link
              href="/members"
              className="hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> ID Verification
            </Link>
            {user?.role?.includes("ADMIN") && (
              <Link
                href="/admin"
                className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1"
              >
                <LayoutDashboard className="w-3 h-3" /> Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-emerald-100"
            : "bg-white py-3.5 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-amber-400 bg-white group-hover:scale-105 transition-transform flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Jivan Dhara Organisation Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                  Jivan Dhara <span className="text-emerald-700">Organisation</span>
                </span>
                <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">
                  Regd. Sewa Trust • Kolkata
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-gray-700">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors ${
                        pathname.startsWith("/daily-status") ||
                        pathname.startsWith("/notices") ||
                        pathname.startsWith("/events")
                          ? "text-emerald-700 font-semibold bg-emerald-50/80"
                          : ""
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 hover:bg-emerald-50 text-gray-800 hover:text-emerald-700 transition-colors"
                          >
                            <div className="font-medium text-sm">{sub.name}</div>
                            <div className="text-xs text-gray-500 font-normal">{sub.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-emerald-700 font-semibold bg-emerald-50"
                        : "hover:text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/90 border border-emerald-300/60 transition-all hover:shadow-sm"
              >
                <UserPlus className="w-4 h-4 text-emerald-700" />
                <span>Join (₹50)</span>
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white/80" />
                <span>Donate</span>
              </Link>

              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <Link
                    href={user.role?.includes("ADMIN") ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-colors"
                  >
                    <User className="w-4 h-4 text-emerald-700" />
                    <span className="max-w-[100px] truncate">{user.name || "Account"}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/donate"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-emerald-700"
              >
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
              <Link
                href="/membership"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-sm border border-emerald-200"
              >
                <UserPlus className="w-4 h-4" /> Become a Member (₹50)
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-700 text-white font-semibold text-sm shadow-sm"
              >
                <Heart className="w-4 h-4 fill-white/80" /> Donate Now
              </Link>
            </div>

            <div className="space-y-1 py-1 text-sm font-medium text-gray-700">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Home className="w-4 h-4 text-emerald-600" /> Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Info className="w-4 h-4 text-emerald-600" /> About Us
              </Link>
              <Link
                href="/activities"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Activity className="w-4 h-4 text-emerald-600" /> Our Activities & PMGDISHA
              </Link>
              <Link
                href="/daily-status"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Daily NGO Status
              </Link>
              <Link
                href="/events"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Calendar className="w-4 h-4 text-emerald-600" /> Events & Health Camps
              </Link>
              <Link
                href="/notices"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <FileText className="w-4 h-4 text-emerald-600" /> Notice Board
              </Link>
              <Link
                href="/impact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Impact & Transparency
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" /> Photo & Video Gallery
              </Link>
              <Link
                href="/reviews"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Heart className="w-4 h-4 text-emerald-600" /> Reviews & Testimonials
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> Contact Us
              </Link>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href={user.role?.includes("ADMIN") ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 rounded-lg bg-gray-100 text-gray-800 font-medium text-center"
                  >
                    Go to {user.role?.includes("ADMIN") ? "Admin Panel" : "Member Dashboard"} ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2 px-4 rounded-lg text-red-600 hover:bg-red-50 font-medium text-center text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 rounded-lg bg-gray-100 text-gray-800 font-medium text-center text-sm"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-medium text-center text-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
