"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeMember, setActiveMember] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!mounted || !isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewHeight = window.innerHeight
      const progress = Math.max(
        0,
        Math.min(1, (viewHeight - rect.top) / (rect.height * 0.7))
      )
      setScrollProgress(progress)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    particlesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.8 - 0.4,
      speedY: Math.random() * 0.8 - 0.4,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      particlesRef.current.forEach((p, i) => {
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = p.x - other.x
          const dy = p.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance/150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Glow effect
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 200, 255, 0.1)"
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 200, 255, 0.4)"
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mounted, isClient])

  if (!mounted) return null

  const teamMembers = [
    {
      name: "Varun Patil",
      roles: ["Chief Operating Officer (COO)", "Java Backend Developer", "Data Developer"],
      img: "VP",
      description: "Varun specializes in building robust and scalable backend systems using Java. He focuses on clean architecture, efficient code, and reliable APIs.\n\nDriven by problem-solving and performance optimization, he delivers stable, secure, and maintainable solutions aligned with both client and business goals.",
      color: "#3B82F6",
      gradient: "from-blue-500 via-cyan-500 to-blue-700",
      skills: ["Java", "Data Analysis", "Backend Architecture", "API Development", "System Design"]
    },
    {
      name: "Kartikeya Yadav",
      roles: ["Chief Data Officer (CDO)", "Co-Founder"],
      img: "KY",
      description: "Kartikeya is an AI enthusiast with strong expertise in intelligent chatbots and automation-driven systems. He works with Python, SQL, and Generative AI to build data-driven and conversational solutions.\n\nHis technical stack includes Ruby, AWS, and MongoDB, enabling scalable AI-backed applications with real-world impact.",
      color: "#8B5CF6",
      gradient: "from-purple-500 via-pink-500 to-purple-700",
      skills: ["GenAI", "Python", "Ruby", "Database Management", "AWS","Backend Development", "Data Analysis"]
    },
    {
      name: "Ankit Pandey",
      roles: ["Co-Founder"],
      img: "AP",
      description: "Ankit manages financial strategy, planning, and operational efficiency for the agency. With a strong background in Python, Agentic AI, and Excel, he bridges the gap between technical execution and business sustainability.\n\nHe ensures data-backed decision-making and optimized resource allocation across projects.",
      color: "#10B981",
      gradient: "from-green-500 via-emerald-500 to-green-700",
      skills: ["Agentic AI", "Machine Learning", "Python", "Financial Analysis", "Excel Automation"]
    },
    {
      name: "Shivendu Kumar",
      roles: ["Chief Technology Officer (CTO)"],
      img: "SK",
      description: "Shivendu leads the technical vision and architecture of the agency. His core expertise lies in C++ backend development, AI/ML systems, and modern frontend development using React.\n\nHe oversees system design, technology choices, and engineering standards to ensure scalable, high-performance, and future-ready solutions.",
      color: "#F59E0B",
      gradient: "from-amber-500 via-orange-500 to-amber-700",
      skills: ["AI/ML", "React", "C++", "System Architecture", "Frontend Development", "Technical Leadership"]
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-40 overflow-hidden min-h-screen"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: 0.4,
          filter: `blur(${scrollProgress * 1.5}px) brightness(${0.8 + scrollProgress * 0.4})`
        }}
      />

      {/* Animated Grid */}
      {isClient && (
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            backgroundPosition: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`,
            transform: `translateY(${scrollProgress * -200}px) scale(${1 + scrollProgress * 0.1})`
          }}
        />
      )}

      {/* Floating Tech Icons */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['</>', '{ }', '=>', '()', '[]', 'AI', 'API', 'DB', 'λ', 'σ', 'π'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-8xl font-mono"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360
              }}
              animate={{
                y: [null, Math.random() * 100 - 50],
                rotate: [null, 360],
                x: [null, Math.random() * 50 - 25]
              }}
              transition={{
                duration: 30 + Math.random() * 30,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      )}

      {/* Dynamic Light Effects */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`,
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mx-auto max-w-4xl text-center mb-32"
        >
          <div className="relative inline-block mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                About Agentra
              </span>
            </h1>
            
            <motion.div 
              className="absolute -bottom-4 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
            />
          </div>

          <div className="space-y-8">
            <motion.p 
              className="text-2xl text-gray-200 leading-relaxed backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-blue-300 font-bold">Agentra</span> is a four-member digital studio focused on building{" "}
              <motion.span 
                className="text-white font-extrabold inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                fast
              </motion.span>
              {", "}
              <motion.span 
                className="text-white font-extrabold inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.8)",
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                reliable
              </motion.span>
              {", and "}
              <motion.span 
                className="text-white font-extrabold inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.8)",
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                high-quality
              </motion.span>{" "}
              web experiences.
            </motion.p>

            <motion.p 
              className="text-xl text-gray-300 leading-relaxed backdrop-blur-lg bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/15 shadow-xl shadow-purple-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              We work as a small, focused team where each member owns a clear role,
              allowing us to move quickly without sacrificing quality.
            </motion.p>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mx-auto mb-32 max-w-5xl"
        >
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-cyan-500/50" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="mb-24 text-right pr-12"
              >
                <div className="inline-block bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Philosophy</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Simple, intentional process that emphasizes collaboration, 
                    clarity in design, and performance-focused development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="mb-24 pl-12"
              >
                <div className="inline-block bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Core Principles</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Every decision is guided by three key principles:
                  </p>
                  <ul className="space-y-3">
                    {[
                      { text: "Usability", desc: "User Experience First", color: "blue-500" },
                      { text: "Scalability", desc: "Future-Proof Architecture", color: "purple-500" },
                      { text: "Reliability", desc: "Sustainable Solutions", color: "cyan-500" }
                    ].map((principle, i) => (
                      <motion.li
                        key={principle.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + i * 0.2 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className={`w-3 h-3 rounded-full bg-${principle.color} animate-pulse`} />
                        <span className="text-white font-medium">{principle.text}</span>
                        <span className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          — {principle.desc}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-32"
        >
          <div className="text-center mb-20">
            <motion.h2 
              className="text-5xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              The passionate individuals behind Agentra's success
            </motion.p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 2.6 + index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
                onMouseEnter={() => setActiveMember(member.name)}
                onMouseLeave={() => setActiveMember(null)}
              >
                <div 
                  className={`absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  style={{ 
                    background: `linear-gradient(45deg, ${member.color}40, ${member.color}20, transparent)`
                  }}
                />

                <div 
                  className={`relative rounded-2xl backdrop-blur-xl p-8 transition-all duration-500 ${
                    activeMember === member.name 
                      ? 'bg-gradient-to-br from-white/15 to-white/5 shadow-2xl scale-105' 
                      : 'bg-gradient-to-br from-white/10 to-white/5 shadow-xl'
                  }`}
                  style={{
                    border: `1px solid ${member.color}${activeMember === member.name ? '40' : '20'}`,
                    boxShadow: activeMember === member.name 
                      ? `0 25px 50px -12px ${member.color}40` 
                      : '0 20px 40px -10px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Avatar */}
                  <div className="relative mx-auto w-40 h-40 mb-8">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        rotate: 360,
                        scale: activeMember === member.name ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      style={{
                        background: `conic-gradient(from 0deg, ${member.color}40, ${member.color}80, ${member.color}40)`,
                        padding: '4px'
                      }}
                    />
                    
                    <div className="absolute inset-4 rounded-full bg-black/80 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: activeMember === member.name ? [1, 1.05, 1] : 1,
                          rotate: activeMember === member.name ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ 
                          scale: { duration: 2, repeat: Infinity },
                          rotate: { duration: 0.5 }
                        }}
                        className="text-4xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent"
                      >
                        {member.img}
                      </motion.div>
                    </div>
                  </div>

                  {/* Name */}
                  <motion.h3 
                    className="text-2xl font-bold text-center mb-4"
                    animate={{ 
                      backgroundPosition: activeMember === member.name ? '200%' : '0%'
                    }}
                    transition={{ duration: 1.5 }}
                    style={{
                      background: `linear-gradient(90deg, white, ${member.color}, white)`,
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    {member.name}
                  </motion.h3>

                  {/* Roles */}
                  <div className="space-y-2 mb-6">
                    {member.roles.map((role, i) => (
                      <motion.p
                        key={role}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3 + i * 0.1 }}
                        className="text-sm text-gray-300 text-center"
                      >
                        {role}
                      </motion.p>
                    ))}
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeMember === member.name ? 'auto' : 0,
                      opacity: activeMember === member.name ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                      {member.description}
                    </p>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: activeMember === member.name ? 1 : 0,
                      y: activeMember === member.name ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex flex-wrap gap-2 justify-center"
                  >
                    {member.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: activeMember === member.name ? 1 : 0,
                          opacity: activeMember === member.name ? 1 : 0
                        }}
                        transition={{ 
                          delay: activeMember === member.name ? index * 0.1 : 0,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/20 hover:scale-105 transition-transform cursor-default"
                        style={{
                          background: `rgba(${parseInt(member.color.slice(1, 3), 16)}, ${parseInt(member.color.slice(3, 5), 16)}, ${parseInt(member.color.slice(5, 7), 16)}, 0.1)`
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mouse Follower */}
      {isClient && (
        <div className="fixed pointer-events-none z-50">
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-blue-500/50"
            style={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              scale: { duration: 1, repeat: Infinity },
              opacity: { duration: 1, repeat: Infinity }
            }}
          />
        </div>
      )}

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900/50 backdrop-blur-sm z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

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
        
        body {
          overflow-x: hidden;
          cursor: none;
          background: #000;
        }
        
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #8B5CF6, #06B6D4);
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #7C3AED, #0891B2);
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </section>
  )
}