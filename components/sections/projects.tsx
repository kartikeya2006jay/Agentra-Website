"use client"

import { useState } from "react"
import Reveal from "@/components/animations/reveal"

const projects = [
  {
    title: "Agentra Website",
    category: "Brand / Web",
    desc: "A cinematic agency website focused on motion, performance, and clarity.",
    year: "2024",
    github: "https://github.com",
    live: "https://agentra.com",
    tags: ["React", "Next.js", "Framer Motion", "Tailwind"],
    imageColor: "from-blue-900/20 to-cyan-900/20",
  },
  {
    title: "Product Landing Concept",
    category: "UI / UX",
    desc: "High-conversion landing experience designed for modern startups.",
    year: "2024",
    github: "https://github.com",
    live: "https://productlanding.com",
    tags: ["Figma", "Webflow", "GSAP", "Three.js"],
    imageColor: "from-purple-900/20 to-pink-900/20",
  },
  {
    title: "Interactive Design System",
    category: "Design System",
    desc: "Reusable components, motion tokens, and scalable UI patterns.",
    year: "2023",
    github: "https://github.com",
    live: "https://designsystem.com",
    tags: ["React", "Storybook", "Tailwind", "TypeScript"],
    imageColor: "from-emerald-900/20 to-teal-900/20",
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Subtle gradient accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-cyan-500 to-blue-500" />
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Portfolio
              </span>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Projects</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl text-gray-400 max-w-3xl">
              A showcase of our most impactful work, combining innovative design with cutting-edge technology.
            </p>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={0.15 + index * 0.05}>
              <div 
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Project Card */}
                <div className="relative">
                  {/* Background gradient on hover */}
                  <div className={`absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${project.imageColor}`} />
                  
                  <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="relative z-10">
                      {/* Project number and year */}
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm font-bold text-white">0{index + 1}</span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        <span className="text-sm font-medium text-gray-400">{project.year}</span>
                      </div>

                      {/* Category */}
                      <div className="mb-6">
                        <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {project.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-lg text-gray-400 mb-8 max-w-xl">
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tag}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-6">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-300 group-hover/link:text-white transition-colors">
                            View Code
                          </span>
                        </a>
                        
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/40 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="text-sm font-medium text-white">
                            Live Demo
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Right side - Image preview */}
                    <div className="relative">
                      {/* Image container */}
                      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${project.imageColor} border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all duration-500`}>
                        {/* Mock browser bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/10 backdrop-blur-sm flex items-center px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 rounded-full bg-white/10" />
                          </div>
                        </div>
                        
                        {/* Content placeholder */}
                        <div className="absolute inset-0 top-10 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/10 mx-auto mb-6 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="text-white/60 text-sm font-medium">
                              {project.title}
                            </div>
                          </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                          <div className="text-center">
                            <div className="text-sm text-gray-300 mb-2">
                              Hover for preview
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-100" />
                              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-200" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Connecting line between projects */}
                  {index < projects.length - 1 && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA Section */}
        <Reveal delay={0.3}>
          <div className="mt-32 pt-20 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Have a project in mind?
              </h3>
              <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
                Let's collaborate to create something extraordinary. Our team is ready to bring your vision to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="mailto:hello@example.com"
                  className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </span>
                </a>
                
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Explore GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}