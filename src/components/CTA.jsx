import { useLang } from '../i18n/LanguageContext'
import contact from '../data/contact'
import { Reveal, Float } from './motion'
import { DieSticker, TrophySticker } from './Stickers'

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.1-.5c-.1 0-.3-.1-.6-.2z" />
    </svg>
  )
}

export default function CTA() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-honey px-6 py-12 text-center shadow-token sm:px-12 sm:py-16">
          <Float className="absolute -start-4 top-6 hidden sm:block" rotate={8} duration={7}>
            <DieSticker className="h-16 w-16" pipColor="var(--color-meeple-red)" />
          </Float>
          <Float className="absolute -end-3 bottom-6 hidden sm:block" rotate={6} delay={1.2} duration={8}>
            <TrophySticker className="h-20 w-20" />
          </Float>

          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">{t.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink/80">{t.cta.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[#25D366] px-8 py-3 font-display text-lg font-bold text-white shadow-token-sm transition-transform hover:-translate-y-1"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t.cta.whatsapp}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-block rounded-full border-2 border-ink bg-ink px-8 py-3 font-display text-lg font-bold text-board shadow-token-sm transition-transform hover:-translate-y-1"
            >
              {t.cta.button}
            </a>
          </div>
          <p dir="ltr" className="mt-4 text-sm font-medium text-ink/70">
            {contact.email} · {contact.phoneDisplay}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
