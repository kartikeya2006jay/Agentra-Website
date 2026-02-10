"use client"
import AgentraDustHover from "./agentra-dust-hover"
import { useEffect, useRef, useState } from "react"
import HeroText from "./hero-text"

interface DustParticle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  blur: number
  color: string
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<DustParticle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const particleCount = 200
    const initialParticles: DustParticle[] = []
    
    const dustColors = [
      'rgb(180,160,140)',
      'rgb(190,170,150)',
      'rgb(200,180,160)',
      'rgb(170,150,130)',
      'rgb(160,140,120)'
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const color = dustColors[Math.floor(Math.random() * dustColors.length)]
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 1,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08 - 0.02,
        opacity: Math.random() * 0.25 + 0.05,
        blur: Math.random() * 3 + 0.5,
        color: color
      })
    }
    
    setParticles(initialParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.speedX
        let newY = p.y + p.speedY
        
        if (newX > 110) newX = -10
        if (newX < -10) newX = 110
        if (newY > 110) {
          newY = -10
          newX = Math.random() * 100
        }
        if (newY < -10) newY = 110

        const sway = Math.sin(Date.now() * 0.001 + p.id) * 0.02
        const float = Math.sin(Date.now() * 0.0005 + p.id) * 0.01

        return {
          ...p,
          x: newX + sway,
          y: newY + float,
          speedX: p.speedX + (Math.random() - 0.5) * 0.005,
          speedY: Math.max(-0.1, Math.min(0.02, p.speedY + (Math.random() - 0.5) * 0.002)),
          opacity: Math.max(0.05, Math.min(0.3, p.opacity + (Math.random() - 0.5) * 0.01)),
          size: p.size + Math.sin(Date.now() * 0.002 + p.id) * 0.3
        }
      }))
      animationRef.current = requestAnimationFrame(animateParticles)
    }

    animationRef.current = requestAnimationFrame(animateParticles)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const el = bgRef.current!
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      el.style.transform = `translate(${x}px, ${y}px) rotate(-8deg)`
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              background: `radial-gradient(circle, ${particle.color} 0%, ${particle.color.replace(')', ',0.3)').replace('rgb', 'rgba')} 50%, transparent 100%)`,
              borderRadius: '50%',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.size * 0.5}px ${particle.color.replace(')', ',0.4)').replace('rgb', 'rgba')}`,
              transform: `translateZ(0) scale(${1 + Math.sin(Date.now() * 0.001 + particle.id) * 0.1})`,
              willChange: 'transform, opacity, left, top',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,100,80,0.1)_0%,transparent_70%)]" />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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
            origin-center
          "
          style={{
            fontSize: "clamp(260px, 30vw, 520px)",
          }}
        >
          AGENTRA
        </div>
      </div>

      <div className="relative z-10 w-full">
        <HeroText />
      </div>
    </section>
  )
}