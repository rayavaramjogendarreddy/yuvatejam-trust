# Yuvatejam Trust - WordPress to Next.js Modern Web Application

A modern, high-performance, standalone web application for **YUVATEJAM TRUST** (Educational & Social Service Trust, Regd. No. 124/2012). Rebuilt from an existing WordPress site into a production-ready Next.js App Router application optimized for direct Vercel deployment.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment Platform**: [Vercel](https://vercel.com/)

---

## ⚡ Installation & Setup

### Prerequisites
- Node.js 18.17 or later
- npm or pnpm / yarn / bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

### 3. Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Production Build & Testing

Validate TypeScript types, linting, and generate static export / server assets:

```bash
npm run lint
npm run build
```

To test the production build locally:
```bash
npm run start
```

---

## 🌐 Vercel Deployment

Deploy directly from GitHub to Vercel:

1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the GitHub repository.
4. Framework Preset: **Next.js**.
5. Click **Deploy**.

---

## 🗺 Migrated Routes Inventory (37 Public Routes)

| Route Path | Page Title | Content Type | Status |
|---|---|---|---|
| `/` | Home | Main Landing | Migrated |
| `/about-us/` | About Us | Organization Overview | Migrated |
| `/vision/` | Vision | Core Values | Migrated |
| `/mission/` | Mission | Strategic Goals | Migrated |
| `/about-founder/` | About Founder | Leadership Profile | Migrated |
| `/executive-body-members/` | Executive Body | Governance | Migrated |
| `/our-team/` | Our Team | Team Roster | Migrated |
| `/organization-profile/` | Organization Profile | Trust Details | Migrated |
| `/contact-us/` | Contact Us | Form & Contact | Migrated |
| `/donate-now/` | Donate Now | Support / Donation | Migrated |
| `/donation/` | Donation Info | Financial Giving | Migrated |
| `/overview/` | Our Work Overview | Program Portfolio | Migrated |
| `/education/` | Education | Program Area | Migrated |
| `/health/` | Health | Program Area | Migrated |
| `/livelihood/` | Livelihood | Program Area | Migrated |
| `/women-empowerment/` | Women Empowerment | Program Area | Migrated |
| `/disaster-response/` | Disaster Response | Emergency Relief | Migrated |
| `/privileged-children/` | Privileged Children | Child Support | Migrated |
| `/education-program/` | Education Program | Project Detail | Migrated |
| `/food-distribution/` | Food Distribution | Project Detail | Migrated |
| `/independent-days/` | Independence Days | Event Project | Migrated |
| `/individual-support/` | Individual Support | Get Involved | Migrated |
| `/corporate-partnerships/` | Corporate Partnerships | CSR Alliances | Migrated |
| `/institutional-alliances/` | Institutional Alliances | Partnering | Migrated |
| `/schools/` | Schools & Colleges | Student Outreach | Migrated |
| `/volunteers/` | Volunteers | Form & Info | Migrated |
| `/careers/` | Careers | Opportunities | Migrated |
| `/happenings/` | Happenings & News | Media Centre | Migrated |
| `/press-releases/` | Press Releases | Media Releases | Migrated |
| `/works-gallery/` | Print/Online Media | Press Coverage | Migrated |
| `/media-gallery/` | Media Gallery | Photo Album | Migrated |
| `/work-gallery/` | Work Gallery | Photo Album | Migrated |
| `/annual-report/` | Annual Report | Publications | Migrated |
| `/newsletter/` | Newsletter | Publications | Migrated |
| `/stories-of-change/` | Stories of Change | Impact Stories | Migrated |
| `/faqs/` | FAQs | Questions & Answers | Migrated |

---

## 📦 What Was Migrated from WordPress

1. **Content**: All 37 public pages, team bios, program descriptions, and event records were parsed from MySQL dump and converted into strongly-typed TypeScript objects.
2. **Forms**: Replaced legacy Everest Forms with modern Next.js Server Actions & API Route Handlers (`/api/contact`, `/api/volunteer`).
3. **SEO**: Extracted All in One SEO page titles, meta descriptions, and canonical structures into Next.js Metadata API.
4. **Media**: 125+ active media images, logos, and banners were migrated from `wp-content/uploads/` to `/public/images/`.
5. **Styling**: Replaced heavy Elementor / Astra CSS with clean, responsive Tailwind CSS components.

---

## 🔒 Security & Performance Features

- **No Database Needed**: Static Page Generation (SSG) ensures zero SQL injection or database vulnerability risks.
- **Server Input Validation**: Form routes validate inputs on the server before processing.
- **Optimized Assets**: Next.js image optimization with automatic WebP conversion and responsive sizes.

---

## 📄 License & Attribution

Developed for **YUVATEJAM EDUCATIONAL & SOCIAL SERVICE TRUST** (Regd. No. 124/2012).
