"use client"

import { useState } from "react"
import Reveal from "@/components/animations/reveal"

const projects = [
  {
    title: "Agentra Website",
    category: "Brand / Web",
    desc: "A cinematic agency website focused on motion, performance, and clarity.",
    github: "https://github.com",
    live: "https://agentra.com",
    tags: ["React", "Next.js", "Framer Motion", "Tailwind"],
    gradient: "from-blue-400/10 via-indigo-400/10 to-cyan-400/10",
    accent: "bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400",
  },
  {
    title: "Product Landing Concept",
    category: "UI / UX",
    desc: "High-conversion landing experience designed for modern startups.",
    github: "https://github.com",
    live: "https://productlanding.com",
    tags: ["Figma", "Webflow", "GSAP", "Three.js"],
    gradient: "from-purple-400/10 via-pink-400/10 to-rose-400/10",
    accent: "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400",
  },
  {
    title: "Interactive Design System",
    category: "Design System",
    desc: "Reusable components, motion tokens, and scalable UI patterns.",
    github: "https://github.com",
    live: "https://designsystem.com",
    tags: ["React", "Storybook", "Tailwind", "TypeScript"],
    gradient: "from-emerald-400/10 via-teal-400/10 to-green-400/10",
    accent: "bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400",
  },
  {
    title: "E-commerce Platform",
    category: "Full Stack",
    desc: "Scalable e-commerce solution with real-time analytics and payments.",
    github: "https://github.com",
    live: "https://ecommerce.com",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-amber-400/10 via-orange-400/10 to-red-400/10",
    accent: "bg-gradient-to-r from-amber-400 via-orange-400 to-red-400",
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950">
          {/* Animated gradient orbs with spread colors */}
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/5 via-pink-400/5 to-rose-400/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/5 via-teal-400/5 to-green-400/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
          <div className="absolute bottom-3/4 right-1/3 w-80 h-80 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-red-400/5 rounded-full blur-3xl animate-pulse-slow delay-1500" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header with enhanced animation */}
        <div className="mb-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-shimmer" />
                <div className="absolute top-1/2 left-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider animate-fade-in">
                Portfolio
              </span>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                  Featured Projects
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-cyan-400/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl text-gray-400 max-w-3xl animate-slide-up">
              A showcase of our most impactful work, combining innovative design with cutting-edge technology.
            </p>
          </Reveal>
        </div>

        {/* Projects Grid with enhanced animations */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={0.15 + index * 0.05}>
              <div 
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated background effect */}
                <div className={`absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 ${project.gradient} animate-gradient-flow`} />
                
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl ${project.accent} blur-xl`} />
                </div>

                <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left side - Content with enhanced animations */}
                  <div className="relative z-10">
                    {/* Animated number badge */}
                    <div className="mb-8 transform transition-all duration-500 group-hover:translate-x-2">
                      <div className="relative inline-block">
                        <div className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                          <div className={`absolute inset-0 rounded-full ${project.accent} blur-lg`} />
                        </div>
                        <div className="relative w-16 h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                          <div className={`absolute inset-0 rounded-full ${project.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                          <span className="text-xl font-bold text-white animate-pulse-slow">
                            0{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Category with slide-in animation */}
                    <div className="mb-6 overflow-hidden">
                      <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title with enhanced animation */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 transform transition-all duration-500 group-hover:translate-x-1">
                      <span className="relative">
                        {project.title}
                        <div className={`absolute -bottom-2 left-0 w-0 h-0.5 ${project.accent} rounded-full transition-all duration-700 group-hover:w-full`} />
                      </span>
                    </h3>
                    
                    {/* Description fade-in */}
                    <div className="mb-8 transform transition-all duration-500 group-hover:translate-x-1 delay-75">
                      <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tags with staggered animation */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tag}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm transform transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                          style={{ transitionDelay: `${tagIndex * 50}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links with enhanced hover effects */}
                    <div className="flex items-center gap-6">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative overflow-hidden"
                      >
                        <div className="absolute -inset-1 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
                          <div className={`absolute inset-0 rounded-lg ${project.accent} opacity-10 blur`} />
                        </div>
                        <div className="relative flex items-center gap-3 px-8 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group-hover/link:scale-105">
                          <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-300 group-hover/link:text-white transition-colors duration-300">
                            View Code
                          </span>
                          <div className="w-0 h-0.5 bg-white absolute bottom-0 left-0 group-hover/link:w-full transition-all duration-300" />
                        </div>
                      </a>
                      
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative overflow-hidden"
                      >
                        <div className="absolute -inset-1 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
                          <div className={`absolute inset-0 rounded-lg ${project.accent} opacity-20 blur`} />
                        </div>
                        <div className={`relative flex items-center gap-3 px-8 py-4 rounded-lg ${project.accent} bg-opacity-10 border border-white/20 backdrop-blur-sm hover:border-white/40 transition-all duration-300 group-hover/link:scale-105`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="text-sm font-medium text-white">
                            Live Demo
                          </span>
                          <div className="w-0 h-0.5 bg-white absolute bottom-0 left-0 group-hover/link:w-full transition-all duration-300" />
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Right side - Enhanced preview with animations */}
                  <div className="relative">
                    {/* Floating preview container */}
                    <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-700 group-hover:scale-105 group-hover:border-white/20 group-hover:shadow-2xl ${project.gradient}`}>
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className={`absolute inset-0 ${project.accent}`} />
                      </div>
                      
                      {/* Browser mockup */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/10 backdrop-blur-sm flex items-center px-4">
                        <div className="flex items-center gap-2">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-3 h-3 rounded-full bg-white/20 animate-pulse"
                              style={{ animationDelay: `${i * 200}ms` }}
                            />
                          ))}
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-2 rounded-full bg-white/10 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Animated content placeholder */}
                      <div className="absolute inset-0 top-12 flex items-center justify-center">
                        <div className="text-center p-8 transform transition-all duration-500 group-hover:scale-110">
                          {/* Animated icon */}
                          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mx-auto mb-6 flex items-center justify-center animate-rotate-slow">
                            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping-slow" />
                            <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          
                          {/* Project title with shimmer */}
                          <div className="text-white/70 text-lg font-medium mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                            {project.title}
                          </div>
                          
                          {/* Animated dots */}
                          <div className="flex items-center justify-center gap-2 mt-4">
                            {[...Array(3)].map((_, i) => (
                              <div 
                                key={i}
                                className="w-2 h-2 rounded-full bg-white/30 animate-bounce"
                                style={{ animationDelay: `${i * 150}ms` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                        <div className="text-center transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                          <div className="text-sm text-gray-300 mb-3 font-medium">
                            Interactive Preview
                          </div>
                          <div className="flex items-center justify-center gap-4">
                            {[...Array(4)].map((_, i) => (
                              <div 
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                                style={{ animationDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating accent element */}
                    <div className={`absolute -top-6 -right-6 w-14 h-14 rounded-full ${project.accent} flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:rotate-180 group-hover:scale-110`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated connecting line */}
                {index < projects.length - 1 && (
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 animate-ping" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <Reveal delay={0.4}>
          <div className="mt-40 pt-24 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                  Ready to Build Together?
                </span>
              </h3>
              <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
                Let's collaborate to create something extraordinary. Our team is ready to bring your vision to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a 
                  href="mailto:hello@example.com"
                  className="group relative px-12 py-5 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-white font-semibold text-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-4">
                    <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Start a Project
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 animate-shimmer" />
                </a>
                
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-12 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105"
                >
                  <span className="relative flex items-center gap-4">
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Explore GitHub
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes shine {
          to { background-position: 200% center; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          background-size: 200% auto;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 4s ease infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </section>
  )
}