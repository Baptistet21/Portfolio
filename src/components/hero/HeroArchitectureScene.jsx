import { ContactShadows, Float, Line, RoundedBox, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const nodeColor = {
  frontend: '#22d3ee',
  api: '#8b5cf6',
  data: '#34d399',
  deploy: '#60a5fa',
}

function ScreenNode({ position }) {
  return (
    <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.22}>
      <group position={position} rotation={[0.08, -0.35, -0.05]}>
        <RoundedBox args={[1.55, 1.02, 0.16]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial color="#0f172a" roughness={0.24} metalness={0.42} clearcoat={0.7} />
        </RoundedBox>
        <mesh position={[0, 0, 0.091]}>
          <planeGeometry args={[1.31, 0.78]} />
          <meshBasicMaterial color="#071827" />
        </mesh>
        {[0.22, 0.02, -0.18].map((y, index) => (
          <mesh key={y} position={[-0.14 + index * 0.05, y, 0.101]}>
            <planeGeometry args={[0.76 - index * 0.12, 0.045]} />
            <meshBasicMaterial color={index === 1 ? '#8b5cf6' : '#22d3ee'} transparent opacity={0.8 - index * 0.12} />
          </mesh>
        ))}
        <mesh position={[0, -0.64, -0.02]}>
          <boxGeometry args={[0.16, 0.3, 0.12]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.82, -0.02]}>
          <boxGeometry args={[0.65, 0.06, 0.28]} />
          <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.28} />
        </mesh>
      </group>
    </Float>
  )
}

function ServerNode({ position }) {
  return (
    <Float speed={1.05} rotationIntensity={0.08} floatIntensity={0.18}>
      <group position={position} rotation={[0.05, 0.28, 0.02]}>
        {[0.3, 0, -0.3].map((y, index) => (
          <RoundedBox key={y} position={[0, y, 0]} args={[1.02, 0.22, 0.62]} radius={0.055} smoothness={4}>
            <meshPhysicalMaterial color="#111827" roughness={0.28} metalness={0.48} clearcoat={0.55} />
            <mesh position={[-0.35, 0, 0.316]}>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshBasicMaterial color={index === 1 ? '#34d399' : '#22d3ee'} />
            </mesh>
          </RoundedBox>
        ))}
      </group>
    </Float>
  )
}

function DatabaseNode({ position }) {
  return (
    <Float speed={1.15} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position} rotation={[0.08, -0.12, -0.04]}>
        <mesh>
          <cylinderGeometry args={[0.48, 0.48, 0.84, 48]} />
          <meshPhysicalMaterial color="#0b1f1b" roughness={0.3} metalness={0.3} clearcoat={0.65} />
        </mesh>
        {[-0.27, 0, 0.27].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.485, 0.018, 12, 48]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function DeployNode({ position }) {
  const cubes = [
    [-0.28, 0.22, 0],
    [0.28, 0.22, 0],
    [-0.28, -0.26, 0],
    [0.28, -0.26, 0],
  ]

  return (
    <Float speed={1.3} rotationIntensity={0.14} floatIntensity={0.23}>
      <group position={position} rotation={[0.12, 0.35, 0.08]}>
        {cubes.map((cube, index) => (
          <RoundedBox key={cube.join('-')} position={cube} args={[0.42, 0.42, 0.42]} radius={0.06} smoothness={4}>
            <meshPhysicalMaterial
              color={index === 0 ? '#1d4ed8' : '#0f172a'}
              roughness={0.28}
              metalness={0.35}
              clearcoat={0.55}
            />
          </RoundedBox>
        ))}
      </group>
    </Float>
  )
}

function ApiNode({ position }) {
  return (
    <Float speed={1.38} rotationIntensity={0.2} floatIntensity={0.28}>
      <group position={position} rotation={[0.25, 0.2, 0.1]}>
        <mesh>
          <octahedronGeometry args={[0.55, 0]} />
          <meshPhysicalMaterial color="#312e81" roughness={0.2} metalness={0.35} clearcoat={0.8} />
        </mesh>
        <mesh scale={0.72}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

function DataPulse({ curve, color, offset = 0, speed = 0.12 }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const point = curve.getPoint((clock.elapsedTime * speed + offset) % 1)
    ref.current?.position.copy(point)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 20, 20]} />
      <meshBasicMaterial color={color} toneMapped={false} />
      <pointLight color={color} intensity={0.85} distance={1.5} />
    </mesh>
  )
}

export default function HeroArchitectureScene({ theme = 'dark' }) {
  const systemRef = useRef()
  const connections = useMemo(() => {
    const frontend = new THREE.Vector3(-1.72, 0.92, 0)
    const api = new THREE.Vector3(0.05, 1.25, 0.18)
    const server = new THREE.Vector3(1.55, 0.52, -0.1)
    const data = new THREE.Vector3(1.5, -1.02, 0.04)
    const deploy = new THREE.Vector3(-0.45, -1.25, -0.05)
    return [
      { points: [frontend, new THREE.Vector3(-0.75, 1.45, 0.2), api], color: nodeColor.frontend },
      { points: [api, new THREE.Vector3(0.92, 1.25, 0.1), server], color: nodeColor.api },
      { points: [server, new THREE.Vector3(2, -0.1, 0.2), data], color: nodeColor.data },
      { points: [data, new THREE.Vector3(0.7, -1.65, 0.08), deploy], color: nodeColor.deploy },
      { points: [deploy, new THREE.Vector3(-1.45, -0.35, 0.12), frontend], color: nodeColor.frontend },
    ].map((connection) => ({
      ...connection,
      curve: new THREE.CatmullRomCurve3(connection.points),
    }))
  }, [])

  useFrame(({ pointer }) => {
    if (!systemRef.current) return
    systemRef.current.rotation.y = THREE.MathUtils.lerp(systemRef.current.rotation.y, pointer.x * 0.075, 0.04)
    systemRef.current.rotation.x = THREE.MathUtils.lerp(systemRef.current.rotation.x, -pointer.y * 0.045, 0.04)
  })

  const lightMode = theme === 'light'

  return (
    <group ref={systemRef} position={[0, 0.05, 0]} scale={0.92}>
      <ambientLight intensity={lightMode ? 1.35 : 0.68} />
      <directionalLight position={[4, 5, 4]} intensity={lightMode ? 2.5 : 1.8} color="#dbeafe" />
      <pointLight position={[-3, 1, 3]} intensity={3.2} color="#22d3ee" distance={8} />
      <pointLight position={[2, 2, 2]} intensity={2.3} color="#8b5cf6" distance={7} />

      {connections.map(({ curve, color }, index) => (
        <group key={`${color}-${index}`}>
          <Line points={curve.getPoints(46)} color={color} lineWidth={1.15} transparent opacity={0.5} />
          <DataPulse curve={curve} color={color} offset={index * 0.17} speed={0.09 + index * 0.008} />
        </group>
      ))}

      <ScreenNode position={[-1.72, 0.92, 0]} />
      <ApiNode position={[0.05, 1.25, 0.18]} />
      <ServerNode position={[1.55, 0.52, -0.1]} />
      <DatabaseNode position={[1.5, -1.02, 0.04]} />
      <DeployNode position={[-0.45, -1.25, -0.05]} />

      <Sparkles count={28} scale={[5.5, 4.4, 2]} size={1.5} speed={0.22} opacity={0.4} color="#94a3b8" />
      <ContactShadows position={[0, -1.82, 0]} opacity={lightMode ? 0.16 : 0.35} scale={5.5} blur={2.8} far={4} />
    </group>
  )
}
