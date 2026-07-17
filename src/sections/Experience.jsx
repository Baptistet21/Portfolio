import SectionHeading from '../components/ui/SectionHeading.jsx'
import OtherExperiences from '../components/experience/OtherExperiences.jsx'

export default function Experience({ t }) {
  return (
    <section id="experience" className="section-shell section-block experience-os-section">
      <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} />
      <OtherExperiences t={t} />
    </section>
  )
}
