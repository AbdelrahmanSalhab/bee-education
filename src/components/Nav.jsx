import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 font-display text-sm font-bold transition-colors sm:text-base ${
    isActive ? 'bg-ink text-board' : 'hover:bg-ink/10'
  }`

export default function Nav() {
  const { t, lang, toggle } = useLang()
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-board/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/brand-mark.png" alt="" className="h-9 w-9" />
          <span className="font-display text-lg font-extrabold leading-none sm:text-xl">
            {lang === 'ar' ? 'بي إديوكيشن' : 'Bee Education'}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass} end>
            {t.nav.home}
          </NavLink>
          <NavLink to="/offerings" className={linkClass}>
            {t.nav.offerings}
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            className="ms-1 rounded-full border-2 border-ink bg-card px-3 py-1.5 font-display text-sm font-bold shadow-token-sm transition-transform hover:-translate-y-0.5 sm:ms-2"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </nav>
    </header>
  )
}
