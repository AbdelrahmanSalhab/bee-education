import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import sections from '../data/sections'

// Highlights the section whose top has most recently passed under the header.
function useActiveSection() {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const update = () => {
      const offset = 120
      let current = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      // Bottom of the page always belongs to the last section, however short it is.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return active
}

const linkClass = (isActive) =>
  `rounded-full px-3 py-1.5 font-display text-sm font-bold transition-colors ${
    isActive ? 'bg-ink text-board' : 'hover:bg-ink/10'
  }`

export default function Nav() {
  const { t, lang, toggle } = useLang()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-board/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/brand-mark.png" alt="" className="h-9 w-9" />
          <span className="font-display text-lg font-extrabold leading-none sm:text-xl">
            {lang === 'ar' ? 'بي إديوكيشن' : 'Bee Education'}
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            {sections.map(({ id, key }) => (
              <a key={id} href={`#${id}`} className={linkClass(active === id)}>
                {t.nav[key]}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggle}
            className="rounded-full border-2 border-ink bg-card px-3 py-1.5 font-display text-sm font-bold shadow-token-sm transition-transform hover:-translate-y-0.5 lg:ms-2"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-card shadow-token-sm lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlaid, not in flow: an in-flow panel would resize the sticky header
          and throw off the anchor scroll when it closes. */}
      {open && (
        <div className="absolute inset-x-0 top-full border-b-2 border-ink/10 bg-board/95 px-4 pb-4 pt-2 backdrop-blur sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {sections.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 font-display font-bold transition-colors ${
                  active === id ? 'bg-ink text-board' : 'hover:bg-ink/10'
                }`}
              >
                {t.nav[key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
