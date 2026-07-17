import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

export default function TerminalIntro({ lines }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(reduceMotion ? lines.length : 1)

  useEffect(() => {
    if (reduceMotion || visible >= lines.length) return undefined
    const timeout = window.setTimeout(() => setVisible((value) => value + 1), 430)
    return () => window.clearTimeout(timeout)
  }, [lines.length, reduceMotion, visible])

  return (
    <div className="terminal-intro" aria-label={lines.join(', ')}>
      <div className="terminal-dots"><i /><i /><i /></div>
      <div className="terminal-lines">
        {lines.slice(0, visible).map((line, index) => (
          <span key={line} className={index === visible - 1 ? 'is-active' : ''}>
            <b>&gt;</b>{line}
          </span>
        ))}
      </div>
    </div>
  )
}
