"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Copy,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2,
  QrCode,
  Heart,
  FileCheck,
  Check,
} from "lucide-react";

export default function MembershipFormClient() {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    parentName: "",
    dob: "",
    gender: "Male",
    bloodGroup: "O+",
    mobile: "",
    whatsapp: "",
    email: "",
    idType: "Aadhaar",
    idNumber: "",
    address: "",
    villageTown: "",
    postOffice: "",
    policeStation: "",
    district: "Kolkata",
    state: "West Bengal",
    pinCode: "700037",
    photoUrl: "",

    // Step 2: Membership Details
    membershipType: "General Member",
    branch: "Kolkata Central",
    occupation: "",
    education: "",
    volunteerInterests: "Child Education & Health Camps",
    emergencyContact: "",
    source: "Website",
    declaration: false,

    // Step 3 & 4: Payment Information
    upiRef: "",
    screenshotUrl: "",
    password: "", // User password for account creation
  });

  const upiId = "jivandhara@upi";
  const upiNumber = "9211420420";
  const membershipFee = 50;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!formData.fullName || !formData.mobile || !formData.email || !formData.idNumber) {
        setError("Please fill all mandatory personal details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.declaration) {
        setError("Please accept the declaration to proceed.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.upiRef) {
      setError("Please provide the UPI Transaction Reference / UTR Number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit membership application");
      }

      setSubmittedData(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
          <div
            className={`flex items-center gap-1.5 ${
              step >= 1 ? "text-emerald-700" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-emerald-700 text-white" : "bg-slate-100"
              }`}
            >
              1
            </div>
            <span className="hidden sm:inline">Personal Info</span>
          </div>

          <div className="h-0.5 flex-1 bg-slate-200 mx-2" />

          <div
            className={`flex items-center gap-1.5 ${
              step >= 2 ? "text-emerald-700" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-emerald-700 text-white" : "bg-slate-100"
              }`}
            >
              2
            </div>
            <span className="hidden sm:inline">Membership</span>
          </div>

          <div className="h-0.5 flex-1 bg-slate-200 mx-2" />

          <div
            className={`flex items-center gap-1.5 ${
              step >= 3 ? "text-emerald-700" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-emerald-700 text-white" : "bg-slate-100"
              }`}
            >
              3
            </div>
            <span className="hidden sm:inline">Review</span>
          </div>

          <div className="h-0.5 flex-1 bg-slate-200 mx-2" />

          <div
            className={`flex items-center gap-1.5 ${
              step >= 4 ? "text-emerald-700" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                step >= 4 ? "bg-emerald-700 text-white" : "bg-slate-100"
              }`}
            >
              4
            </div>
            <span className="hidden sm:inline">Payment (₹50)</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Application Submitted Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your membership application and UPI
                payment details have been recorded.
              </p>
            </div>

            {/* Application ID Card */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-medium">Application Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  PENDING VERIFICATION
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Membership Fee:</span>
                <span className="text-sm font-bold text-slate-900">₹50 (UPI Submitted)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">UPI Ref / UTR:</span>
                <span className="font-mono text-xs font-bold text-emerald-800">{formData.upiRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Registered Email:</span>
                <span className="text-xs text-slate-700">{formData.email}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-700 inline mr-1" />
              Our administrative secretarial desk will verify your payment and KYC details within
              24-48 hours. Once approved, your <strong>Official NGO ID Card</strong> will be activated
              and ready for instant download.
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition-all"
              >
                Log In to Member Dashboard
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {error && (
              <div className="mb-6 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: PERSONAL INFORMATION */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Step 1 of 4
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  <p className="text-xs text-slate-500">
                    Please provide accurate information as per your official KYC identification document.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rahul Roy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Father&apos;s / Mother&apos;s Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Parent's Name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="WhatsApp number"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      KYC ID Type *
                    </label>
                    <select
                      value={formData.idType}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="Voter ID">Voter ID / EPIC</option>
                      <option value="PAN">PAN Card</option>
                      <option value="Passport">Passport / Driving License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      KYC ID Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1234 5678 9012"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address / House No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full street address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Village / Town *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Town"
                      value={formData.villageTown}
                      onChange={(e) => setFormData({ ...formData, villageTown: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Post Office *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="P.O."
                      value={formData.postOffice}
                      onChange={(e) => setFormData({ ...formData, postOffice: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Police Station *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="P.S."
                      value={formData.policeStation}
                      onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="PIN"
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">District *</label>
                    <input
                      type="text"
                      required
                      placeholder="District"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Profile Photo URL / Photo Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or paste image link"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    You can also upload or change your photo later inside your Member Dashboard.
                  </span>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: MEMBERSHIP DETAILS & CONSENT */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Step 2 of 4
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Membership Information</h2>
                  <p className="text-xs text-slate-500">
                    Choose your membership type and declare your voluntary engagement preferences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                      Membership Category
                    </span>
                    <h3 className="text-base font-extrabold text-emerald-950 mt-1">General Member</h3>
                    <div className="text-xl font-extrabold text-emerald-800 mt-2">₹50 / Term</div>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      Includes official ID card, voting rights in 5-year General Body, and activity access.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Regional Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="Kolkata Central">Kolkata Central (Headquarters)</option>
                      <option value="North Kolkata">North Kolkata Branch</option>
                      <option value="South Kolkata">South Kolkata Branch</option>
                      <option value="Howrah & Suburbs">Howrah & Suburbs</option>
                      <option value="Rural Bengal Region">Rural Bengal Region</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Occupation</label>
                    <input
                      type="text"
                      placeholder="e.g. Teacher, Farmer, Student, Business"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Educational Qualification
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Secondary / Graduate / Post Graduate"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Volunteer Interests (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Health Camps, PMGDISHA, Tree Plantation"
                      value={formData.volunteerInterests}
                      onChange={(e) =>
                        setFormData({ ...formData, volunteerInterests: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Emergency Contact (Name & Phone)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9830099999 (Brother)"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContact: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Create Member Account Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Create a secure password to access your Member Dashboard"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    You will use your email ({formData.email || "provided in Step 1"}) and this
                    password to log in.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="declaration"
                      required
                      checked={formData.declaration}
                      onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500 mt-1"
                    />
                    <label htmlFor="declaration" className="text-xs text-slate-700 leading-relaxed">
                      I solemnly declare that the particulars provided by me are true and accurate. I
                      agree to abide by the constitution and ethical rules of Jivan Dhara Organisation
                      and commit to upholding human rights and social welfare without any prejudice.
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md flex items-center gap-2"
                  >
                    <span>Review Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: REVIEW DETAILS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Step 3 of 4
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Review Application Details</h2>
                  <p className="text-xs text-slate-500">
                    Verify all entries carefully before proceeding to the ₹50 membership payment step.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">Full Name:</span>
                    <span className="font-bold text-slate-900">{formData.fullName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">Parent&apos;s Name:</span>
                    <span className="font-bold text-slate-900">{formData.parentName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">Date of Birth & Gender:</span>
                    <span>
                      {formData.dob} ({formData.gender}, Blood Group: {formData.bloodGroup})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">Contact:</span>
                    <span>
                      {formData.mobile} • {formData.email}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">KYC Verification:</span>
                    <span className="font-mono">
                      {formData.idType} ({formData.idNumber})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                    <span className="text-slate-400 font-semibold">Address:</span>
                    <span>
                      {formData.address}, {formData.villageTown}, P.O. {formData.postOffice}, P.S.{" "}
                      {formData.policeStation}, {formData.district}, {formData.state} -{" "}
                      {formData.pinCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-slate-400 font-semibold">Membership Fee Due:</span>
                    <span className="font-extrabold text-emerald-800 text-sm">₹50 (One-Time)</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Edit Details
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md flex items-center gap-2"
                  >
                    <span>Proceed to Pay ₹50</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: UPI PAYMENT & SUBMISSION */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase">
                    Step 4 of 4
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Membership Fee Payment: ₹50</h2>
                  <p className="text-xs text-slate-500">
                    Scan the official QR code using any UPI app or transfer directly to our official UPI ID.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-6 rounded-3xl bg-slate-50 border border-slate-200">
                  {/* QR Code display */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-44 h-44 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white text-center space-y-2">
                      <QrCode className="w-24 h-24 text-emerald-400" />
                      <div className="text-[10px] font-mono font-bold">UPI: {upiId}</div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 mt-2">
                      Scan with GPay / PhonePe / Paytm
                    </span>
                    <span className="text-[10px] text-emerald-800 font-extrabold mt-0.5">
                      Amount: ₹50
                    </span>
                  </div>

                  {/* Manual UPI details */}
                  <div className="sm:col-span-7 space-y-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Official Organisation UPI ID:
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-emerald-900 select-all">
                          {upiId}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Helpline / UPI Phone Number:
                      </span>
                      <p className="font-mono font-bold text-slate-800">{upiNumber}</p>
                    </div>

                    <div className="text-[11px] text-slate-500 leading-relaxed">
                      💡 <strong>Note:</strong> After completing the ₹50 transfer, copy the 12-digit
                      UPI Reference / UTR Number from your banking app and paste it below.
                    </div>
                  </div>
                </div>

                {/* UTR entry */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      UPI Reference / UTR / Transaction ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 409283719283 or UPI12345678"
                      value={formData.upiRef}
                      onChange={(e) => setFormData({ ...formData, upiRef: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Payment Proof / Screenshot Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://... or image link of payment receipt"
                      value={formData.screenshotUrl}
                      onChange={(e) => setFormData({ ...formData, screenshotUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4" />
                        <span>Submit Membership Application (₹50)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
