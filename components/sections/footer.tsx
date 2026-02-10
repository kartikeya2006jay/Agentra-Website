"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "@/components/animations/reveal"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
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
      className="relative overflow-hidden bg-gradient-to-t from-black via-black to-gray-900/20 border-t border-white/5 pt-16 pb-12"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                             linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-gray-600/20 to-transparent"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.1,
              animation: `float ${8 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Left side with enhanced typography */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative group">
                <p className="text-lg font-semibold text-white tracking-wider">
                  AGENTRA
                </p>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-gray-400/80 font-light tracking-wide">
                  © {new Date().getFullYear()} Agentra. All rights reserved.
                </p>
                <p className="text-xs text-gray-500/60 mt-1 font-light">
                  Redefining digital experiences
                </p>
              </div>
            </div>

            {/* Right side with enhanced links */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-8">
                {[
                  { label: 'Privacy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Contact', href: '#' },
                  { label: 'Careers', href: '#' }
                ].map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-sm text-gray-400/80 hover:text-white transition-all duration-300 group"
                    style={{
                      animation: isVisible ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none'
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-400/60 to-purple-400/60 group-hover:w-full transition-all duration-300" />
                    <span className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </a>
                ))}
              </div>
              
              {/* Social/Status indicator */}
              <div className="flex items-center gap-3 text-xs text-gray-500/60">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500/60"></span>
                  </span>
                  <span>Always innovating</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Decorative bottom line with animation */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="relative h-px overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              style={{
                animation: 'slide 8s linear infinite',
              }}
            />
          </div>
          
          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500/40 font-mono tracking-wider">
              v1.0.0 • Built with passion • Elevating digital frontiers
            </p>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  )
}