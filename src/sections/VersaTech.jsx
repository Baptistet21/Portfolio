import { Building2, CalendarDays, CodeXml, ExternalLink, Rocket, Sparkles, UsersRound } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

export default function VersaTech({ t }) {
  const icons = [CalendarDays, UsersRound, CodeXml]

  return (
    <section id="versatech" className="section-shell section-block versatech-section versatech-os-section">
      <SectionHeading eyebrow={t.versatech.eyebrow} title={t.versatech.title} />
      <Reveal className="versatech-card versatech-os-card">
        <div className="versatech-main">
          <div className="versatech-logo"><Building2 size={30} /></div>
          <span className="versatech-badge"><Rocket size={15} />{t.versatech.badge}</span>
          <h3>VersaTech</h3>
          <p>{t.versatech.description}</p>
          <a className="primary-button versatech-cta" href="https://versatech-dev.fr/" target="_blank" rel="noreferrer">
            {t.versatech.cta}<ExternalLink size={18} />
          </a>
        </div>

        <div className="versatech-os-timeline">
          <div className="versatech-year">2025</div>
          <div className="versatech-line"><i /></div>
          {t.versatech.details.map((item, index) => {
            const Icon = icons[index] || Sparkles
            return (
              <div className="versatech-milestone" key={item.title}>
                <span><Icon size={19} /></span>
                <div>
                  <small>0{index + 1}</small>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
