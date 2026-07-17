import { BriefcaseBusiness, Building2, GraduationCap, Sparkles } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

export default function About({ t }) {
  const summaryIcons = [BriefcaseBusiness, GraduationCap, Building2]

  return (
    <section id="about" className="section-shell section-block">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
      <div className="about-grid about-grid-clean">
        <Reveal className="about-copy about-copy-wide">
          {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal className="about-now glass-card" delay={0.08}>
          <span className="about-now-label">{t.about.currentTitle}</span>
          <div className="about-now-list">
            {t.about.current.map((item, index) => {
              const Icon = summaryIcons[index] || Sparkles
              return (
                <div key={item.title} className="about-now-item">
                  <span><Icon size={20} /></span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
