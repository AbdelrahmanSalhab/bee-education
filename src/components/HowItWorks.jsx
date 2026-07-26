import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import { TokenCard } from './motion'
import { MeepleSticker } from './Stickers'

function StepCard({ step, index }) {
  return (
    <TokenCard
      delay={index * 0.12}
      hoverRotate={index % 2 ? 1 : -1}
      className="flex flex-col gap-2 rounded-2xl border-2 border-ink bg-card p-5 shadow-token-sm"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-honey font-display text-lg font-extrabold shadow-token-sm">
        {index + 1}
      </span>
      <h3 className="font-display text-xl font-bold">{step.title}</h3>
      <p className="text-sm text-ink-soft">{step.text}</p>
    </TokenCard>
  )
}

// Steps as spaces on a game-board path; a meeple token travels the
// connector line as the section scrolls through the viewport.
export default function HowItWorks() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 18 })
  const tokenPos = useTransform(progress, (v) => `${Math.min(v, 0.98) * 100}%`)
  const lineScale = reduce ? 1 : progress

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={t.offerings.howEyebrow} heading={t.offerings.howHeading} />

      <div className="relative mt-16 hidden md:block">
        <div className="absolute inset-x-10 top-7 h-1.5 overflow-visible rounded-full bg-ink/15">
          <motion.div
            className="h-full origin-[0%_50%] rounded-full bg-honey rtl:origin-[100%_50%]"
            style={{ scaleX: lineScale }}
          />
          {!reduce && (
            <motion.div className="absolute -top-5" style={{ insetInlineStart: tokenPos }}>
              <MeepleSticker className="h-11 w-11" color="var(--color-meeple-blue)" />
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-6 pt-20">
          {t.offerings.steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 md:hidden">
        {t.offerings.steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </div>
  )
}
