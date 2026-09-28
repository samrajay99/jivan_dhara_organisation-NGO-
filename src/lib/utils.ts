import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateMembershipId(sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(6, "0");
  return `JDO-${year}-${padded}`;
}

export function generateReceiptNumber(sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(5, "0");
  return `JDO-REC-${year}-${padded}`;
}

export function generateRegistrationNumber(prefix = "EVT"): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
}
