import { Canvas } from '@react-three/fiber'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Suspense, lazy } from 'react'

const HeroArchitectureScene = lazy(() => import('./HeroArchitectureScene.jsx'))

export default function HeroVisual({ t, theme }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), { stiffness: 140, damping: 20 })
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 20 })

  const onPointerMove = (event) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className="hero-os-visual"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-canvas-shell" aria-hidden="true">
        <Suspense fallback={<div className="hero-scene-fallback" />}>
          <Canvas
            camera={{ position: [0, 0, 6.3], fov: 42 }}
            dpr={[1, 1.45]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <HeroArchitectureScene theme={theme} />
          </Canvas>
        </Suspense>
      </div>

      <motion.figure
        className="hero-os-photo"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <div className="hero-os-photo-border">
          <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Baptiste Tellier" />
          <div className="hero-os-photo-shade" />
          <figcaption>
            <span><i />{t.hero.photoStatus}</span>
            <strong>Baptiste Tellier</strong>
            <small>{t.hero.photoCaption}</small>
          </figcaption>
        </div>
      </motion.figure>

    </motion.div>
  )
}
