import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import VersaTech from './sections/VersaTech.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Education from './sections/Education.jsx'
import Contact from './sections/Contact.jsx'
import { content } from './data/content.js'

export default function App() {
  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'fr'
  const [language, setLanguage] = useState(
    localStorage.getItem('portfolio-language') || (browserLanguage === 'fr' ? 'fr' : 'en'),
  )
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
  }, [language])

  const t = useMemo(() => content[language] || content.fr, [language])

  return (
    <>
      <ScrollProgress />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar
        t={t}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        <Hero t={t} theme={theme} />
        <About t={t} />
        {/*<VersaTech t={t} />*/}
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Education t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
