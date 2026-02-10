"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "@/components/animations/reveal"
import { Mail, Send, ArrowRight, Sparkles, Copy, Check } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

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

  const emails = [
    {
      label: "General Inquiries",
      address: "socials@agentra.co.in",
      subject: "General Inquiry - Agentra Website",
      color: "from-blue-500/20 to-cyan-500/20",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]"
    },
    {
      label: "Team Contact",
      address: "kartikeya@agentra.co.in",
      subject: "Contact from Agentra Website",
      color: "from-purple-500/20 to-pink-500/20",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]"
    }
  ]

  const handleEmailClick = (email: string, subject: string) => {
    // Create mailto link
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    window.open(mailtoLink, '_blank')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEmail(text)
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedEmail(null)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedEmail(text)
      
      setTimeout(() => {
        setCopiedEmail(null)
      }, 2000)
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-t from-black via-black to-gray-900/10 border-t border-white/5 pt-20 pb-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                             linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
              animation: `float ${8 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        {/* Email Contacts Section */}
        <Reveal>
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Mail className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-300 tracking-wider">
                Connect With Us
              </h3>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {emails.map((email, index) => (
                <div
                  key={email.address}
                  className={`relative group backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 ${email.color} ${email.glow}`}
                  onMouseEnter={() => setHoveredEmail(email.address)}
                  onMouseLeave={() => setHoveredEmail(null)}
                  onClick={() => handleEmailClick(email.address, email.subject)}
                  style={{
                    animation: isVisible ? `slideInUp 0.6s ease-out ${index * 0.1}s both` : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1 tracking-wider">
                          {email.label}
                        </p>
                        <p className="text-lg font-mono text-white flex items-center gap-2">
                          {email.address}
                          <ArrowRight className="w-4 h-4 text-blue-400 transform -rotate-45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </p>
                      </div>
                      <Send className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        Click to send email
                      </p>
                      
                      {/* Copy button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevent triggering the main click
                          copyToClipboard(email.address)
                        }}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors duration-300 group/copy"
                      >
                        {copiedEmail === email.address ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 group-hover/copy:scale-110 transition-transform duration-300" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Main Footer Content */}
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row pt-10 border-t border-white/10">
            {/* Left side */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white tracking-tight">
                      AGENTRA
                    </p>
                    <p className="text-xs text-gray-500 font-light tracking-wider mt-1">
                      Digital Innovation Studio
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-gray-400/80 font-light tracking-wide">
                  © {new Date().getFullYear()} Agentra. All rights reserved.
                </p>
                <p className="text-xs text-gray-500/60 mt-2 font-light">
                  Building the future, one pixel at a time
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-center md:items-end gap-8">
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { label: 'Privacy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Contact', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Press', href: '#' }
                ].map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-sm text-gray-400/80 hover:text-white transition-all duration-300 group"
                    style={{
                      animation: isVisible ? `fadeIn 0.5s ease-out ${index * 0.05}s both` : 'none'
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400/40"></div>
                    <div className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium tracking-wide">
                    Always innovating • Always creating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/5">
          {/* Animated gradient line */}
          <div className="relative h-px mb-8 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
              style={{
                animation: 'slideInfinite 6s linear infinite',
              }}
            />
          </div>
          
          {/* Additional info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500/40 font-mono tracking-wider text-center md:text-left">
              v2.0.0 • Built with passion • Elevating digital frontiers
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500/60">
                <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60 animate-pulse" />
                <span>Powered by Next.js 14</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-700" />
              <div className="flex items-center gap-2 text-xs text-gray-500/60">
                <div className="w-1 h-1 rounded-full bg-gradient-to-r from-green-400/60 to-emerald-400/60 animate-pulse" />
                <span>Deployed on Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(8px) rotate(5deg); }
          66% { transform: translateY(8px) translateX(-8px) rotate(-5deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInfinite {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>
    </footer>
  )
}