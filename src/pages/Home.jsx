import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import BoardTrack from '../components/BoardTrack'
import About from '../components/About'
import ClientLogos from '../components/ClientLogos'
import PhotoGallery from '../components/PhotoGallery'
import CTA from '../components/CTA'
import SectionHeading from '../components/SectionHeading'
import { Float, Reveal, TokenCard } from '../components/motion'
import { DieSticker, MeepleSticker, CardsSticker, BeeHexSticker, stickerByName } from '../components/Stickers'

function Hero() {
  const { t, lang } = useLang()
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
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
          src="/brand-logo.png"
          alt="BEE — Here to Be"
          className="h-44 w-auto sm:h-56"
        />
        <span className="font-display text-3xl font-extrabold sm:text-4xl">
          {lang === 'ar' ? 'بي إديوكيشن' : 'Bee Education'}
        </span>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.15] sm:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-ink-soft sm:text-xl">{t.hero.sub}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/offerings"
            className="rounded-full border-2 border-ink bg-honey px-8 py-3 font-display text-lg font-bold shadow-token transition-transform hover:-translate-y-1"
          >
            {t.hero.ctaPrimary}
          </Link>
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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.offer.eyebrow} heading={t.offer.heading} />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
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
              <Link to="/offerings" className="mt-auto font-display font-bold text-meeple-teal hover:underline">
                {t.hero.ctaPrimary} <span className="inline-block rtl:-scale-x-100">→</span>
              </Link>
            </TokenCard>
          )
        })}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <BoardTrack />
      <div className="relative">
        <Hero />
        <Offer />
        <About />
        <ClientLogos />
        <div id="gallery">
          <PhotoGallery />
        </div>
        <CTA />
      </div>
    </div>
  )
}
