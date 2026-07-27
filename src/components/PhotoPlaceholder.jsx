import { useId } from 'react'
import { DieSticker, MeepleSticker, CardsSticker, BeeHexSticker, TrophySticker } from './Stickers'

const placeholderStickers = [DieSticker, MeepleSticker, CardsSticker, TrophySticker, BeeHexSticker, MeepleSticker]
const meepleColors = ['var(--color-meeple-red)', 'var(--color-meeple-teal)', 'var(--color-meeple-blue)']

// Honeycomb-patterned placeholder until a real photo src is provided.
export default function PhotoPlaceholder({ index, className = 'aspect-[4/3]' }) {
  const patternId = useId()
  const Sticker = placeholderStickers[index % placeholderStickers.length]
  const extra = Sticker === MeepleSticker ? { color: meepleColors[index % meepleColors.length] } : {}
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-honey/25 ${className}`}>
      <svg className="absolute inset-0 h-full w-full text-ink/10" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="28" height="24" patternUnits="userSpaceOnUse">
            <polygon points="14,1 26,7 26,17 14,23 2,17 2,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <Sticker className="relative h-20 w-20 drop-shadow-sm" {...extra} />
    </div>
  )
}
