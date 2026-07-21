import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import clients from '../data/clients'
import SectionHeading from './SectionHeading'
import { MeepleSticker } from './Stickers'

// Logo on top, organization name underneath. If the logo file is missing
// from /public/logos, a meeple stands in for it.
function LogoCard({ client }) {
  const [logoMissing, setLogoMissing] = useState(false)
  return (
    <div className="flex w-52 shrink-0 flex-col items-center gap-3 rounded-2xl border-2 border-ink bg-card px-4 py-4 shadow-token-sm">
      <div className="flex h-20 items-center justify-center">
        {logoMissing ? (
          <MeepleSticker className="h-12 w-12" color="var(--color-honey-deep)" />
        ) : (
          <img
            src={client.logo}
            alt=""
            className="max-h-20 w-auto max-w-40 rounded-lg object-contain"
            onError={() => setLogoMissing(true)}
          />
        )}
      </div>
      <span dir="rtl" className="text-center font-display text-sm font-bold leading-tight">
        {client.name}
      </span>
    </div>
  )
}

export default function ClientLogos() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.clients.eyebrow} heading={t.clients.heading} />
      <div
        dir="ltr"
        className="group relative mt-10 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-6 pe-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...clients, ...clients].map((client, i) => (
            <LogoCard key={`${client.id}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
