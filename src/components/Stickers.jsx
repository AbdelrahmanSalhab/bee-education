// Hand-drawn-style SVG stickers: each has a cream "sticker edge" behind the ink outline.

const inkStroke = { stroke: 'var(--color-ink)', strokeLinejoin: 'round', strokeLinecap: 'round' }

export function DieSticker({ className, pipColor = 'var(--color-ink)' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="var(--color-card)" {...inkStroke} strokeWidth="8" />
      <rect x="6" y="6" width="52" height="52" rx="12" fill="var(--color-card)" {...inkStroke} strokeWidth="3.5" />
      <circle cx="20" cy="20" r="5" fill={pipColor} />
      <circle cx="44" cy="20" r="5" fill={pipColor} />
      <circle cx="32" cy="32" r="5" fill={pipColor} />
      <circle cx="20" cy="44" r="5" fill={pipColor} />
      <circle cx="44" cy="44" r="5" fill={pipColor} />
    </svg>
  )
}

export function MeepleSticker({ className, color = 'var(--color-meeple-red)' }) {
  const body =
    'M32 5c-6 0-10.5 4.7-10.5 10.5 0 2.6.9 4.8 2.1 6.6-6 2.8-13.3 7.5-18 13.2-2.2 2.7-.3 7.2 3.4 7.2h9.8c-3 4.8-7.3 10.4-10.2 15.9-1.6 3 .5 6.6 4 6.6h13.2c2.4 0 4.4-1.5 5.2-3.6l1-2.6 1 2.6c.8 2.1 2.8 3.6 5.2 3.6h13.2c3.5 0 5.6-3.6 4-6.6-2.9-5.5-7.2-11.1-10.2-15.9h9.8c3.7 0 5.6-4.5 3.4-7.2-4.7-5.7-12-10.4-18-13.2 1.2-1.8 2.1-4 2.1-6.6C42.5 9.7 38 5 32 5z'
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d={body} fill={color} {...inkStroke} strokeWidth="8" stroke="var(--color-card)" />
      <path d={body} fill={color} {...inkStroke} strokeWidth="3.5" />
    </svg>
  )
}

export function TrophySticker({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g {...inkStroke} strokeWidth="8" stroke="var(--color-card)" fill="var(--color-honey)">
        <path d="M20 8h24v14c0 8-5 14-12 14s-12-6-12-14V8z" />
        <path d="M20 12H10c0 9 4 14 10 15M44 12h10c0 9-4 14-10 15" fill="none" />
        <path d="M28 36h8v8h-8zM20 44h24v10H20z" />
      </g>
      <g {...inkStroke} strokeWidth="3.5" fill="var(--color-honey)">
        <path d="M20 12H10c0 9 4 14 10 15M44 12h10c0 9-4 14-10 15" fill="none" />
        <path d="M20 8h24v14c0 8-5 14-12 14s-12-6-12-14V8z" />
        <path d="M28 36h8v8h-8z" />
        <path d="M20 44h24v10H20z" />
      </g>
      <path d="M32 14l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L32 14z" fill="var(--color-ink)" />
    </svg>
  )
}

export function BeeHexSticker({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon
        points="32,4 56,18 56,46 32,60 8,46 8,18"
        fill="var(--color-honey)"
        {...inkStroke}
        strokeWidth="8"
        stroke="var(--color-card)"
      />
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="var(--color-honey)" {...inkStroke} strokeWidth="3.5" />
      <circle cx="24" cy="27" r="4" fill="var(--color-ink)" />
      <circle cx="40" cy="27" r="4" fill="var(--color-ink)" />
      <path d="M24 40c2.5 3 13.5 3 16 0" fill="none" {...inkStroke} strokeWidth="3.5" />
    </svg>
  )
}

export function CardsSticker({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g transform="rotate(-10 24 34)">
        <rect x="10" y="14" width="28" height="40" rx="5" fill="var(--color-card)" {...inkStroke} strokeWidth="8" stroke="var(--color-card)" />
        <rect x="10" y="14" width="28" height="40" rx="5" fill="var(--color-card)" {...inkStroke} strokeWidth="3.5" />
      </g>
      <g transform="rotate(8 42 32)">
        <rect x="28" y="10" width="28" height="40" rx="5" fill="var(--color-meeple-teal)" {...inkStroke} strokeWidth="8" stroke="var(--color-card)" />
        <rect x="28" y="10" width="28" height="40" rx="5" fill="var(--color-meeple-teal)" {...inkStroke} strokeWidth="3.5" />
        <polygon points="42,20 49,24 49,33 42,37 35,33 35,24" fill="var(--color-honey)" {...inkStroke} strokeWidth="2.5" />
      </g>
    </svg>
  )
}

export const stickerByName = {
  die: DieSticker,
  meeple: MeepleSticker,
  trophy: TrophySticker,
  bee: BeeHexSticker,
  cards: CardsSticker,
}
