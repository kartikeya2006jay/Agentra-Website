"use client"

import { useEffect, useRef } from "react"
import Reveal from "@/components/animations/reveal"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-black border-t border-white/10 py-8 transition-all duration-700 ease-out"
      style={{
        transform: 'translateY(20px)',
        opacity: '0'
      }}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal scan line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-16 h-px bg-white/5" />
        <div className="absolute top-0 left-0 w-px h-16 bg-white/5" />
        <div className="absolute top-0 right-0 w-16 h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-px h-16 bg-white/5" />
        <div className="absolute bottom-0 left-0 w-16 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 w-px h-16 bg-white/5" />
        <div className="absolute bottom-0 right-0 w-16 h-px bg-white/5" />
        <div className="absolute bottom-0 right-0 w-px h-16 bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        {/* Main Footer Content */}
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - Brand */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      {/* Simple logo */}
                      <div className="text-white font-bold text-sm">A</div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-lg font-bold text-white tracking-tight">
                      AGENTRA
                    </p>
                    <p className="text-xs text-gray-500 font-light tracking-wider mt-0.5">
                      Digital Innovation
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="mt-3">
                <p className="text-sm text-gray-400 font-light">
                  © {new Date().getFullYear()} Agentra. All rights reserved.
                </p>
              </div>
            </div>

            {/* Right side - Links */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: 'Privacy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Contact', href: '#' },
                  { label: 'Careers', href: '#' }
                ].map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-sm text-gray-400 hover:text-white transition-all duration-300 group/link"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
              
              {/* Simple status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
                  </div>
                  <span className="text-xs text-gray-400">
                    Always innovating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500/60 font-light text-center md:text-left">
              Crafting exceptional digital experiences
            </p>
            
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-500/60">
                Version 1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}