"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/three/scene"), {
  ssr: false,
})

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(hasWebGL())
  }, [])

  if (!enabled) {
    return (
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-black via-black/50 to-black" />
    )
  }

  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">
      <Scene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
    </div>
  )
}