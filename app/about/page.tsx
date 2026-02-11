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
  const lettersRef = useRef<Array<{
    char: string
    x: number
    y: number
    opacity: number
    scale: number
  }>>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize cinematic animation
  useEffect(() => {
    if (!mounted || !cinematicCanvasRef.current) return

    const canvas = cinematicCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create letters for "ABOUT AGENTRA"
    const text = "ABOUT AGENTRA"
    lettersRef.current = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const spacing = 60

    for (let i = 0; i < text.length; i++) {
      lettersRef.current.push({
        char: text[i],
        x: centerX + (i - text.length / 2) * spacing,
        y: centerY,
        opacity: 0,
        scale: 0
      })
    }

    let startTime = Date.now()
    const duration = 3000 // 3 seconds cinematic

    const animateCinematic = () => {
      const elapsed = Date.now() - startTime
      cinematicProgress.current = Math.min(elapsed / duration, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw cinematic background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animate letters
      lettersRef.current.forEach((letter, i) => {
        const delay = i * 0.1
        const letterProgress = Math.max(0, (cinematicProgress.current - delay) / 0.8)

        if (letterProgress > 0) {
          // Fly-in animation
          const targetY = centerY
          const currentY = targetY + (1 - letterProgress) * 200
          const currentOpacity = Math.min(letterProgress * 2, 1)
          const currentScale = Math.min(letterProgress * 1.5, 1)

          // Draw glowing effect
          ctx.save()
          ctx.globalAlpha = currentOpacity * 0.3
          ctx.fillStyle = '#ffffff'
          for (let j = 0; j < 3; j++) {
            ctx.beginPath()
            ctx.arc(letter.x, currentY, 30 + j * 10, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()

          // Draw letter
          ctx.save()
          ctx.globalAlpha = currentOpacity
          ctx.fillStyle = '#ffffff'
          ctx.font = `bold ${80 * currentScale}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(letter.char, letter.x, currentY)
          ctx.restore()
        }
      })

      // Particle explosion effect at the end
      if (cinematicProgress.current > 0.8) {
        const explosionProgress = (cinematicProgress.current - 0.8) / 0.2
        const particleCount = 100
        const radius = 400 * (1 - explosionProgress)

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2
          const distance = radius * Math.random()
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - explosionProgress})`
          ctx.fill()
        }
      }

      if (cinematicProgress.current < 1) {
        cinematicRef.current = requestAnimationFrame(animateCinematic)
      } else {
        setTimeout(() => {
          setShowCinematic(false)
        }, 500)
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
    const particleCount = 3000
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: 0,
        speedY: 0,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
        color: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
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
      {/* Cinematic Intro */}
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
              opacity: 0.15
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCinematic ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 container mx-auto px-4 py-24"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                About Agentra
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ delay: 1.1, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                A premier digital studio of four experts dedicated to crafting{" "}
                <span className="text-white font-medium">fast</span>,{" "}
                <span className="text-white font-medium">reliable</span>, and{" "}
                <span className="text-white font-medium">high-quality</span>{" "}
                digital experiences.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                We operate as a focused, agile team where each member brings specialized expertise,
                enabling us to deliver exceptional results with precision and efficiency.
              </p>
            </motion.div>
          </motion.div>

          {/* Professional Team Grid - 2 columns with beautiful cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.5 + index * 0.15,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                {/* Beautiful Card with subtle glow and elegant styling */}
                <div className={`relative bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-black/50 backdrop-blur-sm rounded-3xl p-8 h-full ${member.borderColor} border shadow-2xl shadow-black/50`}>
                  
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  {/* Header with elegant spacing */}
                  <div className="relative mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{member.name}</h3>
                    <div className="space-y-1.5">
                      {member.roles.map((role, i) => (
                        <p key={i} className="text-gray-300 font-light text-sm flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${member.borderColor.split('-')[1]}-500/70`} />
                          {role}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Elegant divider */}
                  <div className={`w-12 h-0.5 bg-gradient-to-r from-${member.borderColor.split('-')[1]}-500/50 to-transparent mb-6`} />

                  {/* Description with refined typography */}
                  <p className="text-gray-300 leading-relaxed mb-8 font-light text-sm tracking-wide whitespace-pre-line">
                    {member.description}
                  </p>

                  {/* Skills with elegant badges */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span>Specializations</span>
                      <span className={`w-1 h-1 rounded-full bg-${member.borderColor.split('-')[1]}-500/70`} />
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {member.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.7 + index * 0.1 + i * 0.1 }}
                          className={`px-4 py-1.5 bg-black/60 backdrop-blur-sm text-gray-200 text-xs rounded-full border ${member.borderColor} shadow-lg shadow-black/30`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-${member.borderColor.split('-')[1]}-500/10 to-transparent rounded-bl-3xl`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Principles Section with beautiful cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="max-w-4xl mx-auto mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Our Principles
              </h2>
              <p className="text-gray-400 font-light">Guiding every decision we make</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Excellence",
                  description: "Uncompromising quality in every project",
                  icon: "★",
                  borderColor: "border-blue-500/30",
                  gradient: "from-blue-500/20"
                },
                {
                  title: "Innovation",
                  description: "Pushing boundaries with modern solutions",
                  icon: "⚡",
                  borderColor: "border-purple-500/30",
                  gradient: "from-purple-500/20"
                },
                {
                  title: "Collaboration",
                  description: "Synergistic teamwork for optimal results",
                  icon: "🤝",
                  borderColor: "border-green-500/30",
                  gradient: "from-green-500/20"
                }
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3 + index * 0.1 }}
                  className={`relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm rounded-2xl p-6 text-center ${principle.borderColor} border shadow-xl shadow-black/40 overflow-hidden`}
                >
                  {/* Elegant background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} to-transparent opacity-20`} />
                  
                  {/* Icon with glow */}
                  <div className="relative">
                    <div className="text-4xl mb-3">{principle.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{principle.title}</h3>
                    <p className="text-gray-400 text-sm font-light">{principle.description}</p>
                  </div>
                  
                  {/* Subtle corner accent */}
                  <div className={`absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl ${principle.gradient} to-transparent opacity-30 rounded-tl-2xl`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <style jsx global>{`
          @keyframes gradient {
            0%, 100% { 
              background-position: 0% 50%; 
            }
            50% { 
              background-position: 100% 50%; 
            }
          }
          
          .animate-gradient {
            background-size: 300% 300%;
            animation: gradient 6s ease infinite;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563EB, #7C3AED);
          }
        `}</style>
      </section>
    </>
  )
}