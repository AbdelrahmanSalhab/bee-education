import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const TRACK =
  'M400 0 C400 240 130 300 130 520 C130 740 670 780 670 1000 C670 1220 130 1260 130 1480 C130 1700 670 1740 670 1960 C670 2180 400 2220 400 2400'

// Narrower box and tighter swings so the track still reads as a winding
// path on a phone instead of a flat zigzag across the whole screen.
const TRACK_NARROW =
  'M200 0 C200 170 70 230 70 400 C70 570 330 630 330 800 C330 970 70 1030 70 1200 C70 1370 330 1430 330 1600 C330 1770 70 1830 70 2000 C70 2170 200 2230 200 2400'

// Winding "board path" behind the Home page: a faint dotted track,
// with a honey line drawing along it as the visitor scrolls.
export default function BoardTrack() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Measure against the track itself, centre-anchored: the drawn tip stays in
  // the middle of the screen at any viewport. Plain document progress ties the
  // tip to the top edge, which pushes it off-screen on tall phone layouts.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })
  // A round cap still paints a dot at zero length, so fade the line out entirely
  // once it has retracted to the top.
  const opacity = useTransform(pathLength, [0, 0.01], [0, 1])

  const track = (d, viewBox, className) => (
    <svg className={className} viewBox={viewBox} preserveAspectRatio="none" fill="none">
      <path
        d={d}
        stroke="var(--color-ink)"
        strokeOpacity="0.18"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 16"
      />
      {!reduce && (
        <motion.path
          d={d}
          stroke="var(--color-honey)"
          strokeOpacity="0.8"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      )}
    </svg>
  )

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 rtl:-scale-x-100">
      {track(TRACK_NARROW, '0 0 400 2400', 'h-full w-full lg:hidden')}
      {track(TRACK, '0 0 800 2400', 'hidden h-full w-full lg:block')}
    </div>
  )
}
