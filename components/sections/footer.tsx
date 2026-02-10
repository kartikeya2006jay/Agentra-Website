"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "@/components/animations/reveal"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'careers' | 'blog' | 'contact' | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside or double-clicking
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActiveModal(null)
      }
    }

    const handleDoubleClick = (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        setActiveModal(null)
      }
    }

    if (activeModal) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('dblclick', handleDoubleClick)
      
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('dblclick', handleDoubleClick)
      document.body.style.overflow = 'auto'
    }
  }, [activeModal])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    // Prevent scrolling beyond footer
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
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

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      content: `We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.

At Agentra, we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.

When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy policy.

Information We Collect:
• Personal information you disclose to us
• Information automatically collected
• Information collected from other sources

How We Use Your Information:
• To provide and maintain our services
• To notify you about changes
• To provide customer support
• To gather analysis or valuable information
• To detect, prevent and address technical issues`,
      color: "from-indigo-500/10 to-violet-500/10",
      borderColor: "border-indigo-500/20",
      icon: "🔒"
    },
    terms: {
      title: "Terms of Service",
      content: `By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
      
We may update these terms at any time without prior notice. Continued use of the website constitutes acceptance of changes.`,
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      icon: "⚖️"
    },
    careers: {
      title: "Careers",
      content: `We're always looking for talented people to join our team.
      
Send your resume to:  socials@agentra.co.in `,
      color: "from-emerald-500/10 to-green-500/10",
      borderColor: "border-emerald-500/20",
      icon: "💼"
    },
    blog: {
      title: "Blog",
      content: `Welcome to our blog. Here we share updates, articles, and insights.
      
Stay tuned for new posts!
      
Follow us for updates on Medium and Substack.`,
      color: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      icon: "✍️"
    },
    contact: {
      title: "Contact Us",
      content: `Get in touch with our team for inquiries, partnerships, or project discussions.
      
📧 Email: socials@agentra.co.in
📱 Phone: 9720613333
📍 Location: Bangalore, India
`,
      color: "from-amber-500/10 to-orange-500/10",
      borderColor: "border-amber-500/20",
      icon: "📞"
    }
  }

  return (
    <>
      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            ref={modalRef}
            className={`relative max-w-2xl w-full mx-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border ${modalContent[activeModal].borderColor} p-8 animate-scaleIn shadow-2xl`}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
            >
              <div className="w-4 h-0.5 bg-white/60 rotate-45 group-hover:rotate-[-45deg] transition-transform duration-300"></div>
              <div className="w-4 h-0.5 bg-white/60 -rotate-45 group-hover:rotate-45 transition-transform duration-300"></div>
            </button>
            
            {/* Modal header with icon */}
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${modalContent[activeModal].color}`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{modalContent[activeModal].icon}</span>
                <h3 className="text-2xl font-bold text-white">{modalContent[activeModal].title}</h3>
              </div>
              
              <div className="space-y-4 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {modalContent[activeModal].content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('•')) {
                    return (
                      <div key={index} className="flex items-start gap-2 ml-4">
                        <span className="text-blue-400 mt-1">•</span>
                        <p className="text-gray-300 leading-relaxed">{paragraph.substring(1)}</p>
                      </div>
                    )
                  }
                  return (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
                
                {/* Additional Privacy Policy Sections */}
                {activeModal === 'privacy' && (
                  <div className="mt-8 space-y-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-2">Your Privacy Rights</h4>
                      <p className="text-gray-300 text-sm">
                        You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-2">Data Security</h4>
                      <p className="text-gray-300 text-sm">
                        We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-2">Policy Updates</h4>
                      <p className="text-gray-300 text-sm">
                        We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="text-sm text-gray-500">
                  Press ESC or click outside to close
                </div>
                <div className="text-xs text-gray-500/60">
                  Double-click to close
                </div>
              </div>
            </div>
            
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-2xl ${modalContent[activeModal].color} opacity-30 blur-xl -z-10`} />
          </div>
        </div>
      )}

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
                    { label: 'Privacy Policy', href: '#', onClick: () => setActiveModal('privacy'), icon: '🔒' },
                    { label: 'Terms of Service', href: '#', onClick: () => setActiveModal('terms'), icon: '⚖️' },
                    { label: 'Contact', href: '#', onClick: () => setActiveModal('contact'), icon: '📞' },
                    { label: 'Careers', href: '#', onClick: () => setActiveModal('careers'), icon: '💼' },
                    { label: 'Blog', href: '#', onClick: () => setActiveModal('blog'), icon: '✍️' }
                  ].map((link, index) => (
                    <button
                      key={link.label}
                      onClick={link.onClick || (() => {})}
                      className="relative text-sm text-gray-400 hover:text-white transition-all duration-300 group/link cursor-pointer bg-transparent border-none"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {link.icon && <span className="text-xs opacity-60 group-hover/link:opacity-100">{link.icon}</span>}
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
                    </button>
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
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          
          .animate-glowBorder {
            animation: glowBorder 8s linear infinite;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.4s ease-out forwards;
          }
        `}</style>
      </footer>
    </>
  )
}