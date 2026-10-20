import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import ProjectMockup from './ProjectMockup.jsx'

export default function TiltProjectCard({ project, index, linkLabel = 'Voir le projet' }) {
  const hasLink = Boolean(project.url)
  const isExternal = hasLink && /^https?:\/\//.test(project.url)
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 22 })

  const onPointerMove = (event) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      className={`project-os-card project-${project.gradient} ${project.featured ? 'project-featured' : ''} ${hasLink ? 'project-has-link' : ''}`}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileHover={reduceMotion ? undefined : { y: -9 }}
    >
      <div className="project-os-topline">
        <span>{project.index}</span>
        {hasLink ? (
          <a
            className="project-os-link"
            href={project.url}
            aria-label={`${linkLabel} : ${project.name}`}
            {...linkProps}
          >
            <ArrowUpRight size={22} />
          </a>
        ) : (
          <ArrowUpRight size={22} aria-hidden="true" />
        )}
      </div>
      <div className="project-mockup-stage"><ProjectMockup index={index} /></div>
      <div className="project-os-copy">
        <p className="project-type">{project.type}</p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </motion.article>
  )
}
