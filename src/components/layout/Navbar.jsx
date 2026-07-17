import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ChevronRight, Languages, Menu, Moon, Sun, X } from 'lucide-react'

export default function Navbar({ t, language, setLanguage, theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['about', t.nav.about],
    ['versatech', t.nav.versatech],
    ['experience', t.nav.experience],
    ['projects', t.nav.projects],
    ['skills', t.nav.skills],
    ['education', t.nav.education],
    ['contact', t.nav.contact],
  ]

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Retour en haut">
        <span className="brand-mark">BT</span>
        <span className="brand-name">Baptiste Tellier</span>
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <div className="nav-actions">
        <button
          className="utility-btn language-btn"
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          aria-label="Changer de langue"
        >
          <Languages size={17} />
          <span>{language.toUpperCase()}</span>
        </button>
        <button
          className="utility-btn icon-only"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Changer de thème"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="utility-btn icon-only menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.nav
          id="mobile-navigation"
          className="mobile-nav"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}<ChevronRight size={18} />
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  )
}
