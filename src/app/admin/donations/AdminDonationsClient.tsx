"use client";

import React, { useState } from "react";
import { Download, Search, Heart, CheckCircle, ShieldCheck } from "lucide-react";
import { formatINR, formatDate } from "@/lib/utils";

interface DonationRecord {
  id: string;
  donorName: string;
  email?: string | null;
  mobile?: string | null;
  amount: number;
  panNumber?: string | null;
  purpose: string;
  paymentMethod: string;
  upiRef?: string | null;
  status: string;
  receiptNumber?: string | null;
  createdAt: string | Date;
}

export default function AdminDonationsClient({
  initialDonations,
}: {
  initialDonations: DonationRecord[];
}) {
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [search, setSearch] = useState("");

  const filteredDonations = donations.filter((d) => {
    return (
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      (d.email && d.email.toLowerCase().includes(search.toLowerCase())) ||
      (d.receiptNumber && d.receiptNumber.toLowerCase().includes(search.toLowerCase())) ||
      (d.upiRef && d.upiRef.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const exportCSV = () => {
    const headers = [
      "Receipt Number",
      "Donor Name",
      "Amount",
      "Email",
      "Mobile",
      "PAN",
      "Purpose",
      "UPI Reference",
      "Status",
      "Date",
    ];

    const rows = filteredDonations.map((d) => [
      d.receiptNumber || "N/A",
      `"${d.donorName}"`,
      d.amount,
      d.email || "N/A",
      d.mobile || "N/A",
      d.panNumber || "N/A",
      `"${d.purpose}"`,
      d.upiRef || "N/A",
      d.status,
      formatDate(d.createdAt),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Jivan_Dhara_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Donation Records & Transparency</h1>
          <p className="text-xs text-slate-500">
            Total contributions recorded: <strong>{formatINR(totalRaised)}</strong>
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export CSV ({filteredDonations.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by donor name, email, receipt number, or UTR..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Receipt No.</th>
                <th className="p-4">Donor Details</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">UPI Reference</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No donations found matching query.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-800">
                      {d.receiptNumber || "N/A"}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{d.donorName}</div>
                      <div className="text-[11px] text-slate-400">
                        {d.email || d.mobile || "Anonymous"}
                      </div>
                    </td>

                    <td className="p-4 font-extrabold text-slate-900 text-sm">
                      {formatINR(d.amount)}
                    </td>

                    <td className="p-4 max-w-[200px] truncate">{d.purpose}</td>

                    <td className="p-4 font-mono text-emerald-900 font-semibold">{d.upiRef}</td>

                    <td className="p-4 text-slate-500">{formatDate(d.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
