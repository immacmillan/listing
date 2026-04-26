# Luxe Listings — Denver Dream House

Vacation rental listing site for 5236 Malta Street, Denver CO 80249.

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

## Setup

### 1. Install dependencies

```bash
# Root (concurrently)
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

Then fill in the values in `server/.env`. See the [Environment Variables](#environment-variables) section below.

### 3. Start the app

```bash
npm run dev
```

---

## Environment Variables

All secrets live in `server/.env`. Never commit this file.

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail App Password (not your login password) |
| `EMAIL_TO` | Address that receives contact form submissions |
| `CLIENT_ORIGIN` | Frontend URL for CORS (default: `http://localhost:3000`) |
| `PORT` | Backend port (default: `3001`) |

See `server/.env.example` for the full template.

---

## Project Structure

```
listing/
├── client/               # Vite + React 18 frontend
│   ├── public/assets/    # Property images (20 photos)
│   ├── src/
│   │   ├── pages/        # Home.jsx, Inquire.jsx
│   │   ├── App.jsx       # Router root
│   │   ├── App.css       # Component styles
│   │   └── style-guide.css  # Global design tokens
│   ├── index.html        # Vite HTML entry
│   └── vite.config.js    # Vite config with API proxy
├── server/               # Express API
│   ├── server.js         # Main server (email, MongoDB)
│   ├── .env              # Secrets (gitignored)
│   └── .env.example      # Template — safe to commit
├── package.json          # Root scripts (concurrently)
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6, react-router-dom v6 |
| Styling | CSS (style-guide.css + App.css), FontAwesome, Google Fonts |
| Carousel | react-responsive-carousel |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas via Mongoose |
| Email | Nodemailer (Gmail SMTP) → Resend planned for Phase 3 |
| Dev tooling | concurrently, nodemon, ESLint |

---

## Changelog

### 2026-04-25 — Phase 3: Full Backend Integration

- **Resend** replaces Nodemailer — transactional email via API key, better deliverability, no Gmail sending limits
- **Mongoose models** — `Inquiry` and `Booking` schemas with validation, timestamps, status tracking, and IP logging
- **Zod validation** — all form submissions validated server-side before hitting the DB or sending email
- **Rate limiting** — `express-rate-limit`, 10 submissions per 15 min per IP on all form endpoints
- **Modular routes** — `POST /api/inquiries`, `POST /api/bookings`, `GET /api/health`
- **Dual emails** — every submission sends a host notification (reply-to set to guest email) and a guest confirmation
- **`/booking` page** — full booking form wired to the new API
- **Booking card** — sticky card on listing page links to `/booking` with pre-filled dates
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

- **CRA → Vite**: Replaced Create React App with Vite 6. Build time dropped from ~30s to <1s. Vulnerability count dropped from 28 to 0.
- **Router wired up**: Connected `react-router-dom`. `/` → Home, `/inquire` → Inquire. Eliminated duplicate static HTML pages (`booking.html`, `inquire.html`) in favor of React routes.
- **Server fixed**: Resolved broken `server.js` — added missing `body-parser` and `nodemailer` imports that were causing a crash on startup. Aligned server port to `3001`.
- **API proxy**: Frontend now routes `/api/*` through Vite's dev proxy to the backend. Removed hardcoded `http://localhost:3001` URLs from all components.
- **Credentials secured**: Removed hardcoded email credentials from source. All secrets moved to `server/.env`. Added `.env.example` template. Added root-level `.gitignore`.
- **CORS locked**: Backend CORS restricted to frontend origin via env var.
- **MongoDB**: Connection made non-blocking — server starts cleanly even without a DB connection.
- **Form UX**: Replaced `alert()` popups with inline success/error state messages.
- **0 vulnerabilities**: All three package scopes (root, client, server) audited clean.

---

## Roadmap

- **Phase 2** — UI modernization: Tailwind CSS + shadcn/ui, Airbnb-style layout, light theme with forest green accents, photo gallery modal, sticky booking card
- **Phase 3** — Full backend: Mongoose models (Listing, Inquiry, Booking), Resend email integration, input validation, admin view
- **Phase 4** — Calendar: iCal import from Airbnb/Vrbo, availability endpoint, outbound iCal export for direct booking sync
- **Phase 5** — Polish: Mapbox map, Cloudinary image CDN, SEO/OG tags, analytics, Sentry error tracking
