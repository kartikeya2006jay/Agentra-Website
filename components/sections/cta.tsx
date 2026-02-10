"use client"

import { useEffect, useRef } from "react"
import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"
import Button from "@/components/ui/button"

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})`
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative bg-black py-40 overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        
        {/* Center gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent" />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent" />
        
        {/* Radial gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-transparent via-transparent to-transparent border border-white/5" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
        </div>

        {/* Main content */}
        <Reveal>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 mb-6">
              Get Started
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="block">
              Ready to
              <span className="relative inline-block mx-3">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                  elevate
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse" />
              </span>
            </span>
            <span className="block text-gray-300 mt-2">
              your digital presence?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-400 leading-relaxed">
            From concept to launch, we partner with ambitious brands to create 
            exceptional digital experiences that drive results and inspire.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">40+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Magnetic>
              <Button className="relative group px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative flex items-center gap-3">
                  <svg 
                    className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Your Project
                </span>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button 
                variant="outline"
                className="relative group px-10 py-5 text-lg font-semibold rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative flex items-center gap-3 text-white">
                  <svg 
                    className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Schedule a Call
                </span>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        {/* Additional info */}
        <Reveal delay={0.4}>
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-400">Available for new projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm text-gray-400">Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm text-gray-400">Free initial consultation</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </section>
  )
}