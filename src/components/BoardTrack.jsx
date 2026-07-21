import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

const TRACK =
  'M400 0 C400 240 130 300 130 520 C130 740 670 780 670 1000 C670 1220 130 1260 130 1480 C130 1700 670 1740 670 1960 C670 2180 400 2220 400 2400'

// Winding "board path" behind the Home page: a faint dotted track,
// with a honey line drawing along it as the visitor scrolls.
export default function BoardTrack() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block rtl:-scale-x-100">
      <svg className="h-full w-full" viewBox="0 0 800 2400" preserveAspectRatio="none" fill="none">
        <path
          d={TRACK}
          stroke="var(--color-ink)"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 16"
        />
        {!reduce && (
          <motion.path
            d={TRACK}
            stroke="var(--color-honey)"
            strokeOpacity="0.8"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        )}
      </svg>
    </div>
  )
}
