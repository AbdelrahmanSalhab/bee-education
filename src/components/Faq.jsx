import { useLang } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import { Reveal } from './motion'

export default function Faq() {
  const { t } = useLang()
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
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
