"use client"

import { Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function FloatingObjects() {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, invalidate }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.2
    mesh.current.position.y = Math.sin(t) * 0.2
    invalidate()
  })

  return (
    <Sphere args={[1, 24, 24]} ref={mesh}>
      <meshBasicMaterial color="#ffffff" />
    </Sphere>
  )
}