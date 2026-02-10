"use client"

import { useEffect } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"

export default function Lights() {
  const { scene } = useThree()

  useEffect(() => {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    const directional = new THREE.DirectionalLight(0xffffff, 1)
    const point = new THREE.PointLight(0xffffff, 0.5)

    directional.position.set(5, 5, 5)
    point.position.set(-5, -5, -5)

    scene.add(ambient)
    scene.add(directional)
    scene.add(point)

    return () => {
      scene.remove(ambient)
      scene.remove(directional)
      scene.remove(point)
    }
  }, [scene])

  return null
}