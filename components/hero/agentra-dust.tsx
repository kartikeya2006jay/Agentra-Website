"use client"

import { useEffect, useRef } from "react"

export default function AgentraDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()

    const w = canvas.width
    const h = canvas.height

    const text = "AGENTRA"
    const particles: {
      x: number
      y: number
      ox: number
      oy: number
      vx: number
      vy: number
    }[] = []

    // IMPORTANT: use system font to avoid font-load race
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "900 220px Arial"

    ctx.fillText(text, w / 2, h / 2)

    const imageData = ctx.getImageData(0, 0, w, h).data
    ctx.clearRect(0, 0, w, h)

    for (let y = 0; y < h; y += 5) {
      for (let x = 0; x < w; x += 5) {
        const i = (y * w + x) * 4
        if (imageData[i + 3] > 150) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    let mx = -9999
    let my = -9999

    function onMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("resize", resize)

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255,255,255,0.06)"

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          p.vx += dx * 0.02
          p.vy += dy * 0.02
        }

        p.vx *= 0.9
        p.vy *= 0.9

        p.x += p.vx + (p.ox - p.x) * 0.08
        p.y += p.vy + (p.oy - p.y) * 0.08

        ctx.fillRect(p.x, p.y, 1.4, 1.4)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  )
}