"use client"

import { Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function FloatingObjects() {
  const mesh = useRef<THREE.Mesh | null>(null)

  // Assign material ONCE, imperatively
  useEffect(() => {
    if (!mesh.current) return

    mesh.current.material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
    })
  }, [])

  useFrame(({ clock, invalidate }) => {
    if (!mesh.current) return

    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.2
    mesh.current.position.y = Math.sin(t) * 0.2
    invalidate()
  })

  return <Sphere args={[1, 24, 24]} ref={mesh} />
}