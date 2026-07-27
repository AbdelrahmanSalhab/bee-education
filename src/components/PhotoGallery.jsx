import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import photos from '../data/photos'
import SectionHeading from './SectionHeading'
import PhotoDeck from './PhotoDeck'
import PhotoPlaceholder from './PhotoPlaceholder'
import { TokenCard } from './motion'

// Matches Tailwind's `sm` breakpoint: below it, the grid becomes a card deck.
function useIsNarrow() {
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = (e) => setNarrow(e.matches)
    setNarrow(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow
}

function PhotoGrid() {
  const { t } = useLang()
  return (
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
            <PhotoPlaceholder index={i} />
          )}
        </TokenCard>
      ))}
    </div>
  )
}

export default function PhotoGallery() {
  const { t } = useLang()
  const narrow = useIsNarrow()
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.gallery.eyebrow} heading={t.gallery.heading} sub={t.gallery.sub} />
      {narrow ? <PhotoDeck /> : <PhotoGrid />}
    </section>
  )
}
