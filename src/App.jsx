import { useEffect } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'

// The site used to have a separate /offerings page; send old links to its section.
function useLegacyPathRedirect() {
  useEffect(() => {
    if (window.location.pathname === '/') return
    const hash = window.location.pathname.replace(/\/+$/, '') === '/offerings' ? '#events' : ''
    window.history.replaceState(null, '', `/${hash}`)
    if (hash) document.getElementById('events')?.scrollIntoView()
  }, [])
}

export default function App() {
  useLegacyPathRedirect()

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Home />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
