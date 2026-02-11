"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [showCinematic, setShowCinematic] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cinematicCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const cinematicRef = useRef<number | null>(null)

  // Sand particles
  const particlesRef = useRef<Array<{
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    originalX: number
    originalY: number
    color: string
  }>>([])

  // Cinematic animation variables
  const cinematicProgress = useRef(0)
  const linesRef = useRef<Array<{
    x1: number
    y1: number
    x2: number
    y2: number
    opacity: number
  }>>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize professional cinematic animation
  useEffect(() => {
    if (!mounted || !cinematicCanvasRef.current) return

    const canvas = cinematicCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create minimalist grid lines
    linesRef.current = []
    const gridSize = 40
    for (let i = 0; i < canvas.width; i += gridSize) {
      linesRef.current.push({
        x1: i,
        y1: 0,
        x2: i,
        y2: canvas.height,
        opacity: 0
      })
    }
    for (let i = 0; i < canvas.height; i += gridSize) {
      linesRef.current.push({
        x1: 0,
        y1: i,
        x2: canvas.width,
        y2: i,
        opacity: 0
      })
    }

    let startTime = Date.now()
    const duration = 1800 // 1.8 seconds - faster and more professional

    const animateCinematic = () => {
      const elapsed = Date.now() - startTime
      cinematicProgress.current = Math.min(elapsed / duration, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dark sophisticated background
      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Main title - clean and fast reveal
      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // "ABOUT" - quick fade
      ctx.font = '300 48px Inter, system-ui, -apple-system, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = Math.min(cinematicProgress.current * 2, 1)
      ctx.fillText('ABOUT', canvas.width / 2, canvas.height / 2 - 40)

      // "AGENTRA" - quick fade
      ctx.font = '600 64px Inter, system-ui, -apple-system, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = Math.min(Math.max(0, cinematicProgress.current * 2 - 0.2), 1)
      ctx.fillText('AGENTRA', canvas.width / 2, canvas.height / 2 + 40)

      // Subtle horizontal line
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 60, canvas.height / 2)
      ctx.lineTo(canvas.width / 2 + 60, canvas.height / 2)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'
      ctx.lineWidth = 1
      ctx.globalAlpha = Math.min(Math.max(0, cinematicProgress.current * 2 - 0.6), 0.4)
      ctx.stroke()

      ctx.restore()

      if (cinematicProgress.current < 1) {
        cinematicRef.current = requestAnimationFrame(animateCinematic)
      } else {
        setTimeout(() => {
          setShowCinematic(false)
        }, 300)
      }
    }

    animateCinematic()

    const handleResize = () => {
      if (cinematicCanvasRef.current) {
        cinematicCanvasRef.current.width = window.innerWidth
        cinematicCanvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (cinematicRef.current) {
        cancelAnimationFrame(cinematicRef.current)
      }
    }
  }, [mounted])

  // Initialize sand particle system
  useEffect(() => {
    if (!mounted || !canvasRef.current || showCinematic) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create sand particles
    const particleCount = 2000
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
        color: `rgba(255, 255, 255, ${Math.random() * 0.08 + 0.02})`
      })
    }

    // Sand animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, showCinematic])

  if (!mounted) return null

  const teamMembers = [
    {
      name: "Varun Patil",
      roles: ["Chief Operating Officer (COO)", "Java Backend Developer", "Data Developer"],
      img: "VP",
      description: "Varun specializes in building robust and scalable backend systems using Java. He focuses on clean architecture, efficient code, and reliable APIs.\n\nDriven by problem-solving and performance optimization, he delivers stable, secure, and maintainable solutions aligned with both client and business goals.",
      borderColor: "border-blue-500/30",
      skills: ["Java", "Data Analysis", "Backend Architecture", "API Development", "System Design"]
    },
    {
      name: "Kartikeya Yadav",
      roles: ["Chief Data Officer (CDO)", "Co-Founder"],
      img: "KY",
      description: "Kartikeya is an AI enthusiast with strong expertise in intelligent chatbots and automation-driven systems. He works with Python, SQL, and Generative AI to build data-driven and conversational solutions.\n\nHis technical stack includes Ruby, AWS, and MongoDB, enabling scalable AI-backed applications with real-world impact.",
      borderColor: "border-purple-500/30",
      skills: ["GenAI", "Python", "Ruby", "Database Management", "AWS", "Backend Development", "Data Analysis"]
    },
    {
      name: "Ankit Pandey",
      roles: ["Co-Founder"],
      img: "AP",
      description: "Ankit manages financial strategy, planning, and operational efficiency for the agency. With a strong background in Python, Agentic AI, and Excel, he bridges the gap between technical execution and business sustainability.\n\nHe ensures data-backed decision-making and optimized resource allocation across projects.",
      borderColor: "border-green-500/30",
      skills: ["Agentic AI", "Machine Learning", "Python", "Financial Analysis", "Excel Automation"]
    },
    {
      name: "Shivendu Kumar",
      roles: ["Chief Technology Officer (CTO)"],
      img: "SK",
      description: "Shivendu leads the technical vision and architecture of the agency. His core expertise lies in C++ backend development, AI/ML systems, and modern frontend development using React.\n\nHe oversees system design, technology choices, and engineering standards to ensure scalable, high-performance, and future-ready solutions.",
      borderColor: "border-amber-500/30",
      skills: ["AI/ML", "React", "C++", "System Architecture", "Frontend Development", "Technical Leadership"]
    }
  ]

  return (
    <>
      {/* Professional Cinematic Intro - 1.8s */}
      {showCinematic && (
        <div className="fixed inset-0 z-50 bg-black">
          <canvas
            ref={cinematicCanvasRef}
            className="absolute inset-0"
          />
        </div>
      )}

      <section className="relative bg-black min-h-screen overflow-hidden">
        {/* Sand Effect Canvas */}
        {!showCinematic && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{
              opacity: 0.12
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCinematic ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 container mx-auto px-4 py-24"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-white">
                About <span className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Agentra</span>
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mx-auto mb-8"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                A strategic digital studio of four specialists delivering{" "}
                <span className="text-white">precision-crafted</span>,{" "}
                <span className="text-white">high-performance</span> solutions.
              </p>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
                Focused, agile, and intentional. Each expert brings distinct mastery.
              </p>
            </motion.div>
          </motion.div>

          {/* Professional Team Grid - 2 columns with elegant cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                {/* Elegant minimalist card */}
                <div className={`relative bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-7 h-full ${member.borderColor} border shadow-lg`}>
                  
                  {/* Subtle inner highlight */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  
                  {/* Header */}
                  <div className="relative mb-5">
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{member.name}</h3>
                    <div className="space-y-1">
                      {member.roles.map((role, i) => (
                        <p key={i} className="text-gray-400 text-xs flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full bg-${member.borderColor.split('-')[1]}-500/70`} />
                          {role}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Minimal divider */}
                  <div className={`w-10 h-px bg-${member.borderColor.split('-')[1]}-500/30 mb-5`} />

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm font-light whitespace-pre-line">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 + i * 0.05 }}
                          className={`px-3 py-1 bg-black/50 backdrop-blur-sm text-gray-300 text-[11px] rounded-full border ${member.borderColor}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Principles Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="max-w-4xl mx-auto mt-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-light text-white mb-3 tracking-wide">
                Principles
              </h2>
              <div className="w-12 h-px bg-gray-800 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Excellence",
                  description: "Rigorous quality standards",
                  borderColor: "border-blue-500/20"
                },
                {
                  title: "Innovation",
                  description: "Modern, forward-thinking",
                  borderColor: "border-purple-500/20"
                },
                {
                  title: "Collaboration",
                  description: "Seamless team integration",
                  borderColor: "border-green-500/20"
                }
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.08 }}
                  className={`bg-gray-900/20 backdrop-blur-sm rounded-lg p-5 text-center ${principle.borderColor} border`}
                >
                  <h3 className="text-sm font-medium text-white mb-1">{principle.title}</h3>
                  <p className="text-gray-500 text-xs">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <style jsx global>{`
          body {
            background: #030303;
            overflow-x: hidden;
          }

          /* Custom scrollbar - minimalist */
          ::-webkit-scrollbar {
            width: 5px;
          }

          ::-webkit-scrollbar-track {
            background: #0a0a0a;
          }

          ::-webkit-scrollbar-thumb {
            background: #2a2a2a;
            border-radius: 0;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #3a3a3a;
          }
        `}</style>
      </section>
    </>
  )
}