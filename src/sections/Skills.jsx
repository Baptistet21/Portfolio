import SectionHeading from '../components/ui/SectionHeading.jsx'
import SkillExplorer from '../components/skills/SkillExplorer.jsx'

export default function Skills({ t }) {
  return (
    <section id="skills" className="section-shell section-block skills-os-section">
      <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
      <SkillExplorer t={t} />
    </section>
  )
}
