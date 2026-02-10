"use client"

import { useEffect, useState } from "react"
import Reveal from "@/components/animations/reveal"

const services = [
  {
    title: "Brand Identity",
    desc: "Visual systems, logos, and design languages that scale with your product.",
  },
  {
    title: "Web Experiences",
    desc: "High-performance websites built with modern frameworks and motion.",
  },
  {
    title: "Motion & Interaction",
    desc: "Micro-interactions and animations that make interfaces feel alive.",
  },
  {
    title: "Product Design",
    desc: "UX/UI design focused on clarity, usability, and conversion.",
  },
]

export default function Services() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/5 via-black to-cyan-900/5" />
        
        {/* Dynamic grid */}
        <div className="absolute inset-0 bg-[size:50px_50px] bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,transparent_1px)] opacity-30" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
                boxShadow: `0 0 ${10 + Math.random() * 10}px ${5 + Math.random() * 5}px rgba(147, 51, 234, 0.5)`
              }}
            />
          ))}
        </div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin-slow-reverse" />
      </div>

      {/* Mouse light effect */}
      <div 
        className="absolute w-[800px] h-[800px] pointer-events-none opacity-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Services
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                What we do
              </span>
            </h2>
            <div className="absolute -bottom-4 left-0 w-48 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-2xl">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              We help ambitious brands stand out through{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  design, technology, and motion
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-full" />
              </span>
              .
            </p>
          </div>
        </Reveal>

        <div className="mt-32 grid gap-8 md:grid-cols-2 lg:gap-12">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.15 + i * 0.05}>
              <div 
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Multi-layer glow effects */}
                <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-md animate-pulse" />
                </div>

                {/* Animated border */}
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-border" />
                  <div className="absolute inset-[1px] rounded-2xl bg-black" />
                </div>

                {/* Main card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.03] via-black to-white/[0.02] p-10 border border-white/10 backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                  {/* Animated number badge */}
                  <div className="absolute -top-4 -left-4">
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-black font-bold text-lg shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <span className="transform group-hover:rotate-12 transition-transform duration-300">
                          0{i + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title with floating effect */}
                  <div className="relative overflow-hidden">
                    <h3 className="text-3xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-shine">
                        {s.title}
                      </span>
                    </h3>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 group-hover:w-24" />
                  </div>

                  {/* Description with reveal effect */}
                  <p className="text-gray-400 text-lg leading-relaxed relative pl-6 border-l-2 border-white/10 group-hover:border-cyan-500/30 transition-all duration-500 group-hover:pl-8">
                    <span className="relative">
                      {s.desc}
                      {/* Shimmer effect */}
                      <span className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </span>
                  </p>

                  {/* Interactive elements */}
                  <div className="mt-8 flex items-center justify-between">
                    {/* Animated dots */}
                    <div className="flex space-x-2">
                      {[...Array(3)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{
                            animationDelay: `${dotIndex * 0.1}s`,
                            transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                            transitionDelay: `${dotIndex * 0.05}s`
                          }}
                        />
                      ))}
                    </div>

                    {/* Animated arrow */}
                    <div className="relative overflow-hidden">
                      <div className="flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          Explore
                        </span>
                        <div className="relative">
                          <svg className="w-6 h-6 text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          {/* Trail effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-30 -z-10 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover particles */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, particleIndex) => (
                      <div
                        key={particleIndex}
                        className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${particleIndex * 0.1}s`,
                          transform: hoveredIndex === i ? 'scale(1)' : 'scale(0)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA section */}
        <Reveal delay={0.4}>
          <div className="mt-32 text-center">
            <div className="relative inline-block">
              <button className="relative px-12 py-4 rounded-full bg-gradient-to-r from-black via-black to-black border border-white/10 text-xl font-semibold overflow-hidden group">
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border */}
                <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-border" />
                  <div className="absolute inset-[1px] rounded-full bg-black" />
                </div>

                {/* Button content */}
                <span className="relative bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-shine">
                  View all services
                </span>
                
                {/* Button particles */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-particle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes shine {
          to { background-position: 200% center; }
        }
        
        @keyframes gradient-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        
        .animate-shine {
          animation: shine 3s linear infinite;
        }
        
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-border 2s ease infinite;
        }
        
        .animate-particle {
          animation: particle 1s ease-out forwards;
        }
      `}</style>
    </section>
  )
}