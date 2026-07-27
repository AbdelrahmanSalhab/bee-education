import { useLang } from '../i18n/LanguageContext'
import BoardTrack from '../components/BoardTrack'
import About from '../components/About'
import ClientLogos from '../components/ClientLogos'
import PhotoGallery from '../components/PhotoGallery'
import HowItWorks from '../components/HowItWorks'
import Faq from '../components/Faq'
import CTA from '../components/CTA'
import SectionHeading from '../components/SectionHeading'
import { Float, Reveal, TokenCard } from '../components/motion'
import { DieSticker, MeepleSticker, CardsSticker, BeeHexSticker, stickerByName } from '../components/Stickers'

function Hero() {
  const { t } = useLang()
  return (
    <section id="home" className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
      <Float className="absolute start-4 top-10 hidden md:block" rotate={7} duration={7}>
        <DieSticker className="h-20 w-20" pipColor="var(--color-meeple-teal)" />
      </Float>
      <Float className="absolute end-8 top-16 hidden md:block" rotate={6} delay={0.8} duration={8}>
        <MeepleSticker className="h-24 w-24" />
      </Float>
      <Float className="absolute bottom-4 start-16 hidden lg:block" rotate={5} delay={1.6} duration={9}>
        <CardsSticker className="h-24 w-24" />
      </Float>
      <Float className="absolute bottom-10 end-14 hidden lg:block" rotate={8} delay={0.4} duration={7}>
        <BeeHexSticker className="h-16 w-16" />
      </Float>

      <Reveal className="flex flex-col items-center gap-6">
        <img
          src="/brand-mark.png"
          alt=""
          className="h-44 w-44 sm:h-56 sm:w-56"
        />
        <h1 dir="ltr" className="font-display text-4xl font-extrabold sm:text-5xl">
          Bee Education
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-ink-soft sm:text-xl">{t.hero.sub}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#events"
            className="rounded-full border-2 border-ink bg-honey px-8 py-3 font-display text-lg font-bold shadow-token transition-transform hover:-translate-y-1"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#gallery"
            className="rounded-full border-2 border-ink bg-card px-8 py-3 font-display text-lg font-bold shadow-token-sm transition-transform hover:-translate-y-1"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function Offer() {
  const { t } = useLang()
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.offerings.eyebrow} heading={t.offerings.heading} sub={t.offerings.sub} />

      <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.offerings.facts.map((fact) => {
          const Sticker = stickerByName[fact.icon]
          return (
            <div
              key={fact.text}
              className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-ink/25 bg-honey/10 px-4 py-3"
            >
              <Sticker className="h-9 w-9 shrink-0 -rotate-6" />
              <p className="text-sm font-medium">{fact.text}</p>
            </div>
          )
        })}
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {t.offer.items.map((item, i) => {
          const Sticker = stickerByName[item.icon]
          return (
            <TokenCard
              key={item.icon}
              delay={i * 0.12}
              hoverRotate={i % 2 ? 1.2 : -1.2}
              className="flex flex-col items-start gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-token"
            >
              <Sticker className="h-14 w-14 -rotate-6" />
              <h3 className="font-display text-2xl font-bold">{item.title}</h3>
              <p className="text-ink-soft">{item.text}</p>
            </TokenCard>
          )
        })}
      </div>
    </div>
  )
}

// Everything lives on one page; each `id` below is a nav destination.
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      {/* The track starts below the hero: it draws from its own top edge, so
          spanning the hero would paint the line across the brand mark. */}
      <div className="relative">
        <BoardTrack />
        <div className="relative">
          <section id="events">
            <Offer />
            <HowItWorks />
          </section>
          <section id="about">
            <About />
            <ClientLogos />
          </section>
          <section id="gallery">
            <PhotoGallery />
          </section>
          <Faq />
          <section id="contact">
            <CTA />
          </section>
        </div>
      </div>
    </div>
  )
}
