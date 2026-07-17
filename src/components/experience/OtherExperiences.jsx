import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BriefcaseBusiness, Check, MapPin } from 'lucide-react'

export default function OtherExperiences({ t }) {
  const items = t.experience.items
  const [active, setActive] = useState(0)
  const selected = items[active]
  const isCurrent = Boolean(selected.featured)

  return (
    <div className="experience-unified">
      <div className="experience-layout">
        <div className="experience-tabs" role="tablist" aria-label={t.experience.title}>
          {items.map((item, index) => (
            <button
              key={`${item.company}-${item.period}`}
              className={`${active === index ? 'active' : ''} ${item.featured ? 'current-tab' : ''}`}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={active === index}
            >
              <span>{item.period}</span>
              <strong>{item.company}</strong>
              <small>{item.role}</small>
              {item.featured && <em><i />{t.experience.current}</em>}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={`${selected.company}-${selected.period}`}
            className={`experience-card glass-card experience-card-simple ${isCurrent ? 'current-experience-card' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.32 }}
          >
            {isCurrent && (
              <div className="experience-current-banner">
                <span><i />{t.experience.mainExperience}</span>
              </div>
            )}

            <div className="experience-card-top">
              <div className="experience-icon"><BriefcaseBusiness size={24} /></div>
              <div>
                <p>{selected.period}</p>
                <h3>{selected.role}</h3>
                <div className="company-line">
                  <strong>{selected.company}</strong>
                  <span><MapPin size={15} />{selected.location}</span>
                </div>
              </div>
            </div>

            <p className="experience-description">{selected.description}</p>

            <div className="experience-details-grid">
              <div className="experience-missions">
                <h4>{t.experience.mlogMissionsTitle}</h4>
                <ul>
                  {selected.bullets.map((bullet) => (
                    <li key={bullet}><Check size={17} />{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="experience-skills">
                <h4>{t.experience.mlogSkillsTitle}</h4>
                <div className="tag-list">
                  {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
