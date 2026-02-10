"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import FloatingObjects from "@/components/three/floating-objects"
import Lights from "@/components/three/lights"

export default function Scene() {
  if (typeof window === "undefined") return null

  return (
    <Canvas
      dpr={1}
      frameloop="demand"
      gl={{
        antialias: false,
        powerPreference: "low-power",
      }}
      camera={{ position: [0, 0, 5], fov: 55 }}
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <Lights />
        <FloatingObjects />
      </Suspense>
    </Canvas>
  )
}