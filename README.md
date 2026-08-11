# Luxe Listings — Denver Dream House

Vacation rental listing site for 5236 Malta Street, Denver CO 80249.

**Live site:** [https://5236malta.com](https://5236malta.com)

---

## Quick Start

### Run both frontend and backend together

```bash
npm run dev
```

This starts:
- **Frontend** (Vite + React) on `http://localhost:3000`
- **Backend** (Express API) on `http://localhost:3001`

### Run individually

```bash
# Frontend only
cd client && npm run dev

# Backend only
cd server && npm run dev
```

---

## Installing from Scratch

If you received this project as a zip file or cloned it fresh, follow these steps:

### 1. Install all dependencies

```bash
# Root (concurrently — runs both servers with one command)
npm install

# Frontend
cd client && npm install

# Backend
cd server && npm install
```

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
```

Open `server/.env` and fill in:

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | MongoDB Atlas → Connect → Drivers → copy connection string |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys → Create API Key |
| `EMAIL_FROM` | Use `Luxe Listings <onboarding@resend.dev>` for sandbox, or your verified domain in prod |
| `EMAIL_TO` | Your email address — where contact form submissions are delivered |
| `ICAL_AIRBNB_7BR_URL` | Airbnb listing → Availability → Export Calendar |
| `ICAL_AIRBNB_6BR_URL` | Airbnb listing → Availability → Export Calendar |
| `ICAL_VRBO_7BR_URL` | Vrbo → Calendar → Import/Export → Export |
| `ICAL_VRBO_6BR_URL` | Vrbo → Calendar → Import/Export → Export |
| `ICAL_BOOKING_7BR_URL` | Booking.com → Property → Calendar → Sync → Export iCal |
| `ICAL_BOOKING_6BR_URL` | Booking.com → Property → Calendar → Sync → Export iCal |

### 3. Start the app

```bash
# From the project root
npm run dev
```

### 4. Verify everything is working

- Frontend: open `http://localhost:3000`
- Backend health check: open `http://localhost:3001/api/health` — should return `{"status":"ok","db":"connected",...}`
- Trigger a manual iCal sync: `curl -X POST http://localhost:3001/api/calendar/sync`

---

## Architecture Overview

### How the app is structured

```
listing/
├── .github/workflows/deploy.yml  # GitHub Actions CI/CD
├── client/                        # Vite + React frontend
│   ├── public/assets/             # Property images (served statically)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Navbar.jsx         # Sticky nav with mobile hamburger
│   │   │   ├── Hero.jsx           # Full-height hero with badges + CTAs
│   │   │   ├── Gallery.jsx        # Airbnb-style photo grid + lightbox modal
│   │   │   ├── PropertyDetails.jsx # Two-column layout + sticky booking card
│   │   │   ├── OtherListings.jsx  # 6br configuration with photo carousel
│   │   │   ├── Attractions.jsx    # Categorized nearby attractions
│   │   │   ├── Testimonials.jsx   # Auto-advancing review carousel
│   │   │   ├── VideoWalkthrough.jsx # TikTok embed
│   │   │   ├── ContactForm.jsx    # Inquiry form → POST /api/inquiries
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main listing page (composes all components)
│   │   │   ├── Booking.jsx        # Booking request form with DayPicker calendar
│   │   │   ├── Inquire.jsx        # Standalone inquiry form
│   │   │   └── Guidebook.jsx      # Neighborhood guide with categorized attractions
│   │   ├── lib/
│   │   │   └── api.js             # API base URL (dev proxy vs prod URL)
│   │   ├── App.jsx                # Router + ScrollToTop
│   │   └── index.css              # Tailwind + custom theme tokens
│   ├── index.html                 # Vite entry point with OG tags
│   └── vite.config.js             # Vite config with dev proxy to backend
├── server/                        # Express API backend
│   ├── src/
│   │   ├── models/
│   │   │   ├── Inquiry.js         # MongoDB schema for contact form submissions
│   │   │   ├── Booking.js         # MongoDB schema for booking requests
│   │   │   └── AvailabilityBlock.js # MongoDB schema for iCal blocked dates
│   │   ├── routes/
│   │   │   ├── inquiries.js       # POST /api/inquiries
│   │   │   ├── bookings.js        # POST /api/bookings
│   │   │   └── calendar.js        # GET /api/availability, GET /api/calendar/listing.ics
│   │   ├── middleware/
│   │   │   ├── validate.js        # Zod schema validation middleware
│   │   │   ├── rateLimiter.js     # express-rate-limit (10 req/15min per IP)
│   │   │   └── sanitize.js        # HTML stripping + MongoDB $ operator injection protection
│   │   ├── lib/
│   │   │   ├── email.js           # Resend transactional email (host + guest notifications)
│   │   │   ├── icalSync.js        # Fetches + parses 6 iCal feeds from Airbnb/Vrbo/Booking.com
│   │   │   └── icalExport.js      # Generates outbound .ics feed for direct bookings
│   │   └── jobs/
│   │       └── icalCron.js        # node-cron: syncs all iCal feeds hourly
│   ├── server.js                  # Express app entry point
│   ├── Dockerfile                 # Docker image for Fly.io deployment
│   ├── fly.toml                   # Fly.io app configuration
│   └── .env.example               # Environment variable template
└── package.json                   # Root scripts (concurrently)
```

---

## How Each Layer Works

### Frontend (Vercel)
- Built with **Vite + React 18**. Vite replaces Create React App — faster builds, no vulnerabilities.
- Styled with **Tailwind CSS v4** using custom `@theme` tokens for the forest green palette.
- **react-router-dom v6** handles client-side routing (`/`, `/booking`, `/inquire`, `/guidebook`).
- **react-day-picker v9** renders the availability calendar with blocked dates greyed out.
- **lucide-react** provides all icons.
- In development, Vite proxies `/api/*` requests to `localhost:3001` via `vite.config.js`.
- In production, `client/src/lib/api.js` reads `VITE_API_URL` env var and points directly to the Fly.io backend URL.
- Deployed to **Vercel** — auto-deploys on every push to `main`.

### Backend (Fly.io via Docker)
- **Express 4** API server running on Node.js.
- Packaged as a **Docker container** using `server/Dockerfile` (node:22-alpine base image).
- Deployed to **Fly.io** in the `dfw` (Dallas) region with 2 machines for zero-downtime deployments.
- `fly.toml` configures the app name, region, port, and machine specs (shared-cpu-1x, 256MB RAM).
- All secrets (API keys, DB URI, iCal URLs) are stored as **Fly.io secrets** — never in the Docker image or source code.
- Auto-deploys via **GitHub Actions** (`.github/workflows/deploy.yml`) on every push to `main`.

### Security layers
- **Cloudflare proxy** — all traffic to `5236malta.com` routes through Cloudflare's network. Provides DDoS protection, bot filtering, and basic WAF rules before requests reach Vercel. Free tier.
- **Helmet.js** — sets 11 secure HTTP headers on every response (XSS protection, clickjacking prevention, content-type sniffing, HSTS, etc.)
- **CORS** — locked to `https://5236malta.com` in production via `CLIENT_ORIGIN` env var.
- **express-rate-limit** — 10 form submissions per 15 minutes per IP.
- **Zod validation** — all POST body data validated server-side before hitting the DB.
- **sanitize.js middleware** — strips HTML tags/scripts from all string inputs; removes MongoDB `$` operator keys to prevent injection attacks.
- **Body size limit** — `express.json({ limit: '10kb' })` prevents large payload attacks.
- **Pre-commit hook** — `.git/hooks/pre-commit` blocks any commit containing a `.env` file.
- **HTTPS** — enforced by Vercel (frontend) and Fly.io (backend, `force_https = true` in fly.toml).

### Database (MongoDB Atlas)
- **Mongoose** ODM connects to MongoDB Atlas free tier (M0, 512MB).
- Three collections: `inquiries`, `bookings`, `availabilityblocks`.
- Network access set to `0.0.0.0/0` (any IP) — safe because MongoDB still requires username/password auth.

### Email (Resend)
- **Resend** sends two emails per form submission: a host notification (with reply-to set to the guest's email) and a guest confirmation.
- Email calls are non-fatal — if Resend fails, the DB write still succeeds and the API returns 200.
- Currently using sandbox (`onboarding@resend.dev`) — upgrade to verified domain when ready.

### Calendar sync (iCal)
- **node-ical** fetches and parses iCal feeds from Airbnb (2 listings), Vrbo (2 listings), and Booking.com (2 listings) — 6 feeds total.
- **node-cron** runs the sync hourly after DB connects.
- Blocked dates are stored in `AvailabilityBlock` collection with source tracking and UID-based deduplication (re-syncing never creates duplicates).
- **ical-generator** produces an outbound `.ics` feed at `GET /api/calendar/listing.ics` — paste this URL into Airbnb/Vrbo "Import calendar" to sync direct bookings back.
- HTTP→HTTPS redirect following built into `icalSync.js` (Vrbo uses `http://`).

### CI/CD
- **Vercel** — connected to GitHub, auto-deploys frontend on every push to `main`.
- **GitHub Actions** — `.github/workflows/deploy.yml` runs `flyctl deploy --remote-only` on every push to `main`, using `FLY_API_TOKEN` stored as a GitHub secret.

---

## Environment Variables

All secrets live in `server/.env`. Never commit this file.

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `EMAIL_FROM` | Sender address (use verified domain in prod) |
| `EMAIL_TO` | Host inbox for contact form notifications |
| `CLIENT_ORIGIN` | Frontend URL for CORS (`https://5236malta.com` in prod) |
| `PORT` | Backend port (default: `3001`) |
| `ICAL_AIRBNB_7BR_URL` | Airbnb 7br iCal export URL |
| `ICAL_AIRBNB_6BR_URL` | Airbnb 6br iCal export URL |
| `ICAL_VRBO_7BR_URL` | Vrbo 7br iCal export URL |
| `ICAL_VRBO_6BR_URL` | Vrbo 6br iCal export URL |
| `ICAL_BOOKING_7BR_URL` | Booking.com 7br iCal export URL |
| `ICAL_BOOKING_6BR_URL` | Booking.com 6br iCal export URL |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6, react-router-dom v6, Tailwind CSS v4 |
| UI components | lucide-react, react-day-picker v9, react-responsive-carousel |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas (Mongoose ODM) |
| Email | Resend |
| Calendar | node-ical (import), ical-generator (export), node-cron (scheduler) |
| Security | Helmet, express-rate-limit, Zod, sanitize-html, CORS |
| Deployment | Vercel (frontend), Fly.io via Docker (backend) |
| CI/CD | GitHub Actions |
| Domain | Cloudflare Registrar + DNS → Vercel |
| Dev tooling | concurrently, nodemon, ESLint |

---

## Deployment

| Service | URL |
|---|---|
| Live site | https://5236malta.com |
| Vercel (frontend) | https://listing-puce.vercel.app |
| Fly.io (backend) | https://luxe-listing-api.fly.dev |
| Health check | https://luxe-listing-api.fly.dev/api/health |
| Outbound iCal feed | https://luxe-listing-api.fly.dev/api/calendar/listing.ics |

---

## Changelog

### 2026-04-27 — Phase 5: Deployment, Domain, Security & Polish

- **Deployed to production** — Vercel (frontend) + Fly.io (backend via Docker)
- **Custom domain** — `5236malta.com` registered on Cloudflare, DNS pointed to Vercel, SSL auto-provisioned
- **GitHub Actions CI/CD** — auto-deploys backend to Fly.io on every push to `main`
- **Security hardening** — Helmet.js (11 secure HTTP headers), `sanitize-html` middleware (XSS + MongoDB injection protection)
- **Guidebook page** — `/guidebook` with 4 categorized sections: Restaurants & Cafes, Nature & Excursions, Uniquely Colorado Experiences, Logistics & Business
- **Attractions redesign** — categorized with emoji icons, new restaurants added (Pho 95, Beau Jo's, Copper Table, Annette, Garden + Grain), car rentals added
- **Mobile fixes** — hero badges no longer overflow on mobile, smaller text/padding on small screens, stats hidden on mobile, subheading updated
- **UI fixes** — balcony icon (🏡), sauna icon (♨️), pricing banner links to contact form, ScrollToTop on all route changes
- **OtherListings** — removed 1-bedroom suite, updated to 6br/3ba, added "not included" callout
- **Footer** — copyright year updated to 2026
- **API routing** — all axios calls use `API_BASE` from `client/src/lib/api.js` for prod/dev switching

### 2026-04-25 — Phase 3 & 4: Backend + Calendar

- See previous changelog entries below

### 2026-04-25 — Phase 3: Full Backend Integration

- **Resend** replaces Nodemailer — transactional email via API key, better deliverability, no Gmail sending limits
- **Mongoose models** — `Inquiry` and `Booking` schemas with validation, timestamps, status tracking, and IP logging
- **Zod validation** — all form submissions validated server-side before hitting the DB or sending email
- **Rate limiting** — `express-rate-limit`, 10 submissions per 15 min per IP on all form endpoints
- **Modular routes** — `POST /api/inquiries`, `POST /api/bookings`, `GET /api/health`
- **Dual emails** — every submission sends a host notification (reply-to set to guest email) and a guest confirmation
- **Non-fatal email errors** — DB write always succeeds and returns 200 even if email fails; errors logged server-side
- **Server modularized** — `src/models/`, `src/routes/`, `src/middleware/`, `src/lib/`

### 2026-04-25 — Phase 4: Calendar Integration

- **6 iCal feeds synced** — Airbnb 7br + 6br, Vrbo 7br + 6br, Booking.com 7br + 6br
- **`AvailabilityBlock` model** — stores blocked date ranges with source tracking and UID-based deduplication
- **Hourly cron** — `node-cron` syncs all feeds automatically after DB connects; also runs on startup
- **HTTP→HTTPS redirect follow** — Vrbo feeds use `http://`, redirect resolver ensures they sync correctly
- **`GET /api/availability`** — returns merged blocked ranges from iCal imports + direct bookings for a date window
- **`GET /api/calendar/listing.ics`** — outbound iCal feed; paste URL into Airbnb/Vrbo "Import calendar" to sync direct bookings back
- **`POST /api/calendar/sync`** — manual sync trigger for testing
- **`react-day-picker` v9** — replaced native date inputs with a full calendar picker showing blocked dates greyed out with strikethrough
- **Booking card (home page)** — click check-in/check-out to open inline calendar with live availability; auto-closes on range selection; passes dates to `/booking` via URL params
- **`excludeDisabled`** — range selection resets if user tries to span a blocked date

### 2026-04-25 — Phase 1 & 2: Foundation + UI

- **CRA → Vite**: Replaced Create React App with Vite 6. Build time dropped from ~30s to <1s. Vulnerability count dropped from 28 to 0.
- **Router wired up**: Connected `react-router-dom`. `/` → Home, `/inquire` → Inquire. Eliminated duplicate static HTML pages.
- **Server fixed**: Resolved broken `server.js` — added missing `body-parser` and `nodemailer` imports. Aligned server port to `3001`.
- **API proxy**: Frontend now routes `/api/*` through Vite's dev proxy to the backend.
- **Credentials secured**: Removed hardcoded email credentials. All secrets moved to `server/.env`. Added `.env.example` template. Added root-level `.gitignore`.
- **Airbnb-style UI**: Tailwind CSS + component architecture, photo gallery modal, sticky booking card, trust badges, testimonials carousel
- **0 vulnerabilities**: All three package scopes (root, client, server) audited clean.

---

## Roadmap

- **Phase 5 — Polish & Deploy** (in progress):
  - Deployment — Vercel + Fly.io + custom domain ✅ (`https://5236malta.com`)
  - GitHub Actions auto-deploy ✅
  - Security hardening (Helmet + sanitization) ✅
  - Cloudflare proxy enabled ✅ (DDoS protection + WAF on both CNAME records)
  - Guidebook page ✅
  - Attractions redesign with categories + emoji icons ✅
  - Mobile/UI fixes ✅ (7/8 complete — Peerspace copy tabled)
  - SEO — `LodgingBusiness` schema.org structured data, sitemap.xml
  - Analytics — Plausible or Umami
  - Cloudinary image CDN
  - Sentry error tracking
  - Cloudflare Turnstile CAPTCHA
  - Extended security: MongoDB `$` operator hardening

- **Phase 6 — Payments, Monitoring & Advanced Features:**
  - **Stripe payment integration** — Stripe Checkout for deposit or full payment at booking. Supports partial refunds, security deposits, and tax collection. 2.9% + $0.30 per transaction. Use hosted Checkout page to minimize PCI scope.
  - **MongoDB Atlas alerts** — configure storage (alert at 400MB), connection count, and slow query alerts via Atlas dashboard → Alerts tab
  - **UptimeRobot** — free tier monitors `https://luxe-listing-api.fly.dev/api/health` and `https://5236malta.com` every 5 minutes, emails on downtime
  - **Admin dashboard** — view/manage inquiries and bookings without needing MongoDB Atlas UI
  - **Peerspace / hourly booking** — add callout section for photoshoots and filming, link to Peerspace listing, add "Creative & Commercial Use" inquiry type
  - **Commercial page improvements (next iteration):**
    - Remove 6,000 sqft spec — replace with indoor/outdoor spaces highlight
    - Add: storage for equipment, ample room for production equipment
    - Change "All day natural light" → "Tons of natural light"
    - Add specs: tons of outlets, flexible for custom configurations, okay with artwork changes and environment mods, can easily host staff up to 20+
    - Different hero background image — use pond/backyard/golf course shot (will be provided)
    - Evaluate carousel layout for the video grid vs. current card grid
    - Build a separate commercial-specific inquiry form optimized for production (crew size, shoot date, equipment needs, release required, power requirements, etc.) instead of reusing the general contact form
