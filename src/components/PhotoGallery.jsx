import { useLang } from '../i18n/LanguageContext'
import photos from '../data/photos'
import SectionHeading from './SectionHeading'
import { TokenCard } from './motion'
import { DieSticker, MeepleSticker, CardsSticker, BeeHexSticker, TrophySticker } from './Stickers'

const placeholderStickers = [DieSticker, MeepleSticker, CardsSticker, TrophySticker, BeeHexSticker, MeepleSticker]
const meepleColors = ['var(--color-meeple-red)', 'var(--color-meeple-teal)', 'var(--color-meeple-blue)']

// Honeycomb-patterned placeholder until a real photo src is provided.
function PlaceholderTile({ index }) {
  const Sticker = placeholderStickers[index % placeholderStickers.length]
  const extra = Sticker === MeepleSticker ? { color: meepleColors[index % meepleColors.length] } : {}
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-honey/25">
      <svg className="absolute inset-0 h-full w-full text-ink/10" aria-hidden="true">
        <defs>
          <pattern id={`hex-${index}`} width="28" height="24" patternUnits="userSpaceOnUse">
            <polygon
              points="14,1 26,7 26,17 14,23 2,17 2,7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
      </svg>
      <Sticker className="relative h-20 w-20 drop-shadow-sm" {...extra} />
    </div>
  )
}

export default function PhotoGallery() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.gallery.eyebrow} heading={t.gallery.heading} sub={t.gallery.sub} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <TokenCard
            key={photo.id}
            delay={i * 0.07}
            hoverRotate={i % 2 ? 1.2 : -1.2}
            className="overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-token"
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={t.gallery.captions[i] ?? ''}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <PlaceholderTile index={i} />
            )}
            <p className="border-t-2 border-ink/10 px-4 py-3 font-display text-sm font-bold">
              {t.gallery.captions[i] ?? ''}
            </p>
          </TokenCard>
        ))}
      </div>
    </section>
  )
}
