"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeMember, setActiveMember] = useState(null)
  const [is3DMode, setIs3DMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const section = sectionRef.current
      if (section) {
        const rect = section.getBoundingClientRect()
        const viewHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (viewHeight - rect.top) / (rect.height * 0.7)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    // Initialize particle system
    const initParticles = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      particlesRef.current = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(100, 200, 255, ${Math.random() * 0.3})`
      }))

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particlesRef.current.forEach(particle => {
          particle.x += particle.speedX
          particle.y += particle.speedY
          
          if (particle.x > canvas.width) particle.x = 0
          if (particle.x < 0) particle.x = canvas.width
          if (particle.y > canvas.height) particle.y = 0
          if (particle.y < 0) particle.y = canvas.height

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        })

        animationRef.current = requestAnimationFrame(animateParticles)
      }

      animateParticles()
    }

    initParticles()

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    // 3D mode toggle
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.ctrlKey) {
        setIs3DMode(!is3DMode)
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyPress)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const teamMembers = [
    {
      name: "Varun Patil",
      roles: ["Chief Operating Officer (COO)", "Java Backend Developer", "Data Developer"],
      img: "VP",
      description: "Varun specializes in building robust and scalable backend systems using Java. He focuses on clean architecture, efficient code, and reliable APIs.\n\nDriven by problem-solving and performance optimization, he delivers stable, secure, and maintainable solutions aligned with both client and business goals.",
      color: "#3B82F6",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Kartikeya Yadav",
      roles: ["Chief Data Officer (CDO)", "Co-Founder"],
      img: "KY",
      description: "Kartikeya is an AI enthusiast with strong expertise in intelligent chatbots and automation-driven systems. He works with Python, SQL, and Generative AI to build data-driven and conversational solutions.\n\nHis technical stack includes Ruby, AWS, and MongoDB, enabling scalable AI-backed applications with real-world impact.",
      color: "#8B5CF6",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Ankit Pandey",
      roles: ["Co-Founder"],
      img: "AP",
      description: "Ankit manages financial strategy, planning, and operational efficiency for the agency. With a strong background in Python, Agentic AI, and Excel, he bridges the gap between technical execution and business sustainability.\n\nHe ensures data-backed decision-making and optimized resource allocation across projects.",
      color: "#10B981",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Shivendu Kumar",
      roles: ["Chief Technology Officer (CTO)"],
      img: "SK",
      description: "Shivendu leads the technical vision and architecture of the agency. His core expertise lies in C++ backend development, AI/ML systems, and modern frontend development using React.\n\nHe oversees system design, technology choices, and engineering standards to ensure scalable, high-performance, and future-ready solutions.",
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-500"
    }
  ]

  return (
    <section ref={sectionRef} className="relative bg-black py-40 overflow-hidden min-h-screen">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: 0.3,
          filter: `blur(${scrollProgress * 2}px)`
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${50 + scrollProgress * 100}px ${50 + scrollProgress * 100}px`,
          transform: `translateY(${scrollProgress * -100}px)`
        }}
      />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['</>', '{ }', '=>', '()', '[]', 'AI', 'API', 'DB'].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5 text-6xl font-mono"
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
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            transform: `translate(-50%, -50%)`
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.2}px`,
            top: `${mousePosition.y * 0.2}px`,
            transform: `translate(-50%, -50%)`
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                About Agentra
              </span>
            </h1>
            <div 
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{
                transform: `scaleX(${scrollProgress})`,
                transformOrigin: 'left'
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative group"
          >
            <div className="mt-8 space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02]">
                <span className="text-blue-400 font-semibold">Agentra</span> is a four-member digital studio focused on building{" "}
                <span className="text-white font-bold animate-pulse inline-block">fast</span>,{" "}
                <span className="text-white font-bold" style={{ animationDelay: '0.2s' }}>reliable</span>, and{" "}
                <span className="text-white font-bold" style={{ animationDelay: '0.4s' }}>high-quality</span> web experiences.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02]">
                We work as a small, focused team where each member owns a clear role,
                allowing us to move quickly without sacrificing quality.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mx-auto mt-32 max-w-4xl"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 backdrop-blur-xl bg-gradient-to-br from-white/5 to-black/50 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <h2 className="text-2xl font-semibold text-white">How We Work</h2>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our process is simple and intentional. We collaborate closely,
                design with clarity, and build with performance in mind.
                Every decision is guided by{" "}
                <span className="relative group/word">
                  <span className="text-white font-semibold cursor-help">usability</span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 px-2 py-1 bg-blue-500 text-xs rounded whitespace-nowrap">
                    User Experience First
                  </div>
                </span>,{" "}
                <span className="relative group/word">
                  <span className="text-white font-semibold cursor-help">scalability</span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 px-2 py-1 bg-purple-500 text-xs rounded whitespace-nowrap">
                    Future-Proof Architecture
                  </div>
                </span>, and{" "}
                <span className="relative group/word">
                  <span className="text-white font-semibold cursor-help">long-term reliability</span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 px-2 py-1 bg-cyan-500 text-xs rounded whitespace-nowrap">
                    Sustainable Solutions
                  </div>
                </span>.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                By keeping the team small, we stay aligned, reduce friction, and
                deliver consistent results without unnecessary complexity.
              </p>

              {/* Animated Process Steps */}
              <div className="mt-8 flex justify-center gap-8">
                {['Plan', 'Design', 'Build', 'Launch'].map((step, index) => (
                  <motion.div
                    key={step}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-40"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The People Behind Agentra
              </span>
            </h2>
            <p className="text-gray-400">Meet our core team of experts</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="text-sm text-gray-500">
                Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded">Space</kbd> for 3D mode
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={is3DMode}
                  onChange={(e) => setIs3DMode(e.target.checked)}
                />
                <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm text-gray-300">3D Mode</span>
              </label>
            </div>
          </div>

          <div 
            className={`grid gap-8 ${is3DMode ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}
            style={{
              perspective: is3DMode ? '1000px' : 'none'
            }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: is3DMode ? 1.05 : 1.02,
                  rotateY: is3DMode ? 10 : 0,
                  rotateX: is3DMode ? -5 : 0,
                  z: 50
                }}
                className={`relative group ${is3DMode ? 'h-96' : ''}`}
                onMouseEnter={() => setActiveMember(member.name)}
                onMouseLeave={() => setActiveMember(null)}
              >
                <div 
                  className={`rounded-2xl border border-white/10 p-8 backdrop-blur-sm transition-all duration-500 ${
                    activeMember === member.name 
                      ? 'bg-gradient-to-br from-white/10 to-white/5 shadow-2xl' 
                      : 'bg-white/5'
                  }`}
                  style={{
                    transform: is3DMode ? `rotateY(${index * 15}deg) translateZ(${index * 20}px)` : 'none',
                    transformStyle: 'preserve-3d',
                    boxShadow: activeMember === member.name 
                      ? `0 0 40px ${member.color}40` 
                      : 'none'
                  }}
                >
                  {/* Avatar with Hover Effect */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div 
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.gradient} animate-spin-slow`}
                      style={{ animationPlayState: activeMember === member.name ? 'running' : 'paused' }}
                    ></div>
                    <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{member.img}</span>
                    </div>
                    
                    {/* Tech Badges */}
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      {['JS', 'AI', 'API', 'DB'].slice(0, index + 1).map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.6 + i * 0.1 }}
                          className="w-6 h-6 bg-black/80 rounded-full text-[10px] flex items-center justify-center text-white border border-white/20"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Name and Roles */}
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="space-y-1 mb-4">
                    {member.roles.map((role, i) => (
                      <motion.p
                        key={role}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + i * 0.1 }}
                        className="text-sm text-gray-300"
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
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                      {member.description}
                    </p>
                  </motion.div>

                  {/* Hover Indicator */}
                  <div 
                    className="absolute inset-0 rounded-2xl border-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      borderColor: member.color,
                      boxShadow: `inset 0 0 20px ${member.color}40`
                    }}
                  />
                </div>

                {/* Connection Lines in 3D Mode */}
                {is3DMode && index < teamMembers.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Projects', value: '50+', color: 'text-blue-400' },
              { label: 'Experience', value: '5+ years', color: 'text-purple-400' },
              { label: 'Technologies', value: '15+', color: 'text-cyan-400' },
              { label: 'Satisfaction', value: '100%', color: 'text-green-400' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
          transform: `scale(${activeMember ? 1.5 : 1})`,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
          boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`
        }}
      />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        body {
          overflow-x: hidden;
          cursor: none;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
          border-radius: 5px;
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