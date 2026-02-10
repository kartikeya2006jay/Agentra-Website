"use client"

import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"
import Button from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative bg-black py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Let’s build something
            <span className="block text-gray-400">
              exceptional together
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
            Have an idea, product, or brand in mind?  
            We’d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Magnetic>
              <Button className="px-8 py-4 text-base">
                Start a project
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}