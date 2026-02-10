"use client"

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
  originalX: number
  originalY: number
  stuck: boolean
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<DustParticle[]>([])
  const animationRef = useRef<number>()
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const particleCount = 500
    const initialParticles: DustParticle[] = []
    
    const letterPositions = [
      { x: 10, y: 50, width: 12, height: 40 },
      { x: 22, y: 50, width: 12, height: 40 },
      { x: 34, y: 50, width: 10, height: 40 },
      { x: 44, y: 50, width: 12, height: 40 },
      { x: 56, y: 50, width: 10, height: 40 },
      { x: 66, y: 50, width: 12, height: 40 },
      { x: 78, y: 50, width: 12, height: 40 },
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const letterIndex = Math.floor(Math.random() * 7)
      const letter = letterPositions[letterIndex]
      const baseX = letter.x + Math.random() * letter.width
      const baseY = letter.y + (Math.random() - 0.5) * letter.height
      
      initialParticles.push({
        id: i,
        x: baseX,
        y: baseY,
        size: Math.random() * 2.5 + 0.5,
        speedX: 0,
        speedY: 0,
        opacity: Math.random() * 0.15 + 0.1,
        blur: Math.random() * 2 + 0.5,
        originalX: baseX,
        originalY: baseY,
        stuck: Math.random() > 0.3
      })
    }
    
    setParticles(initialParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(p => {
        if (p.stuck && Math.random() > 0.995) {
          p.stuck = false
        }

        if (p.stuck) {
          return {
            ...p,
            opacity: 0.15 + Math.sin(Date.now() * 0.002 + p.id) * 0.05,
            size: p.size + Math.sin(Date.now() * 0.001 + p.id) * 0.1
          }
        }

        const dx = p.originalX - p.x
        const dy = p.originalY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        const returnForce = 0.15
        const mouseDistanceX = p.x - mouseX.current * 100
        const mouseDistanceY = p.y - mouseY.current * 100
        const mouseDist = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY)
        
        let forceX = 0
        let forceY = 0
        
        if (mouseDist < 20) {
          const repelForce = (20 - mouseDist) * 0.15
          forceX = (mouseDistanceX / mouseDist) * repelForce
          forceY = (mouseDistanceY / mouseDist) * repelForce
        }
        
        const newSpeedX = p.speedX * 0.88 + dx * returnForce * 0.003 + forceX + (Math.random() - 0.5) * 0.08
        const newSpeedY = p.speedY * 0.88 + dy * returnForce * 0.003 + forceY + (Math.random() - 0.5) * 0.08
        
        let newX = p.x + newSpeedX
        let newY = p.y + newSpeedY

        const distanceFromOriginal = Math.sqrt(
          Math.pow(newX - p.originalX, 2) + 
          Math.pow(newY - p.originalY, 2)
        )

        const opacity = Math.max(0.05, 0.2 - distanceFromOriginal * 0.002)

        if (distanceFromOriginal < 3 && Math.abs(newSpeedX) < 0.1 && Math.abs(newSpeedY) < 0.1 && Math.random() > 0.99) {
          return {
            ...p,
            x: newX,
            y: newY,
            speedX: 0,
            speedY: 0,
            opacity: 0.15,
            stuck: true
          }
        }

        const driftX = Math.sin(Date.now() * 0.0003 + p.id) * 0.05
        const driftY = Math.cos(Date.now() * 0.0004 + p.id * 0.7) * 0.05

        return {
          ...p,
          x: newX + driftX,
          y: newY + driftY,
          speedX: newSpeedX,
          speedY: newSpeedY,
          opacity: opacity,
          size: p.size + Math.sin(Date.now() * 0.002 + p.id) * 0.1,
          blur: Math.max(0.5, Math.min(3, p.blur + (Math.random() - 0.5) * 0.1))
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
      
      mouseX.current = e.clientX / window.innerWidth
      mouseY.current = e.clientY / window.innerHeight
    }
    
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute transition-opacity duration-500"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              background: particle.stuck 
                ? 'radial-gradient(circle, rgba(220,220,220,0.9) 0%, rgba(180,180,180,0.5) 70%, transparent 100%)'
                : 'radial-gradient(circle, rgba(200,200,200,0.7) 0%, rgba(160,160,160,0.3) 60%, transparent 100%)',
              borderRadius: '50%',
              boxShadow: particle.stuck 
                ? `0 0 ${particle.size * 2}px ${particle.size * 0.5}px rgba(220,220,220,0.4)`
                : `0 0 ${particle.size * 1.5}px ${particle.size * 0.3}px rgba(200,200,200,0.25)`,
              willChange: 'transform, opacity, left, top',
            }}
          />
        ))}
      </div>

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