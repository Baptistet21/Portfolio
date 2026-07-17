import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ChevronRight, Globe2, MapPin } from 'lucide-react'
import { lazy, Suspense } from 'react'
import TerminalIntro from '../components/hero/TerminalIntro.jsx'

const HeroVisual = lazy(() => import('../components/hero/HeroVisual.jsx'))

export default function Hero({ t, theme }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero hero-os section-shell">
      <div className="hero-grid hero-os-grid">
        <div className="hero-copy">
          <motion.div
            className="status-pill"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot" />
            {t.hero.availability}
          </motion.div>

          <TerminalIntro lines={t.hero.terminalLines} />

          <motion.p
            className="hero-kicker"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.name}
            <span>{t.hero.role}</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="hero-meta"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span><MapPin size={17} />{t.hero.location}</span>
            <span><Globe2 size={17} />FR / EN</span>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
          >
            <a className="primary-button" href="#contact">{t.hero.contact}<ArrowDownRight size={19} /></a>
            <a className="text-button" href="#experience">{t.hero.explore}<ChevronRight size={18} /></a>
          </motion.div>

          <div className="hero-stats">
            {t.hero.stats.map((stat, index) => (
              <motion.div
                key={`${stat.value}-${stat.label}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.56 + index * 0.08 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Suspense fallback={<div className="hero-os-visual hero-visual-loading" />}><HeroVisual t={t} theme={theme} /></Suspense>
      </div>
    </section>
  )
}
