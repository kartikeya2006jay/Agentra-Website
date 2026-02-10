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
    window.addEventListener("resize", resize)

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
      size: number
      opacity: number
      stuck: boolean
    }[] = []

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "rgba(160,160,160,0.9)"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "900 320px Arial, sans-serif"
    ctx.fillText(text, w / 2, h / 2)

    const imageData = ctx.getImageData(0, 0, w, h).data
    ctx.clearRect(0, 0, w, h)

    for (let y = 0; y < h; y += 4) {
      for (let x = 0; x < w; x += 4) {
        const i = (y * w + x) * 4
        if (imageData[i + 3] > 120) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.15 + 0.1,
            stuck: Math.random() > 0.3
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

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(200,200,200,0.12)"

      for (const p of particles) {
        if (p.stuck && Math.random() > 0.997) {
          p.stuck = false
        }

        if (p.stuck) {
          ctx.fillStyle = `rgba(220,220,220,${0.15 + Math.sin(Date.now() * 0.002) * 0.05})`
          ctx.fillRect(p.x, p.y, p.size, p.size)
          continue
        }

        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const force = (150 - dist) * 0.0005
          p.vx += dx * force
          p.vy += dy * force
        }

        p.vx *= 0.92
        p.vy *= 0.92

        const returnX = (p.ox - p.x) * 0.02
        const returnY = (p.oy - p.y) * 0.02

        p.x += p.vx + returnX + (Math.random() - 0.5) * 0.3
        p.y += p.vy + returnY + (Math.random() - 0.5) * 0.3

        const distanceFromOriginal = Math.sqrt(
          Math.pow(p.x - p.ox, 2) + 
          Math.pow(p.y - p.oy, 2)
        )

        const opacity = Math.max(0.05, 0.15 - distanceFromOriginal * 0.0003)
        
        if (distanceFromOriginal < 10 && Math.abs(p.vx) < 0.5 && Math.abs(p.vy) < 0.5 && Math.random() > 0.998) {
          p.stuck = true
          p.vx = 0
          p.vy = 0
        }

        ctx.fillStyle = `rgba(200,200,200,${opacity})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
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
      className="absolute inset-0 pointer-events-none opacity-20"
    />
  )
}