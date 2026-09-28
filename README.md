<p align="center">
  <img src="public/logo.png" width="130" height="130" alt="Jivan Dhara Organisation Logo" style="border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</p>

<h1 align="center">Jivan Dhara Organisation (JDO)</h1>

<p align="center">
  <strong>Empowering Communities • Inspiring Hope • Transforming Lives Since 2008</strong><br>
  <em>Official full-stack digital web portal and automated membership management platform for Jivan Dhara Organisation (Kolkata, West Bengal).</em>
</p>

<p align="center">
  <a href="#-key-features"><img src="https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?logo=next.js" alt="Next.js" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Prisma-ORM%206-2d3748?logo=prisma" alt="Prisma" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Status-Production%20Ready-emerald" alt="Status" /></a>
</p>

---

## 📌 GitHub Repository Description

> **Short Description (for GitHub About section):**  
> `Official full-stack web platform for Jivan Dhara Organisation (Est. 2008, Kolkata). Features ₹50 online membership with UPI QR payment verification, automated scannable NGO ID card generation, 80G-ready donation receipt engine, live daily field logs, notices, events, and a comprehensive Admin CMS.`

> **Recommended GitHub Topics / Tags:**  
> `ngo-website` `nextjs16` `react` `typescript` `prisma` `tailwind-css` `id-card-generator` `qr-code-verification` `donation-platform` `social-welfare` `kolkata-ngo` `pwa` `jwt-authentication`

---

## 🌟 Key Modules & Features

### 🏛️ 1. Modern Multi-Page Public Portal
- **Hero & Live Impact Metrics**: Real-time counter of total members, trees planted, digital literacy trainees (PMGDISHA), free health camp beneficiaries, and relief drives.
- **Founding History & Governance (`/about`)**: Grounded in genuine founding records (Est. 2008 in Kolkata), democratically elected 9-member Governing Committee, vision, and mission.
- **Key Social Initiatives (`/activities`)**:
  - 💻 **PMGDISHA & Digital Literacy**: Empowering rural and semi-urban students with practical computing.
  - 🩺 **Free Medical Camps & Health Checkups**: Periodic general and RCH checkups with free essential medicines.
  - 📚 **Child Welfare & Education Drives**: School bag, book, and uniform distributions across underserved pockets.
  - 🌾 **Agriculture & Environment**: Sustainable farming workshops and mass tree plantation drives.
  - 🧵 **Women Empowerment & Self-Help Groups**: Vocational training in tailoring and handicrafts.
- **Live Daily Field Logs (`/daily-status`)**: Real-time timeline of field activities with photos, volunteer headcounts, and beneficiary statistics.
- **Notice Board (`/notices`)**: Categorized circulars and urgent community announcements.
- **Events Calendar & RSVP (`/events`)**: Community events with one-click attendee RSVP and instant unique pass codes.
- **Photo & Video Gallery (`/gallery`)**: Filterable photo lightbox gallery with zoom capabilities.
- **Public Reviews & Testimonials (`/reviews`)**: Transparent community feedback with admin moderation.
- **Direct Help Desk (`/contact`)**: Headquarters address, phone, WhatsApp float, contact messaging, and volunteer applications.

---

### 💳 2. ₹50 Online Membership & Automated ID Card Generation
- **3-Step Application Flow (`/membership`)**:
  1. Personal & KYC Details (Full Name, Guardian, DOB, Blood Group, Aadhaar/Voter ID, Address).
  2. Branch selection (Kolkata Central, North 24 Parganas, South 24 Parganas, Howrah, Hooghly), occupation, and declaration.
  3. UPI QR Code scan (₹50 fee) with UTR/Transaction Reference submission.
- **Admin Verification Workflow (`/admin/members`)**:
  - The Governing Committee inspects member details and UPI transaction references.
  - One-click **Approve** generates an official membership serial: `JDO-2026-XXXXXX` (with a 5-year validity).
- **Official Bilingual NGO ID Card (`/dashboard/id-card`)**:
  - **Front Card**: Member photo, unique JDO ID, blood group, branch, joining & validity dates, and official watermark seal.
  - **Back Card**: Headquarters address, emergency contact, secretary signatures, and **Dynamic QR Code**.
  - **Print & Download Ready**: High-resolution print styling and front/back toggle.
- **Public QR Verification (`/verify/[membershipId]`)**:
  - Anyone scanning the physical or digital ID card with a phone camera is routed to the authenticated verification portal.
  - Strict privacy protection: KYC ID numbers, full address, and private phone numbers are protected from public exposure.

---

### 💖 3. Transparent Donation Engine & Instant Receipts (`/donate`)
- Preset & custom donation tiers (₹100, ₹250, ₹500, ₹1,000, ₹2,500, Custom).
- Direct UPI payment integration with instant QR generation.
- Automated generation of downloadable & printable **Official Donation Receipts** (`JDO-REC-YYYY-XXXXX`).

---

### 🛡️ 4. Member Dashboard (`/dashboard`)
- **Overview**: Live status tracking of membership approval and fee receipt.
- **My ID Card**: Interactive ID card preview with print button and QR verification share link.
- **Donation History**: Complete log of all contributions with downloadable receipts.
- **Notifications**: Instant alerts for application status updates, general body meetings, and event circulars.
- **Profile Settings**: View and update profile details.

---

### ⚙️ 5. Super Admin Control Center (`/admin`)
- **Dashboard Analytics**: Real-time KPI counters (Total Members, Pending Approvals, Total Donations, Field Logs).
- **Member Management (`/admin/members`)**: Filter by status, search, approve with auto-ID assignment, reject with remarks, and export full member CSV.
- **Donations Management (`/admin/donations`)**: Financial tracking, donor search, and export CSV.
- **Events CMS (`/admin/events`)**: Create, publish, update, and manage community camps and RSVPs.
- **Notices CMS (`/admin/notices`)**: Issue priority announcements (`URGENT`, `IMPORTANT`, `NORMAL`).
- **Daily Field Status (`/admin/daily-status`)**: Post real-time work logs with photos and beneficiary counts.
- **Gallery Manager (`/admin/gallery`)**: Upload and categorize media items.
- **Review Moderation (`/admin/reviews`)**: Approve or reject public feedback.
- **Inquiry Desk (`/admin/messages`)**: View contact inquiries and volunteer applications.
- **CMS Settings (`/admin/settings`)**: Update NGO contact info, helpline, UPI ID, UPI number, membership fee, and vision/mission statements without touching code.

---

## 🏗️ Architecture & Tech Stack

```
Jivan Dhara Organisation
├── Frontend: Next.js 16 (Turbopack, App Router, React 19)
├── Styling: Tailwind CSS v4, Lucide Icons
├── Database: Prisma ORM (SQLite for local dev / PostgreSQL for production)
├── Security: HTTP-only secure cookies, JWT (jose), bcryptjs
├── QR Generator: node-qrcode
└── Assets & Branding: Authentic JDO Brand Identity & Logo
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher (LTS recommended)
- **npm** / **yarn** / **pnpm**

### 2. Installation & Environment Setup
```bash
# Clone the repository
git clone https://github.com/your-username/jivan-dhara-organisation.git
cd jivan-dhara-organisation

# Install dependencies
npm install
```

Create a `.env` file in the root directory:
```env
# Database Configuration (SQLite for local dev, PostgreSQL for production)
DATABASE_URL="file:./dev.db"

# JWT Secret for Session Cookies
AUTH_SECRET="jivan-dhara-ngo-super-secret-jwt-key-2026-kolkata"

# Base Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Initial Super Admin Seed Credentials
ADMIN_EMAIL="admin@jivandhara.org"
ADMIN_PASSWORD="Admin@JDO2026#Secure"

# Organization Payment Details
NEXT_PUBLIC_UPI_ID="jivandhara@upi"
NEXT_PUBLIC_UPI_NUMBER="9211420420"
NEXT_PUBLIC_MEMBERSHIP_FEE="50"
```

### 3. Database Initialization & Seeding
```bash
# Push Prisma schema to SQLite dev.db
npx prisma db push

# Seed authentic organization data, admin account, and demo records
npm run db:seed
```

### 4. Running the Application
```bash
# Start Turbopack Development Server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Accounts for Testing

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@jivandhara.org` | `Admin@JDO2026#Secure` | Full Admin CMS (`/admin`) |
| **Active Member** | `rahul.roy@example.com` | `Member@123` | Member Dashboard & ID Card (`/dashboard`) |
| **Active Member** | `sunita.das@example.com` | `Member@123` | Member Dashboard & ID Card (`/dashboard`) |

---

## 🏛️ Authentic Organization Details
- **Registered Name**: Jivan Dhara Organisation
- **Year of Establishment**: 2008
- **Headquarters**: 12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037
- **Helpline Phone**: +91 9211420420
- **Official Email**: kumarpradip0303@gmail.com / admin@jivandhara.org
- **Democratic Structure**: 9-Member Governing Committee
