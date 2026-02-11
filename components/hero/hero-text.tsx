"use client"

import { motion } from "framer-motion"
import Button from "@/components/ui/button"
import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"

export default function HeroText() {
  return (
    <div className="relative mx-auto max-w-5xl text-center px-6 py-28 overflow-hidden">

      {/* Soft Radial Spotlight */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl opacity-60" />
      </div>

      <Reveal>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05]"
        >
          <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            We engineer digital experiences
          </span>

          <span className="block mt-6 text-gray-400 relative">
            where{" "}
            <span className="text-white font-medium relative">
              design
            </span>{" "}
            meets{" "}
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              performance
            </motion.span>
          </span>
        </motion.h1>
      </Reveal>

      <Reveal delay={0.15}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Agentra is a premium digital agency focused on building
          fast, scalable, and motion-driven products that feel as good
          as they perform.
        </motion.p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-6">
          <Magnetic>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button className="px-8 py-4 text-base shadow-lg shadow-blue-500/20">
                Start a project
              </Button>
            </motion.div>
          </Magnetic>

          <Magnetic>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="secondary"
                className="px-8 py-4 text-base"
              >
                View work
              </Button>
            </motion.div>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  )
}