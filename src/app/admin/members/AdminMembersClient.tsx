"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  ShieldCheck,
  AlertCircle,
  Clock,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MemberRecord {
  id: string;
  membershipId?: string | null;
  fullName: string;
  mobile: string;
  email: string;
  idType: string;
  idNumber: string;
  branch: string;
  status: string;
  joiningDate?: string | Date | null;
  rejectionReason?: string | null;
  payments?: any[];
  createdAt: string | Date;
}

export default function AdminMembersClient({
  initialMembers,
}: {
  initialMembers: MemberRecord[];
}) {
  const [members, setMembers] = useState<MemberRecord[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.membershipId && m.membershipId.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (memberId: string) => {
    if (!confirm("Confirm approval of ₹50 membership application?")) return;
    setActionLoading(memberId);

    try {
      const res = await fetch("/api/admin/members/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Approval failed");

      setMembers(members.map((m) => (m.id === memberId ? { ...m, ...data.member } : m)));
    } catch (err: any) {
      alert(err.message || "Failed to approve member");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (memberId: string) => {
    const reason = prompt("Enter reason for rejection:", "UPI Reference / KYC detail mismatch");
    if (!reason) return;

    setActionLoading(memberId);
    try {
      const res = await fetch("/api/admin/members/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, reason }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Rejection failed");

      setMembers(members.map((m) => (m.id === memberId ? { ...m, ...data.member } : m)));
    } catch (err: any) {
      alert(err.message || "Failed to reject member");
    } finally {
      setActionLoading(null);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Membership ID",
      "Full Name",
      "Mobile",
      "Email",
      "ID Type",
      "ID Number",
      "Branch",
      "Status",
      "UPI UTR",
      "Joining Date",
    ];

    const rows = filteredMembers.map((m) => [
      m.membershipId || "N/A",
      `"${m.fullName}"`,
      m.mobile,
      m.email,
      m.idType,
      `"${m.idNumber}"`,
      `"${m.branch}"`,
      m.status,
      m.payments?.[0]?.upiRef || "N/A",
      m.joiningDate ? formatDate(m.joiningDate) : "N/A",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Jivan_Dhara_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Member Applications & Directory</h1>
            <p className="text-xs text-slate-500">
              Manage member approvals, verify UPI payment references, and generate verified ID cards.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow self-start sm:self-auto"
          >
            <Download className="w-4 h-4" /> Export CSV ({filteredMembers.length})
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, mobile, email, or JDO ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === st
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Applicant / Member</th>
                <th className="p-4">Contact</th>
                <th className="p-4">KYC Document</th>
                <th className="p-4">Payment UTR (₹50)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => {
                  const isPending = m.status === "PENDING";
                  const isApproved = m.status === "APPROVED";
                  const isLoading = actionLoading === m.id;

                  return (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{m.fullName}</div>
                        <div className="text-[11px] font-mono text-emerald-800 font-bold">
                          {m.membershipId || "ID NOT GENERATED"}
                        </div>
                        <div className="text-[10px] text-slate-400">{m.branch}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-slate-800">{m.mobile}</div>
                        <div className="text-slate-400 text-[11px]">{m.email}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-slate-800">{m.idType}</div>
                        <div className="font-mono text-slate-500 text-[11px]">{m.idNumber}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-mono font-bold text-emerald-900">
                          {m.payments?.[0]?.upiRef || "No Ref"}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Status: {m.payments?.[0]?.status || "N/A"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            isApproved
                              ? "bg-emerald-100 text-emerald-800"
                              : m.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {m.status}
                        </span>
                        {m.rejectionReason && (
                          <div className="text-[10px] text-red-600 mt-1 max-w-[150px] truncate">
                            {m.rejectionReason}
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(m.id)}
                              disabled={isLoading}
                              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-[11px] flex items-center gap-1"
                            >
                              {isLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              <span>Approve</span>
                            </button>

                            <button
                              onClick={() => handleReject(m.id)}
                              disabled={isLoading}
                              className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold text-[11px]"
                            >
                              Reject
                            </button>
                          </div>
                        ) : isApproved ? (
                          <Link
                            href={`/verify/${m.membershipId}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                          >
                            <Eye className="w-3.5 h-3.5" /> Verify Card
                          </Link>
                        ) : (
                          <span className="text-[11px] text-slate-400">Rejected</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
