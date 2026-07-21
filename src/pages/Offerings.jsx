import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'
import CTA from '../components/CTA'
import { Reveal, TokenCard, Float } from '../components/motion'
import { DieSticker, MeepleSticker, TrophySticker, CardsSticker } from '../components/Stickers'

const packageStickers = [DieSticker, CardsSticker, TrophySticker]
const tagColors = ['bg-honey', 'bg-meeple-teal text-board', 'bg-meeple-red text-board']

function Packages() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading heading={t.offerings.packagesHeading} />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {t.offerings.packages.map((pkg, i) => {
          const Sticker = packageStickers[i % packageStickers.length]
          return (
            <TokenCard
              key={pkg.name}
              delay={i * 0.12}
              hoverRotate={i % 2 ? 1.2 : -1.2}
              className="flex flex-col gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-token"
            >
              <div className="flex items-start justify-between gap-3">
                <Sticker className="h-14 w-14 -rotate-6" />
                <span
                  className={`rounded-full border-2 border-ink px-3 py-1 font-display text-xs font-bold shadow-token-sm ${tagColors[i % tagColors.length]}`}
                >
                  {pkg.tag}
                </span>
              </div>
              <h3 className="font-display text-3xl font-extrabold">{pkg.name}</h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                <span className="rounded-full bg-ink/8 px-3 py-1">{pkg.duration}</span>
                <span className="rounded-full bg-ink/8 px-3 py-1">{pkg.size}</span>
              </div>
              <p className="text-ink-soft">{pkg.text}</p>
              <ul className="flex flex-col gap-2">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm">
                    <span className="inline-block h-2.5 w-2.5 shrink-0 rotate-45 bg-honey-deep" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t-2 border-dashed border-ink/20 pt-4 font-display text-xl font-bold">
                {pkg.price}
              </div>
            </TokenCard>
          )
        })}
      </div>
    </section>
  )
}

// Steps as spaces on a game-board path; a meeple token travels the
// connector line as the section scrolls through the viewport.
function HowItWorks() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 18 })
  const tokenPos = useTransform(progress, (v) => `${Math.min(v, 0.98) * 100}%`)
  const lineScale = reduce ? 1 : progress

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
    </section>
  )
}

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

function Faq() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading heading={t.offerings.faqHeading} />
      <div className="mt-10 flex flex-col gap-4">
        {t.offerings.faq.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.08}>
            <details className="group rounded-2xl border-2 border-ink bg-card px-5 py-4 shadow-token-sm open:shadow-token">
              <summary className="cursor-pointer list-none font-display text-lg font-bold marker:hidden">
                {item.q}
              </summary>
              <p className="mt-2 text-ink-soft">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Offerings() {
  const { t } = useLang()
  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <Float className="absolute end-6 top-8 hidden lg:block" rotate={7} duration={8}>
          <TrophySticker className="h-20 w-20" />
        </Float>
        <Float className="absolute start-6 top-14 hidden lg:block" rotate={6} delay={1} duration={7}>
          <DieSticker className="h-16 w-16" pipColor="var(--color-meeple-red)" />
        </Float>
        <SectionHeading eyebrow={t.offerings.eyebrow} heading={t.offerings.heading} sub={t.offerings.sub} />
      </section>
      <Packages />
      <HowItWorks />
      <Faq />
      <CTA />
    </div>
  )
}
