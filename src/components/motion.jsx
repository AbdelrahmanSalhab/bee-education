import { motion, useReducedMotion } from 'motion/react'

// Gently bobbing/rotating wrapper for sticker art.
export function Float({ children, className, delay = 0, rotate = 4, duration = 6 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -12, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

// Fade-up on scroll into view.
export function Reveal({ children, className, delay = 0, as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

// Card that lifts and tilts on hover, springs in on scroll.
export function TokenCard({ children, className, delay = 0, hoverRotate = -1.2 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay }}
      whileHover={reduce ? undefined : { y: -8, rotate: hoverRotate, scale: 1.02 }}
    >
      {children}
    </motion.div>
  )
}
