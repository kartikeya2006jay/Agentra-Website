"use client"

import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

export default function Camera() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 6)
  }, [camera])

  return null
}