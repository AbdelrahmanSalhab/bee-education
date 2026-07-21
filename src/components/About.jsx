import { useLang } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import { Reveal, TokenCard } from './motion'
import { BeeHexSticker, MeepleSticker } from './Stickers'

export default function About() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-5">
        <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-ink-soft lg:col-span-3">
          {t.about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-ink/25 bg-honey/10 p-4 text-base">
            <MeepleSticker className="h-9 w-9 shrink-0 -rotate-6" color="var(--color-meeple-teal)" />
            <p>{t.about.teamBio}</p>
          </div>
        </Reveal>

        <TokenCard className="rounded-2xl border-2 border-ink bg-card p-6 shadow-token lg:col-span-2" hoverRotate={1}>
          <span className="inline-block rounded-full border-2 border-ink bg-honey px-4 py-1 font-display text-sm font-bold shadow-token-sm">
            {t.about.founderEyebrow}
          </span>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-board shadow-token-sm">
              <BeeHexSticker className="h-11 w-11" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold leading-tight">{t.about.founderName}</h3>
              <p className="font-medium text-honey-deep">{t.about.founderTitle}</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-ink-soft">{t.about.founderBio}</p>
        </TokenCard>
      </div>
    </section>
  )
}
