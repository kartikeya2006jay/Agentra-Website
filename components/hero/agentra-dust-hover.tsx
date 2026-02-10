"use client"

import { useEffect, useRef } from "react"

type P = {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
}

export default function AgentraDustHover() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: P[] = []

    // draw text once to generate particles
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#a0a0a0"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "900 300px Arial"
    ctx.fillText("AGENTRA", canvas.width / 2, canvas.height / 2)

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < canvas.height; y += 6) {
      for (let x = 0; x < canvas.width; x += 6) {
        const i = (y * canvas.width + x) * 4
        if (data[i + 3] > 120) {
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

    let mx = -1000
    let my = -1000

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    window.addEventListener("mousemove", onMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(160,160,160,0.12)"

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < 120) {
          p.vx += dx * 0.015
          p.vy += dy * 0.015
        }

        p.vx *= 0.9
        p.vy *= 0.9

        p.x += p.vx + (p.ox - p.x) * 0.08
        p.y += p.vy + (p.oy - p.y) * 0.08

        ctx.fillRect(p.x, p.y, 1.3, 1.3)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}