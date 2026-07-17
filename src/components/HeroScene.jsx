import { Canvas, useFrame } from '@react-three/fiber'
import {
  AdaptiveDpr,
  ContactShadows,
  Float,
  Html,
  Line,
  PresentationControls,
  RoundedBox,
} from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const colors = {
  graphite: '#0b1020',
  graphiteSoft: '#151d31',
  graphiteLight: '#26324d',
  cyan: '#22d3ee',
  blue: '#60a5fa',
  violet: '#8b5cf6',
  green: '#34d399',
  white: '#f8fafc',
}

function StatusLight({ position, color = colors.green, scale = 1 }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.035, 18, 18]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.4} toneMapped={false} />
    </mesh>
  )
}

function CodeEditorScreen() {
  return (
    <Html transform position={[0, 0.13, 0.071]} distanceFactor={4.42} center pointerEvents="none">
      <div className="dev-screen" aria-hidden="true">
        <div className="dev-screen-topbar">
          <span className="window-dot red" />
          <span className="window-dot amber" />
          <span className="window-dot green" />
          <strong>portfolio / HeroScene.jsx</strong>
        </div>
        <div className="dev-screen-body">
          <aside>
            <span className="tree-active">src</span>
            <span>components</span>
            <span>api</span>
            <span>services</span>
            <span>docker</span>
          </aside>
          <div className="dev-code">
            <span><i className="ln">01</i><b className="purple">const</b> developer = {'{'}</span>
            <span><i className="ln">02</i>&nbsp;&nbsp;frontend: <b className="cyan">'React'</b>,</span>
            <span><i className="ln">03</i>&nbsp;&nbsp;backend: <b className="cyan">'Spring Boot'</b>,</span>
            <span><i className="ln">04</i>&nbsp;&nbsp;business: <b className="cyan">'Progress ABL'</b>,</span>
            <span><i className="ln">05</i>&nbsp;&nbsp;deploy: <b className="cyan">'Docker'</b></span>
            <span><i className="ln">06</i>{'}'}</span>
            <span><i className="ln">07</i></span>
            <span><i className="ln">08</i><b className="green">build</b>(developer)</span>
          </div>
        </div>
        <div className="dev-terminal">
          <span>$ pnpm build</span>
          <strong>✓ production build ready</strong>
        </div>
      </div>
    </Html>
  )
}

function Monitor() {
  return (
    <group position={[0, 0.72, 0]}>
      <RoundedBox args={[3.55, 2.15, 0.16]} radius={0.14} smoothness={8} castShadow>
        <meshPhysicalMaterial color={colors.graphite} roughness={0.28} metalness={0.66} clearcoat={0.75} />
      </RoundedBox>
      <RoundedBox args={[3.23, 1.83, 0.045]} radius={0.075} smoothness={6} position={[0, 0.03, 0.102]}>
        <meshStandardMaterial color="#050916" roughness={0.34} metalness={0.22} />
      </RoundedBox>
      <CodeEditorScreen />

      <mesh position={[0, -1.25, -0.01]} castShadow>
        <boxGeometry args={[0.22, 0.78, 0.18]} />
        <meshStandardMaterial color={colors.graphiteLight} roughness={0.25} metalness={0.75} />
      </mesh>
      <RoundedBox args={[1.35, 0.13, 0.66]} radius={0.08} smoothness={6} position={[0, -1.65, 0]} castShadow>
        <meshStandardMaterial color={colors.graphiteLight} roughness={0.24} metalness={0.76} />
      </RoundedBox>
      <StatusLight position={[1.48, -0.84, 0.105]} color={colors.green} scale={0.85} />
    </group>
  )
}

function Keyboard() {
  const keys = useMemo(() => {
    const items = []
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 11; column += 1) {
        items.push({
          key: `${row}-${column}`,
          position: [-1.35 + column * 0.27, 0.03, -0.38 + row * 0.21],
        })
      }
    }
    return items
  }, [])

  return (
    <group position={[-0.35, -1.16, 1.2]} rotation={[-0.07, 0, 0]}>
      <RoundedBox args={[3.2, 0.18, 1.18]} radius={0.12} smoothness={7} castShadow>
        <meshStandardMaterial color={colors.graphiteSoft} roughness={0.36} metalness={0.72} />
      </RoundedBox>
      {keys.map(({ key, position }) => (
        <RoundedBox key={key} args={[0.19, 0.055, 0.13]} radius={0.025} smoothness={3} position={position}>
          <meshStandardMaterial color="#28344d" roughness={0.5} metalness={0.35} />
        </RoundedBox>
      ))}
      <RoundedBox args={[1.15, 0.055, 0.13]} radius={0.025} smoothness={3} position={[0.02, 0.03, 0.25]}>
        <meshStandardMaterial color="#32415e" roughness={0.5} metalness={0.35} />
      </RoundedBox>
    </group>
  )
}

function ServerStack() {
  return (
    <Float speed={0.75} floatIntensity={0.12} rotationIntensity={0.04}>
      <group position={[-2.45, -0.68, 0.48]} rotation={[0, 0.18, 0]}>
        {[0, 0.43, 0.86].map((y, index) => (
          <group key={y} position={[0, y, 0]}>
            <RoundedBox args={[1.15, 0.34, 0.74]} radius={0.08} smoothness={5} castShadow>
              <meshPhysicalMaterial color={index === 2 ? '#17213a' : '#111a2d'} roughness={0.32} metalness={0.7} clearcoat={0.45} />
            </RoundedBox>
            <StatusLight position={[-0.42, 0, 0.385]} color={index === 1 ? colors.cyan : colors.green} scale={0.85} />
            <mesh position={[0.1, 0, 0.385]}>
              <boxGeometry args={[0.55, 0.035, 0.015]} />
              <meshStandardMaterial color="#475569" emissive="#334155" emissiveIntensity={0.25} />
            </mesh>
          </group>
        ))}
        <Html transform center position={[0, -0.36, 0.42]} distanceFactor={6.4} pointerEvents="none">
          <div className="scene-caption"><strong>BACKEND</strong><span>API · Spring Boot</span></div>
        </Html>
      </group>
    </Float>
  )
}

function DatabaseCore() {
  return (
    <Float speed={0.8} floatIntensity={0.14} rotationIntensity={0.05}>
      <group position={[2.52, -0.42, 0.56]} rotation={[0, -0.16, 0]}>
        {[0, 0.24, 0.48, 0.72].map((y, index) => (
          <group key={y} position={[0, y, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.56, 0.56, 0.22, 48]} />
              <meshPhysicalMaterial
                color={index === 3 ? '#18344a' : '#13283a'}
                roughness={0.25}
                metalness={0.6}
                clearcoat={0.68}
              />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <torusGeometry args={[0.49, 0.018, 10, 64]} />
              <meshStandardMaterial color={colors.cyan} emissive={colors.cyan} emissiveIntensity={1.4} toneMapped={false} />
            </mesh>
          </group>
        ))}
        <Html transform center position={[0, -0.34, 0.4]} distanceFactor={6.4} pointerEvents="none">
          <div className="scene-caption"><strong>DATA</strong><span>SQL · PostgreSQL</span></div>
        </Html>
      </group>
    </Float>
  )
}

function DeploymentModule() {
  return (
    <Float speed={0.9} floatIntensity={0.16} rotationIntensity={0.06}>
      <group position={[2.2, 1.62, -0.25]} rotation={[0.12, -0.26, -0.03]}>
        <RoundedBox args={[1.36, 0.78, 0.2]} radius={0.14} smoothness={7} castShadow>
          <meshPhysicalMaterial color="#10182a" roughness={0.22} metalness={0.55} clearcoat={0.8} transparent opacity={0.96} />
        </RoundedBox>
        <group position={[-0.37, 0, 0.14]}>
          {[[-0.18, 0.14], [0.04, 0.14], [-0.18, -0.08], [0.04, -0.08], [0.26, -0.08]].map(([x, y], index) => (
            <RoundedBox key={`${x}-${y}`} args={[0.18, 0.18, 0.07]} radius={0.03} smoothness={3} position={[x, y, 0]}>
              <meshStandardMaterial color={index === 4 ? colors.cyan : '#334155'} emissive={index === 4 ? colors.cyan : '#000000'} emissiveIntensity={index === 4 ? 1.8 : 0} />
            </RoundedBox>
          ))}
        </group>
        <Html transform center position={[0.38, 0, 0.145]} distanceFactor={6.7} pointerEvents="none">
          <div className="scene-module-label"><strong>DEPLOY</strong><span>Docker</span></div>
        </Html>
      </group>
    </Float>
  )
}

function BusinessAppPanel() {
  return (
    <Float speed={0.82} floatIntensity={0.15} rotationIntensity={0.045}>
      <group position={[-2.02, 1.65, -0.18]} rotation={[0.1, 0.28, 0.02]}>
        <RoundedBox args={[1.55, 0.92, 0.16]} radius={0.14} smoothness={7} castShadow>
          <meshPhysicalMaterial color="#10182a" roughness={0.22} metalness={0.48} clearcoat={0.82} transparent opacity={0.97} />
        </RoundedBox>
        <Html transform center position={[0, 0, 0.105]} distanceFactor={6.25} pointerEvents="none">
          <div className="business-screen" aria-hidden="true">
            <div className="business-title"><span />MLOG · APP MÉTIER</div>
            <div className="business-bars"><i /><i /><i /></div>
            <div className="business-row"><span>Flux</span><b>98%</b></div>
            <div className="business-row"><span>Services</span><b>OK</b></div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function MovingPulse({ curve, color, speed, offset }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const progress = (state.clock.elapsedTime * speed + offset) % 1
    ref.current.position.copy(curve.getPointAt(progress))
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 18, 18]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
    </mesh>
  )
}

function DataNetwork() {
  const connections = useMemo(() => {
    const definitions = [
      { color: colors.blue, points: [[-1.35, 0.85, -0.08], [-1.95, 1.1, -0.02], [-2.1, 1.45, -0.05]] },
      { color: colors.green, points: [[-1.32, 0.1, -0.03], [-1.92, -0.02, 0.12], [-2.36, 0.05, 0.28]] },
      { color: colors.cyan, points: [[1.34, 0.08, -0.03], [1.88, -0.02, 0.12], [2.34, 0.22, 0.26]] },
      { color: colors.violet, points: [[1.28, 0.88, -0.08], [1.8, 1.14, -0.05], [2.08, 1.46, -0.12]] },
    ]

    return definitions.map((item) => ({
      ...item,
      vectors: item.points.map((point) => new THREE.Vector3(...point)),
      curve: new THREE.CatmullRomCurve3(item.points.map((point) => new THREE.Vector3(...point))),
    }))
  }, [])

  return (
    <group position={[0, 0.72, 0]}>
      {connections.map((connection, index) => (
        <group key={connection.color}>
          <Line points={connection.vectors} color={connection.color} lineWidth={1.05} transparent opacity={0.58} />
          <MovingPulse curve={connection.curve} color={connection.color} speed={0.11 + index * 0.012} offset={index * 0.18} />
        </group>
      ))}
    </group>
  )
}

function Workstation() {
  const root = useRef()

  useFrame((state) => {
    if (!root.current) return
    root.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.025
  })

  return (
    <group ref={root} rotation={[0.02, -0.09, 0]} scale={0.86}>
      <RoundedBox args={[5.9, 0.2, 3.45]} radius={0.2} smoothness={9} position={[0, -1.72, 0.48]} receiveShadow castShadow>
        <meshPhysicalMaterial color="#10182a" roughness={0.32} metalness={0.62} clearcoat={0.65} />
      </RoundedBox>
      <RoundedBox args={[5.35, 0.03, 2.92]} radius={0.18} smoothness={7} position={[0, -1.6, 0.48]}>
        <meshStandardMaterial color="#1c2940" roughness={0.68} metalness={0.2} />
      </RoundedBox>

      <Monitor />
      <Keyboard />
      <ServerStack />
      <DatabaseCore />
      <DeploymentModule />
      <BusinessAppPanel />
      <DataNetwork />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      shadows
      camera={{ position: [0.15, 1.15, 8.7], fov: 38 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4.5, 6.5, 6]} intensity={3.2} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-4, 2.5, 3.8]} intensity={18} color={colors.violet} distance={11} />
        <pointLight position={[4, 0.5, 4]} intensity={17} color={colors.cyan} distance={11} />
        <spotLight position={[0, 7, 2]} intensity={4.5} angle={0.45} penumbra={0.8} color="#dbeafe" castShadow />

        <PresentationControls
          global
          cursor
          snap={{ mass: 1.5, tension: 180 }}
          speed={1.1}
          zoom={0.92}
          polar={[-0.12, 0.16]}
          azimuth={[-0.28, 0.28]}
        >
          <Workstation />
        </PresentationControls>

        <ContactShadows position={[0, -2.05, 0.45]} opacity={0.42} scale={8.5} blur={2.5} far={4.2} color="#020617" />
        <AdaptiveDpr />
      </Suspense>
    </Canvas>
  )
}
