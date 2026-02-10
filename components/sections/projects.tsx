"use client"

import Reveal from "@/components/animations/reveal"

const projects = [
  {
    title: "Agentra Website",
    tag: "Brand / Web",
    desc: "A cinematic agency website focused on motion, performance, and clarity.",
  },
  {
    title: "Product Landing Concept",
    tag: "UI / UX",
    desc: "High-conversion landing experience designed for modern startups.",
  },
  {
    title: "Interactive Design System",
    tag: "Design System",
    desc: "Reusable components, motion tokens, and scalable UI patterns.",
  },
]

export default function Projects() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Our projects
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-gray-400">
            A selection of internal and concept-driven work that reflects our
            approach to design and development.
          </p>
        </Reveal>

        <div className="mt-20 space-y-10">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.15 + i * 0.05}>
              <div className="group relative rounded-2xl border border-white/10 p-10">
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <span className="text-sm text-gray-500">
                      {p.tag}
                    </span>
                    <h3 className="mt-2 text-2xl font-medium">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-gray-400">
                      {p.desc}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 group-hover:text-gray-300 transition">
                    View project →
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}