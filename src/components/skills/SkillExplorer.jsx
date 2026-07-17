import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight, Container, Database, Folder, FolderOpen, Languages, PanelsTopLeft, ServerCog, Sparkles, Workflow } from 'lucide-react'

const iconMap = { PanelsTopLeft, ServerCog, Database, Container, Workflow, Sparkles, Languages }
const folderNames = ['frontend', 'backend-api', 'data', 'devops-tools', 'architecture', 'languages', 'ai-assisted']

function SkillCode({ category, index, itemLabel }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.name}
        className="skills-code-body"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24 }}
      >
        <div className="skills-code-meta">
          <span>{category.items.length} {itemLabel}</span>
          <strong>src/skills/{folderNames[index]}.js</strong>
        </div>
        <div className="skills-code-lines">
          <span><em>01</em><code><b>export const</b> {folderNames[index].replace('-', '_')} = {'{'}</code></span>
          {category.items.map((item, itemIndex) => (
            <span key={item}>
              <em>{String(itemIndex + 2).padStart(2, '0')}</em>
              <code><i>{`  skill_${itemIndex + 1}`}</i>: <mark>'{item}'</mark>{itemIndex < category.items.length - 1 ? ',' : ''}</code>
            </span>
          ))}
          <span><em>{String(category.items.length + 2).padStart(2, '0')}</em><code>{'}'}</code></span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function SkillExplorer({ t }) {
  const [active, setActive] = useState(0)
  const category = t.skills.categories[active]

  return (
    <div className="skills-explorer">
      <div className="skills-explorer-bar">
        <div><i /><i /><i /></div>
        <span>baptiste-os — skills</span>
        <strong>main</strong>
      </div>
      <div className="skills-explorer-layout">
        <aside className="skills-tree" aria-label={t.skills.title}>
          <div className="skills-root"><FolderOpen size={17} />baptiste/</div>
          {t.skills.categories.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles
            return (
              <button
                key={item.name}
                type="button"
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
              >
                <ChevronRight size={14} />
                {active === index ? <FolderOpen size={17} /> : <Folder size={17} />}
                <Icon size={16} />
                <span>{folderNames[index]}</span>
              </button>
            )
          })}
        </aside>
        <div className="skills-editor">
          <div className="skills-tabsline">
            <span><span className="skills-js">JS</span>{folderNames[active]}.js<i /></span>
          </div>
          <SkillCode category={category} index={active} itemLabel={t.skills.itemLabel} />
        </div>
      </div>
    </div>
  )
}
