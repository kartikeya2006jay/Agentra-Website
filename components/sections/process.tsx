"use client"

import { useEffect, useState } from "react"
import Reveal from "@/components/animations/reveal"

const steps = [
  {
    no: "01",
    title: "Discover",
    desc: "We understand your brand, goals, and audience before anything else.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    no: "02",
    title: "Design",
    desc: "We craft visual systems and interactions that feel intentional.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500",
  },
  {
    no: "03",
    title: "Build",
    desc: "We develop fast, scalable, and maintainable experiences.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
  },
  {
    no: "04",
    title: "Launch",
    desc: "We polish, test, and ship with performance and impact in mind.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
  },
]

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Subtle radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.05),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-6">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              A Proven Process
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              We follow a structured methodology to deliver exceptional results at every stage of your project.
            </p>
          </div>
        </Reveal>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline line - desktop */}
          <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30" />
          </div>

          {/* Steps */}
          <div className="grid gap-16 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.no} delay={0.1 + i * 0.05}>
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(-1)}
                >
                  {/* Step connector - mobile */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-8 left-8 w-full h-px bg-gradient-to-r from-white/10 to-transparent md:hidden" />
                  )}

                  {/* Step card */}
                  <div className="relative">
                    {/* Background glow */}
                    <div className={`absolute -inset-4 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl border border-white/10 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.04]">
                      {/* Step indicator */}
                      <div className="relative flex items-center mb-8">
                        {/* Number circle */}
                        <div className="relative">
                          <div className={`absolute -inset-4 rounded-full bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                          <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                            <span className="text-lg font-semibold text-white">
                              {step.no}
                            </span>
                          </div>
                          
                          {/* Icon container */}
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity">
                              {step.icon}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      {/* Hover line */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-20 flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((step, i) => (
                <button
                  key={step.no}
                  onClick={() => setActiveStep(i)}
                  className="relative flex flex-col items-center group"
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeStep >= i 
                      ? `bg-gradient-to-br ${step.color}` 
                      : 'bg-gray-700'
                  }`}>
                    <div className={`absolute -inset-3 rounded-full ${step.color.replace('to-', 'via-')} opacity-0 ${
                      activeStep >= i ? 'opacity-20' : ''
                    } transition-opacity duration-300`} />
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-all duration-300 ${
                    activeStep >= i ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Reveal delay={0.3}>
          <div className="mt-24 text-center">
            <div className="inline-block relative">
              {/* Button background effect */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <button className="relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group">
                <span className="flex items-center gap-3">
                  Start Your Project
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
            
            <p className="mt-6 text-gray-400 text-sm">
              Get in touch to discuss how we can bring your vision to life
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}