import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n/LanguageContext'
import photos from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

// How many cards of the deck are kept in the DOM at once.
const STACK = 3

// Resting transform per slot: a hand of cards fanned on the table.
const slots = [
  { y: 0, scale: 1, rotate: -1.5 },
  { y: 14, scale: 0.95, rotate: 2.5 },
  { y: 28, scale: 0.9, rotate: -3.5 },
]

// `dir` is +1 for next / -1 for previous, `side` the x direction a discarded
// card flies toward (left in LTR, right in RTL).
const variants = {
  enter: ({ dir, side, reduce }) => {
    if (reduce) return { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }
    return dir > 0
      ? { opacity: 0, x: 0, y: 40, scale: 0.85, rotate: 0 }
      : { opacity: 0, x: side * 340, y: 0, scale: 1, rotate: side * 14 }
  },
  exit: ({ dir, side, reduce }) => {
    if (reduce) return { opacity: 0, transition: { duration: 0.2 } }
    return dir > 0
      ? {
          // zIndex jumps instantly, otherwise the promoted card ties with the
          // thrown one on z and cuts across it mid-flight.
          zIndex: 40,
          x: side * 460,
          rotate: side * 16,
          opacity: 0,
          transition: {
            duration: 0.34,
            ease: 'easeOut',
            zIndex: { duration: 0 },
            // Stay solid through the throw, fade only once it is off the edge.
            opacity: { duration: 0.12, delay: 0.22 },
          },
        }
      : { opacity: 0, y: 40, scale: 0.85, transition: { duration: 0.22 } }
  },
}

// The stack settles faster than the card is thrown, so the next card owns the
// spotlight before the old one has finished leaving.
const settle = { type: 'spring', stiffness: 420, damping: 34 }

const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 400

function Chevron({ flip }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DeckCard({ photo, alt, pos, custom, draggable, onSwipe, reduce }) {
  const slot = slots[pos]
  // A finished drag also fires onTap, which would advance the deck twice.
  const dragged = useRef(false)
  const dragProps = draggable
    ? {
        drag: 'x',
        // No constraints, so the card tracks the finger 1:1 instead of lagging
        // behind it at half speed. A drag that does not commit springs back.
        dragSnapToOrigin: true,
        dragMomentum: false,
        dragTransition: { bounceStiffness: 600, bounceDamping: 40 },
        onPointerDown: () => {
          dragged.current = false
        },
        onDrag: (_, { offset }) => {
          if (Math.abs(offset.x) > 4) dragged.current = true
        },
        onDragEnd: (_, { offset, velocity }) => {
          const toward = offset.x * custom.side
          const flick = velocity.x * custom.side
          if (toward > SWIPE_DISTANCE || flick > SWIPE_VELOCITY) onSwipe(1)
          else if (toward < -SWIPE_DISTANCE || flick < -SWIPE_VELOCITY) onSwipe(-1)
        },
        onTap: () => {
          if (!dragged.current) onSwipe(1)
        },
      }
    : {}

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-token"
      style={{ zIndex: STACK - pos, cursor: draggable ? 'grab' : 'default' }}
      custom={custom}
      variants={variants}
      initial="enter"
      animate={reduce ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : { opacity: 1, x: 0, ...slot }}
      exit="exit"
      transition={settle}
      {...dragProps}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={alt}
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover"
        />
      ) : (
        <PhotoPlaceholder index={photo.id - 1} className="h-full w-full" />
      )}
    </motion.div>
  )
}

export default function PhotoDeck() {
  const { t, isRTL } = useLang()
  const reduce = useReducedMotion()
  const [[index, dir], setCard] = useState([0, 1])
  const total = photos.length
  const side = isRTL ? 1 : -1
  const custom = { dir, side, reduce }

  const paginate = (step) => setCard(([i]) => [(i + step + total) % total, step])

  // Only the top few cards are mounted, so mobile never downloads the whole set.
  const visible = Array.from({ length: Math.min(STACK, total) }, (_, pos) => ({
    pos,
    photo: photos[(index + pos) % total],
    photoIndex: (index + pos) % total,
  }))

  // Warm the cards just past the stack, so one mounting mid-swipe never shows
  // as a blank card while its image downloads.
  useEffect(() => {
    for (let ahead = 0; ahead < 2; ahead++) {
      const { src } = photos[(index + STACK + ahead) % total]
      if (src) new Image().src = src
    }
  }, [index, total])

  return (
    <div className="mt-10">
      <div
        className="relative mx-auto aspect-[4/3] w-full max-w-sm"
        role="group"
        aria-roledescription="carousel"
        aria-label={t.gallery.heading}
      >
        <AnimatePresence custom={custom} initial={false}>
          {visible
            .slice()
            .reverse()
            .map(({ photo, photoIndex, pos }) => (
              <DeckCard
                key={photo.id}
                photo={photo}
                alt={t.gallery.captions[photoIndex] ?? ''}
                pos={pos}
                custom={custom}
                draggable={pos === 0}
                onSwipe={paginate}
                reduce={reduce}
              />
            ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label={t.gallery.prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-card shadow-token-sm active:translate-y-0.5 active:shadow-none"
        >
          <Chevron flip={isRTL} />
        </button>

        <div className="flex items-center gap-1.5">
          {photos.map((photo, i) => (
            <span
              key={photo.id}
              className={`h-2 rounded-full border border-ink transition-all ${
                i === index ? 'w-5 bg-honey' : 'w-2 bg-card'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label={t.gallery.next}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-card shadow-token-sm active:translate-y-0.5 active:shadow-none"
        >
          <Chevron flip={!isRTL} />
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-ink-soft/80">{t.gallery.swipeHint}</p>
    </div>
  )
}
