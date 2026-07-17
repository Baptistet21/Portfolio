import { ArrowUpRight } from 'lucide-react'

export default function Footer({ t }) {
  return (
    <footer className="footer section-shell">
      <p>{t.footer.text}</p>
      <a href="#top">{t.footer.backToTop}<ArrowUpRight size={16} /></a>
    </footer>
  )
}
