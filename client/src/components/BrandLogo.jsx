/**
 * Animated brand mark: SVG emblem (clay roofline + chimney over a teal
 * lake line, on a forest-green tile — same scene language as the favicon)
 * + "A&M Luxe Listings" in calligraphic lettering with a staggered,
 * semi-futuristic blink-in.
 *
 * Lettering: Dancing Script (Google Fonts) — calligraphy that holds up at
 * navbar size. The wordmark animates in whole-word segments, not characters,
 * so the script's ligatures and kerning stay intact.
 *
 * @param {boolean} dark  true when the navbar is in its solid/white state
 */
export default function BrandLogo({ dark }) {
  const segments = [
    {
      text: 'A&M',
      className: `text-[1.7rem] font-bold ${dark ? 'text-orange-700' : 'text-orange-400'}`,
    },
    { text: 'Luxe', className: 'text-[1.4rem] font-semibold' },
    { text: 'Listings', className: 'text-[1.4rem] font-semibold' },
  ]

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Emblem — clay roofline + chimney, teal lake beneath */}
      <svg
        viewBox="0 0 36 36"
        width="32"
        height="32"
        className="brand-mark flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e07a3e" />
            <stop offset="1" stopColor="#c1502e" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="34" height="34" rx="9" fill="#123524" />
        <rect x="1" y="1" width="34" height="34" rx="9" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        {/* Roofline — draws in */}
        <path
          className="brand-mark-path"
          d="M8 21.5 L18 11 L28 21.5"
          fill="none"
          stroke="url(#brandGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chimney */}
        <path
          className="brand-mark-detail"
          d="M23.5 12.5 V 17"
          stroke="url(#brandGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Lake line — teal accent */}
        <path
          className="brand-mark-detail"
          d="M9.5 26.5 H 26.5"
          stroke="#80cbc4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4.5 3.5"
        />
        {/* Accent star */}
        <circle className="brand-dot" cx="27.5" cy="8.5" r="1.8" fill="#80cbc4" />
      </svg>

      {/* Wordmark — calligraphy, letters blink in individually and stack up */}
      <span
        aria-label="A&M Luxe Listings"
        role="text"
        className="inline-flex items-baseline gap-[0.45rem] leading-none"
        style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
      >
        {(() => {
          let charIndex = 0
          return segments.map((seg) => (
            <span key={seg.text} aria-hidden="true" className={`whitespace-nowrap ${seg.className}`}>
              {seg.text.split('').map((ch, i) => {
                const delay = 0.35 + charIndex++ * 0.045
                return (
                  <span
                    key={i}
                    className="brand-char"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {ch}
                  </span>
                )
              })}
            </span>
          ))
        })()}
      </span>
    </span>
  )
}
