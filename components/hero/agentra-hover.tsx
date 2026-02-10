"use client"

import { useEffect, useRef } from "react"

export default function AgentraHover() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    function move(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.transform = `rotate(-12deg) translate(${x}px, ${y}px)`
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      ref={ref}
      className="
        absolute inset-0
        flex items-center justify-center
        pointer-events-none
        transition-transform duration-300 ease-out
      "
    >
      <div
        className="
          text-[30vw]
          font-extrabold
          tracking-tight
          text-white/5
          -rotate-12
          blur-[0.3px]
        "
      >
        AGENTRA
      </div>
    </div>
  )
}