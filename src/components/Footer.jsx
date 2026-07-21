import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import contact from '../data/contact'
import { BeeHexSticker } from './Stickers'

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="border-t-4 border-ink bg-ink text-board">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BeeHexSticker className="h-8 w-8" />
            <span className="font-display text-lg font-extrabold">
              {lang === 'ar' ? 'بي إديوكيشن' : 'Bee Education'}
            </span>
          </div>
          <p className="max-w-xs text-sm text-board/70">{t.footer.blurb}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-honey">{t.footer.pagesHeading}</h3>
          <Link to="/" className="w-fit text-sm text-board/80 hover:text-honey">
            {t.nav.home}
          </Link>
          <Link to="/offerings" className="w-fit text-sm text-board/80 hover:text-honey">
            {t.nav.offerings}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-honey">{t.footer.contactHeading}</h3>
          <a href={`mailto:${contact.email}`} dir="ltr" className="w-fit text-sm text-board/80 hover:text-honey">
            {contact.email}
          </a>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" dir="ltr" className="w-fit text-sm text-board/80 hover:text-honey">
            {contact.phoneDisplay} (WhatsApp)
          </a>
        </div>
      </div>
      <div className="border-t border-board/15 py-4 text-center text-xs text-board/50">
        © {new Date().getFullYear()} Bee Education — {t.footer.rights}
      </div>
    </footer>
  )
}
