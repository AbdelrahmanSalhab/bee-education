import { useLang } from '../i18n/LanguageContext'
import contact from '../data/contact'
import sections from '../data/sections'

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="border-t-4 border-ink bg-ink text-board">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/brand-mark.png" alt="" className="h-8 w-8" />
            <span className="font-display text-lg font-extrabold">
              {lang === 'ar' ? 'بي إديوكيشن' : 'Bee Education'}
            </span>
          </div>
          <p className="max-w-xs text-sm text-board/70">{t.footer.blurb}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-honey">{t.footer.pagesHeading}</h3>
          {sections.map(({ id, key }) => (
            <a key={id} href={`#${id}`} className="w-fit text-sm text-board/80 hover:text-honey">
              {t.nav[key]}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-honey">{t.footer.contactHeading}</h3>
          <a href={`mailto:${contact.email}`} dir="ltr" className="w-fit text-sm text-board/80 hover:text-honey">
            {contact.email}
          </a>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" dir="ltr" className="w-fit text-sm text-board/80 hover:text-honey">
            {contact.phoneDisplay} (WhatsApp)
          </a>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-board/30 text-board/80 transition-colors hover:border-honey hover:text-honey"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.6v3H11v7h2.5z" />
              </svg>
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-board/30 text-board/80 transition-colors hover:border-honey hover:text-honey"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-board/30 text-board/80 transition-colors hover:border-honey hover:text-honey"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.1-.5c-.1 0-.3-.1-.6-.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 border-t border-board/15 py-4 text-center">
        <p className="text-xs text-board/50">
          © {new Date().getFullYear()} Bee Education — {t.footer.rights}
        </p>
        <a
          href="https://github.com/AbdelrahmanSalhab"
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="font-hand text-xl leading-none text-board/60 transition-colors hover:text-honey"
        >
          Made by Abdelrahman
        </a>
      </div>
    </footer>
  )
}
