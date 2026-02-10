"use client"

import { useEffect, useRef } from "react"
import Reveal from "@/components/animations/reveal"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Prevent scrolling beyond footer
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // If we've scrolled past the footer, snap back
        if (footerRect.top < windowHeight && window.scrollY > 0) {
          const footerBottom = footerRect.top + footerRect.height
          if (footerBottom <= windowHeight) {
            const contentHeight = document.documentElement.scrollHeight
            const scrollPosition = contentHeight - windowHeight
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const footer = entry.target as HTMLElement
        if (entry.isIntersecting) {
          footer.style.transform = 'translateY(0)'
          footer.style.opacity = '1'
        }
      },
      {
        threshold: 0.1
      }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-black border-t border-white/10 py-10 transition-all duration-1000 ease-out"
      style={{
        transform: 'translateY(30px)',
        opacity: '0'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing border animation */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-glowBorder" />
        
        {/* Subtle floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${15 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
              boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.1)'
            }}
          />
        ))}
        
        {/* Corner glow effects */}
        <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />
        <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />
        <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-purple-500/0 via-purple-500/20 to-purple-500/0" />
        <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        {/* Main Footer Content */}
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Brand with enhanced animation */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative group">
                <div className="flex items-center gap-3">
                  {/* Animated logo container */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      {/* Pulsing inner glow */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Logo with animation */}
                      <div className="relative z-10">
                        <div className="text-white font-bold text-sm transform group-hover:scale-125 transition-transform duration-500">A</div>
                      </div>
                    </div>
                    
                    {/* Outer glow on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="relative">
                    <p className="text-xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                      AGENTRA
                    </p>
                    <p className="text-xs text-gray-500 font-light tracking-wider mt-0.5 transform group-hover:translate-x-1 transition-transform duration-300">
                      Digital Innovation Studio
                    </p>
                    
                    {/* Animated underline */}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
              
              {/* Copyright with fade animation */}
              <div className="relative group/copyright">
                <p className="text-sm text-gray-400 font-light transform group-hover/copyright:translate-y-[-2px] transition-transform duration-300">
                  © {new Date().getFullYear()} Agentra. All rights reserved.
                </p>
                <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-gray-400/50 to-transparent group-hover/copyright:w-full transition-all duration-500" />
              </div>
            </div>

            {/* Right side - Links with staggered animation */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Contact', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Blog', href: '#' }
                ].map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-sm text-gray-400 hover:text-white transition-all duration-300 group/link"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      <svg 
                        className="w-3 h-3 text-blue-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    
                    {/* Animated underline */}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500" />
                    
                    {/* Hover background glow */}
                    <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 blur" />
                  </a>
                ))}
              </div>
              
              {/* Status indicator with enhanced animation */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 via-white/3 to-white/5 backdrop-blur-sm border border-white/10 group/status transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  {/* Animated status dot */}
                  <div className="relative">
                    <div className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400/40"></div>
                    <div className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-300 tracking-wide">
                      Always innovating
                    </span>
                    <span className="text-[10px] text-gray-500/60 tracking-wider">
                      • Creating • Evolving •
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Section with smooth animation */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative group/tagline">
              <p className="text-xs text-gray-500/60 font-light text-center md:text-left transform group-hover/tagline:translate-x-1 transition-transform duration-300">
                Crafting exceptional digital experiences
              </p>
              <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-gray-500/30 to-transparent group-hover/tagline:w-full transition-all duration-500" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group/version">
                <div className="text-xs text-gray-500/60 px-2 py-1 rounded border border-white/5 bg-white/2 backdrop-blur-sm transform group-hover/version:scale-105 transition-all duration-300">
                  Version 2.0
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded opacity-0 group-hover/version:opacity-100 transition-opacity duration-300 blur" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes glowBorder {
          0%, 100% { 
            opacity: 0.3;
            transform: translateX(-100%);
          }
          50% { 
            opacity: 0.6;
          }
          100% { 
            opacity: 0.3;
            transform: translateX(100%);
          }
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          33% { 
            transform: translateY(-10px) translateX(5px);
            opacity: 0.3;
          }
          66% { 
            transform: translateY(5px) translateX(-5px);
            opacity: 0.2;
          }
        }
        
        .animate-glowBorder {
          animation: glowBorder 8s linear infinite;
        }
      `}</style>
    </footer>
  )
}