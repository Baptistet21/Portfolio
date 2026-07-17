import { GraduationCap } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

export default function Education({ t }) {
  return (
    <section id="education" className="section-shell section-block">
      <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />
      <div className="education-list">
        {t.education.items.map((item, index) => (
          <Reveal key={item.degree} delay={index * 0.08}>
            <article className="education-card">
              <div className="education-index"><GraduationCap size={23} /></div>
              <div className="education-period">{item.period}</div>
              <div>
                <h3>{item.degree}</h3>
                <strong>{item.school}</strong>
                <p>{item.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
