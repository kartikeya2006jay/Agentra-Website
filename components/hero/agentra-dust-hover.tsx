"use client"

import { useEffect, useRef } from "react"

type P = {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
  size: number
  opacity: number
  stuck: boolean
  color: string
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
    const dustColors = [
      'rgba(220,220,220,',
      'rgba(200,200,200,',
      'rgba(180,180,180,',
      'rgba(210,210,210,'
    ]

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(160,160,160,0.85)"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "900 280px Arial, sans-serif"
    ctx.fillText("AGENTRA", canvas.width / 2, canvas.height / 2)

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < canvas.height; y += 3.5) {
      for (let x = 0; x < canvas.width; x += 3.5) {
        const i = (y * canvas.width + x) * 4
        if (data[i + 3] > 100) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2.2 + 0.8,
            opacity: Math.random() * 0.12 + 0.08,
            stuck: Math.random() > 0.4,
            color: dustColors[Math.floor(Math.random() * dustColors.length)]
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

      for (const p of particles) {
        if (p.stuck && Math.random() > 0.996) {
          p.stuck = false
        }

        if (p.stuck) {
          const pulse = 0.12 + Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.03
          ctx.fillStyle = p.color + pulse + ')'
          ctx.fillRect(p.x, p.y, p.size, p.size)
          continue
        }

        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < 130) {
          const force = (130 - d) * 0.0008
          p.vx += dx * force
          p.vy += dy * force
        }

        p.vx *= 0.90
        p.vy *= 0.90

        const driftX = Math.sin(Date.now() * 0.0004 + p.ox * 0.001) * 0.2
        const driftY = Math.cos(Date.now() * 0.0003 + p.oy * 0.001) * 0.2

        p.x += p.vx + (p.ox - p.x) * 0.015 + driftX
        p.y += p.vy + (p.oy - p.y) * 0.015 + driftY

        const distanceFromOriginal = Math.sqrt(
          Math.pow(p.x - p.ox, 2) + 
          Math.pow(p.y - p.oy, 2)
        )

        const opacity = Math.max(0.05, p.opacity - distanceFromOriginal * 0.0002)
        
        if (distanceFromOriginal < 15 && Math.abs(p.vx) < 0.3 && Math.abs(p.vy) < 0.3 && Math.random() > 0.997) {
          p.stuck = true
          p.vx = 0
          p.vy = 0
        }

        const size = p.size + Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.2
        
        ctx.fillStyle = p.color + opacity + ')'
        ctx.fillRect(p.x, p.y, size, size)
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
      className="pointer-events-none absolute inset-0 z-0 opacity-25"
    />
  )
}