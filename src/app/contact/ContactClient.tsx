"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  HeartHandshake,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function ContactClient() {
  const [activeTab, setActiveTab] = useState<"CONTACT" | "VOLUNTEER">("CONTACT");

  // Contact form state
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Volunteer form state
  const [volunteerData, setVolunteerData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "Kolkata, West Bengal",
    skills: "Teaching / Health Camp Assistance / Social Mobilization",
    availability: "Weekends / Flexible",
    areasOfInterest: "Education & PMGDISHA, Health Camps",
    message: "",
  });
  const [volLoading, setVolLoading] = useState(false);
  const [volSuccess, setVolSuccess] = useState(false);
  const [volError, setVolError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError(null);

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setContactSuccess(true);
    } catch (err: any) {
      setContactError(err.message || "Failed to send message");
    } finally {
      setContactLoading(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolLoading(true);
    setVolError(null);

    try {
      const res = await fetch("/api/volunteers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit volunteer application");
      setVolSuccess(true);
    } catch (err: any) {
      setVolError(err.message || "Failed to submit application");
    } finally {
      setVolLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Col: Contact Information & Location Map */}
      <div className="lg:col-span-5 space-y-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Headquarters & Office</h2>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Registered Address
                </span>
                <p className="font-medium text-slate-900 mt-0.5 leading-relaxed">
                  12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Helpline / Phone
                </span>
                <a
                  href="tel:+919211420420"
                  className="font-medium text-slate-900 hover:text-emerald-700 mt-0.5 block"
                >
                  +91 9211420420
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Email Address
                </span>
                <a
                  href="mailto:kumarpradip0303@gmail.com"
                  className="font-medium text-slate-900 hover:text-emerald-700 mt-0.5 block text-xs sm:text-sm break-all"
                >
                  kumarpradip0303@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Office Hours
                </span>
                <p className="font-medium text-slate-900 mt-0.5">
                  Mon – Sat: 10:00 AM – 06:00 PM (IST)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <a
              href="https://wa.me/919211420420"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect Instantly on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Google Maps Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" /> Map Location
            </h3>
            <a
              href="https://maps.google.com/?q=12,Raicharan+Sadhukhan+Road,Kolkata-700037"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-bold"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200 relative">
            <iframe
              title="Jivan Dhara Organisation Location"
              src="https://maps.google.com/maps?q=12,Raicharan%20Sadhukhan%20Road,Kolkata-700037&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Right Col: Interactive Tabs (General Inquiry vs Volunteer Registration) */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setActiveTab("CONTACT")}
              className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === "CONTACT"
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Send Message</span>
            </button>
            <button
              id="volunteer"
              onClick={() => setActiveTab("VOLUNTEER")}
              className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === "VOLUNTEER"
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Join as Volunteer</span>
            </button>
          </div>

          {activeTab === "CONTACT" ? (
            contactSuccess ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out to Jivan Dhara Organisation. Our secretarial staff will
                  review your inquiry and respond shortly.
                </p>
                <button
                  onClick={() => {
                    setContactSuccess(false);
                    setContactData({ name: "", email: "", mobile: "", subject: "", message: "" });
                  }}
                  className="text-xs font-bold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">General Inquiry</h3>
                  <p className="text-xs text-slate-500">
                    Questions about health camps, PMGDISHA classes, or donations? Write to us.
                  </p>
                </div>

                {contactError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{contactError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="10-digit phone"
                      value={contactData.mobile}
                      onChange={(e) => setContactData({ ...contactData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="Topic of inquiry"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message in detail..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {contactLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Contact Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )
          ) : volSuccess ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-950">Volunteer Application Received!</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for offering your skills to Jivan Dhara Organisation. Our volunteer
                coordinator will connect with you before the next field camp.
              </p>
              <button
                onClick={() => {
                  setVolSuccess(false);
                }}
                className="text-xs font-bold text-emerald-700 underline"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Volunteer Registration</h3>
                <p className="text-xs text-slate-500">
                  Join our active team of teachers, medical assistants, and community organizers.
                </p>
              </div>

              {volError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{volError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={volunteerData.name}
                    onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={volunteerData.phone}
                    onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={volunteerData.email}
                    onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="City / District"
                    value={volunteerData.location}
                    onChange={(e) => setVolunteerData({ ...volunteerData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skills & Profession *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Doctor, Teacher, Student, IT Professional, Social Worker"
                  value={volunteerData.skills}
                  onChange={(e) => setVolunteerData({ ...volunteerData, skills: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Areas of Interest *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Medical Camps, PMGDISHA Classes, Tree Plantation"
                  value={volunteerData.areasOfInterest}
                  onChange={(e) =>
                    setVolunteerData({ ...volunteerData, areasOfInterest: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Availability (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your previous volunteering or time availability..."
                  value={volunteerData.message}
                  onChange={(e) => setVolunteerData({ ...volunteerData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={volLoading}
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {volLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>Register as Volunteer</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
