import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import TiltProjectCard from '../components/projects/TiltProjectCard.jsx'

export default function Projects({ t }) {
  return (
    <section id="projects" className="section-shell section-block projects-os-section">
      <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} />
      <div className="projects-os-grid">
        {t.projects.items.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <TiltProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
