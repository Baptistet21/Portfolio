import { useMemo, useState } from 'react'
import {
  Braces,
  ChevronRight,
  Circle,
  Database,
  FileCode2,
  FileText,
  FolderOpen,
  MapPin,
  Network,
  TerminalSquare,
  Wrench,
} from 'lucide-react'

const fileIcons = {
  overview: FileText,
  development: Braces,
  api: Network,
  stack: Database,
  maintenance: Wrench,
}

function createEditorFiles(t, mlog) {
  const workflow = t.experience.workflow
  const stack = t.experience.mlogSkillGroups

  return [
    {
      id: 'overview',
      name: 'README.md',
      language: 'MARKDOWN',
      description: t.experience.mlogEditor.overviewDescription,
      content: [
        `# ${mlog.company} — ${mlog.role}`,
        '',
        mlog.description,
        '',
        `## ${t.experience.mlogMissionsTitle}`,
        ...mlog.bullets.map((bullet) => `- ${bullet}`),
      ].join('\n'),
    },
    {
      id: 'development',
      name: workflow[1].file,
      language: workflow[1].language,
      description: workflow[1].explanation,
      content: [
        `/* ${workflow[1].objective} */`,
        '',
        workflow[1].code,
        '',
        `/* ${t.experience.previewLabels.result}: ${workflow[1].result} */`,
      ].join('\n'),
    },
    {
      id: 'api',
      name: workflow[2].file,
      language: workflow[2].language,
      description: workflow[2].explanation,
      content: [
        `# ${workflow[2].objective}`,
        '',
        workflow[2].code,
        '',
        `# ${t.experience.previewLabels.result}: ${workflow[2].result}`,
      ].join('\n'),
    },
    {
      id: 'stack',
      name: 'stack.json',
      language: 'JSON',
      description: t.experience.mlogEditor.stackDescription,
      content: JSON.stringify(
        {
          role: mlog.role,
          environment: 'MLOG',
          skills: Object.fromEntries(stack.map((group) => [group.title, group.items.split(' · ')])),
        },
        null,
        2,
      ),
    },
    {
      id: 'maintenance',
      name: workflow[3].file,
      language: workflow[3].language,
      description: workflow[3].explanation,
      content: [
        `[${t.experience.mlogEditor.statusLabel}] ${workflow[3].objective}`,
        '',
        workflow[3].code,
        '',
        `→ ${workflow[3].result}`,
      ].join('\n'),
    },
  ]
}

export default function MlogSpotlight({ t }) {
  const mlog = t.experience.items[0]
  const files = useMemo(() => createEditorFiles(t, mlog), [t, mlog])
  const [activeFileId, setActiveFileId] = useState('overview')
  const activeFile = files.find((file) => file.id === activeFileId) ?? files[0]
  const ActiveIcon = fileIcons[activeFile.id] ?? FileCode2

  return (
    <article className="mlog-simple mlog-editor-card">
      <header className="mlog-simple-header">
        <div className="mlog-simple-meta">
          <span className="mlog-current">{t.experience.mainExperience}</span>
          <span>{mlog.period}</span>
        </div>

        <div className="mlog-simple-title">
          <div>
            <h3>{mlog.company}</h3>
            <h4>{mlog.role}</h4>
          </div>
          <span className="mlog-location"><MapPin size={15} />{mlog.location}</span>
        </div>

        <p>{mlog.description}</p>
      </header>

      <section className="mlog-ide" aria-label={t.experience.mlogEditor.ariaLabel}>
        <div className="mlog-ide-topbar">
          <div className="mlog-window-dots" aria-hidden="true">
            <Circle />
            <Circle />
            <Circle />
          </div>
          <div className="mlog-workspace-name">
            <FolderOpen size={15} />
            <span>mlog-workspace</span>
          </div>
          <div className="mlog-ide-status">
            <span />
            {t.experience.mlogEditor.ready}
          </div>
        </div>

        <div className="mlog-ide-body">
          <aside className="mlog-file-explorer" aria-label={t.experience.mlogEditor.explorerLabel}>
            <div className="mlog-explorer-heading">
              <span>{t.experience.mlogEditor.explorerLabel}</span>
              <ChevronRight size={14} />
            </div>

            <div className="mlog-file-list">
              {files.map((file) => {
                const Icon = fileIcons[file.id] ?? FileCode2
                const isActive = file.id === activeFile.id
                return (
                  <button
                    key={file.id}
                    type="button"
                    className={isActive ? 'active' : ''}
                    onClick={() => setActiveFileId(file.id)}
                    aria-pressed={isActive}
                  >
                    <Icon size={15} />
                    <span>{file.name}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <div className="mlog-editor-pane">
            <div className="mlog-editor-tabs">
              <div className="active">
                <ActiveIcon size={14} />
                <span>{activeFile.name}</span>
                <small>{activeFile.language}</small>
              </div>
            </div>

            <div className="mlog-editor-content">
              <div className="mlog-line-numbers" aria-hidden="true">
                {activeFile.content.split('\n').map((_, index) => (
                  <span key={`${activeFile.id}-${index}`}>{index + 1}</span>
                ))}
              </div>
              <pre><code>{activeFile.content}</code></pre>
            </div>

            <div className="mlog-editor-explanation">
              <TerminalSquare size={16} />
              <p>{activeFile.description}</p>
            </div>
          </div>
        </div>

        <div className="mlog-statusbar">
          <span>main</span>
          <span>{activeFile.language}</span>
          <span>UTF-8</span>
          <span>{t.experience.mlogEditor.statusText}</span>
        </div>
      </section>
    </article>
  )
}
