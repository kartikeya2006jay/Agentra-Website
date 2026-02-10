"use client"

import { useEffect, useRef } from "react"
import HeroText from "./hero-text"

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current!
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      el.style.transform = `translate(${x}px, ${y}px) rotate(-8deg) scale(1)`
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* BACKGROUND BRAND */}
      <div className="absolute inset-0 flex items-center justify-center px-16">
        <div
          ref={bgRef}
          className="
            select-none
            whitespace-nowrap
            font-extrabold
            tracking-tight
            text-[rgb(160,160,160)]
            opacity-[0.12]
            transition-transform duration-300 ease-out
            scale-[0.85]
            origin-center
          "
          style={{
            fontSize: "clamp(180px, 22vw, 360px)",
          }}
        >
          AGENTRA
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full">
        <HeroText />
      </div>
    </section>
  )
}