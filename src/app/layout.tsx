import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jivan Dhara Organisation | Regd. NGO & Sewa Trust Kolkata",
    template: "%s | Jivan Dhara Organisation",
  },
  description:
    "Official website of Jivan Dhara Organisation (JDO). Established in 2008 in Kolkata, West Bengal, working dedicatedly for education, PMGDISHA digital literacy, free health checkups, women empowerment, child welfare, and rural agriculture.",
  keywords: [
    "Jivan Dhara Organisation",
    "JDO NGO Kolkata",
    "NGO in West Bengal",
    "Social Welfare Kolkata",
    "PMGDISHA Digital Saksharta",
    "Free Health Checkup Camp",
    "NGO Membership ₹50",
    "Donate to NGO Kolkata",
    "Child Education Support",
  ],
  authors: [{ name: "Jivan Dhara Organisation" }],
  openGraph: {
    title: "Jivan Dhara Organisation | Serving Humanity",
    description:
      "A grassroots sewa trust founded in 2008 in Kolkata, transforming lives through education, healthcare, women empowerment, and community development.",
    url: "https://jdongo.netlify.app",
    siteName: "Jivan Dhara Organisation",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
