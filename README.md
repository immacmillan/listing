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


- **Phase 2** — UI modernization: Tailwind CSS + shadcn/ui, Airbnb-style layout, light theme with forest green accents, photo gallery modal, sticky booking card ✅
- **Phase 3** — Full backend: Mongoose models (Listing, Inquiry, Booking), Resend email integration, input validation, admin view ✅
- **Phase 4** — Calendar: iCal import from Airbnb/Vrbo, availability endpoint, outbound iCal export for direct booking sync ✅
- **Phase 5** — Polish & Deploy:
 - Deployment — Vercel (frontend) + Fly.io (backend), custom domain DNS ✅
 - SEO — `LodgingBusiness` schema.org structured data, sitemap.xml
 - Getting Around section redesign — bucket into Restaurants & Cafes, Nature & Excursions, and Logistics & Business; add better visual indicators ✅
 - Analytics — Plausible or Umami (privacy-friendly, no cookie banner)
 - Cloudinary image CDN — automatic WebP conversion and responsive sizing
 - Sentry error tracking — frontend + server
 - Fly.io auto-deploy via GitHub Actions
 - README changelog update


- **Phase 5 — Mobile & UI Backlog:**


 1. **Hero badges overlapping on mobile** — Strategy: wrap badges in a `flex-col` on mobile (`flex-col sm:flex-row`), or limit to 1-2 badges on small screens using `hidden sm:inline-flex` on the less critical ones. Keep location + one platform badge visible on mobile.


 2. **Platform trust badges not equal width** — Strategy: replace `inline-flex` with a fixed-width grid (`grid grid-cols-3`) or add `min-w-fit` and `justify-center` so all three pills stretch to the same width.


 3. **Flexible Pricing banner — "Inquire for rates" should link to #contact-us** — Strategy: wrap the text in an `<a href="#contact-us">` anchor with forest green underline styling. Simple one-line change in `PropertyDetails.jsx`.


 4. **Balcony icon is a beach umbrella** — Strategy: replace `fa-umbrella-beach` / current emoji with a more appropriate icon. Lucide has `DoorOpen` or use 🏠 emoji with a balcony context label. Alternatively use `🪟` (window) as the closest available emoji.


 5. **UV Cedar Sauna icon is a person** — Strategy: replace with `🧖` (person in steam room) is actually reasonable, but `♨️` (hot springs/steam) is more universally understood as sauna. Update in both `PropertyDetails.jsx` amenities list and `Guidebook.jsx`.


 6. **Guidebook link doesn't scroll to top** — Strategy: add `useEffect` in `Guidebook.jsx` that calls `window.scrollTo(0, 0)` on mount. React Router doesn't reset scroll position between route changes by default — a `ScrollToTop` component added to `App.jsx` fixes this globally for all pages.


 7. **Car rentals under Logistics & Business** — Strategy: add Hertz, Avis, Budget, Enterprise, National to the attractions list in both `Attractions.jsx` and `Guidebook.jsx` with 🚗 emoji and `~10 min drive` detail.


 8. **Peerspace / hourly booking for photoshoots & filming** — Strategy: add a dedicated section or callout on the home page (between the TikTok video and contact form) highlighting the property's availability for hourly creative bookings. Link to the Peerspace listing. Add a "Creative & Commercial Use" option to the inquiry type dropdown. Table for now.


 9. **Extended security hardening** — Current posture: Zod validation, rate limiting, CORS, HTTPS enforced. Gaps to address:
    - **Helmet.js** — secure HTTP headers (XSS, clickjacking, content sniffing). One line: `app.use(helmet())`. High value, low effort.
    - **DDoS protection** — handled automatically by Cloudflare once domain is routed through it (free tier). No code changes needed.
    - **Input sanitization** — strip HTML/script tags from form fields before DB writes. Add `sanitize-html` on server, `DOMPurify` on client for any rendered user content.
    - **Cloudflare Turnstile** — free CAPTCHA alternative for contact/booking forms. Prevents automated spam submissions without the UX friction of reCAPTCHA.
    - **MongoDB operator injection** — add explicit `$` key stripping middleware as a defense-in-depth measure alongside Mongoose's built-in protections.
    - **Sentry** — runtime error tracking and anomaly detection (already in backlog).
