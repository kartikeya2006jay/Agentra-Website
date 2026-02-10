"use client"

import Reveal from "@/components/animations/reveal"

const services = [
  {
    title: "Brand Identity",
    desc: "Visual systems, logos, and design languages that scale with your product.",
  },
  {
    title: "Web Experiences",
    desc: "High-performance websites built with modern frameworks and motion.",
  },
  {
    title: "Motion & Interaction",
    desc: "Micro-interactions and animations that make interfaces feel alive.",
  },
  {
    title: "Product Design",
    desc: "UX/UI design focused on clarity, usability, and conversion.",
  },
]

export default function Services() {
  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-white/5 to-transparent" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What we do
            </h2>
            {/* Animated underline */}
            <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed">
            We help ambitious brands stand out through design,
            technology, and motion.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:gap-12">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.15 + i * 0.05}>
              <div className="group relative cursor-pointer">
                {/* Enhanced gradient hover effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:blur-md" />
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Glow effect container */}
                <div className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.03] group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                  {/* Icon/Number indicator */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-black font-bold text-sm shadow-lg">
                    {i + 1}
                  </div>
                  
                  {/* Animated title */}
                  <h3 className="text-2xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:to-purple-300">
                    {s.title}
                  </h3>
                  
                  {/* Description with enhanced styling */}
                  <p className="mt-4 text-gray-400 leading-relaxed transition-all duration-300 group-hover:text-gray-300 group-hover:pl-2 border-l-2 border-transparent group-hover:border-cyan-500/50">
                    {s.desc}
                  </p>
                  
                  {/* Hover arrow indicator */}
                  <div className="absolute top-8 right-8 opacity-0 transform -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Subtle particle effect dots */}
                  <div className="absolute bottom-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(3)].map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"
                        style={{ animationDelay: `${dotIndex * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl" />
      </div>
    </section>
  )
}