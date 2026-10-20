import { ArrowUpRight, Building2, CodeXml, ContactRound, Mail, Phone } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'

export default function Contact({ t }) {
  const links = [
    { label: t.contact.email, value: 'baptistet21@gmail.com', href: 'mailto:baptistet21@gmail.com', Icon: Mail },
    { label: t.contact.linkedin, value: 'Baptiste Tellier', href: 'https://www.linkedin.com/in/baptiste-tellier-150916237/', Icon: ContactRound },
    { label: t.contact.github, value: 'Baptistet21', href: 'https://github.com/Baptistet21', Icon: CodeXml },
    // { label: t.contact.versatech, value: 'versatech-dev.fr', href: 'https://versatech-dev.fr/', Icon: Building2 },
    { label: t.contact.phone, value: '+33 6 24 51 29 63', href: 'tel:+33624512963', Icon: Phone },
  ]

  return (
    <section id="contact" className="section-shell section-block contact-section">
      <Reveal className="contact-card">
        <div className="contact-copy">
          <span className="eyebrow"><span />{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
        </div>
        <div className="contact-links">
          {links.map(({ label, value, href, Icon }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="contact-icon"><Icon size={21} /></span>
              <span><small>{label}</small><strong>{value}</strong></span>
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
