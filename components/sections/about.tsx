"use client"

import Image from "next/image"
import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"
import { Palette, Code2, Database, Rocket } from "lucide-react"

const team = [
  {
    name: "Member One",
    role: "Frontend Engineer",
    skill: "UI, Animations, Performance",
    work: "Designs and builds all visual components, animations, and interactions across the website.",
    image: "/team/image1.jpg"
  },
  {
    name: "Member Two",
    role: "Backend Engineer",
    skill: "APIs, Databases, Security",
    work: "Handles data flow, integrations, backend logic, and performance-critical systems.",
    image: "/team/image2.jpg"
  },
  {
    name: "Member Three",
    role: "Product Engineer",
    skill: "Logic, Features, Integrations",
    work: "Connects frontend and backend, builds core features, and ensures product reliability.",
    image: "/team/image3.jpg"
  },
  {
    name: "Member Four",
    role: "Strategy & UX",
    skill: "Brand, UX, Direction",
    work: "Defines product vision, user experience, and ensures consistency across the website.",
    image: "/team/image4.jpg"
  }
]

export default function About() {
  return (
    <section className="bg-black py-40">
      <div className="mx-auto max-w-6xl px-6">
        {/* Intro */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              The Team Behind Agentra
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              We are a four-member digital collective focused on building
              elegant, high-performance web experiences.  
              Each member plays a specialized role to deliver exceptional results.
            </p>
          </div>
        </Reveal>

        {/* Team grid */}
        <div className="mt-28 grid gap-12 md:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.15}>
              <Magnetic>
                <div className="group relative flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10">
                  
                  {/* Image */}
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    {/* Placeholder label */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-300 bg-black/40">
                      {member.image.includes("image1") && "image1"}
                      {member.image.includes("image2") && "image2"}
                      {member.image.includes("image3") && "image3"}
                      {member.image.includes("image4") && "image4"}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-medium">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {member.role} · {member.skill}
                    </p>

                    <p className="mt-4 text-gray-400 leading-relaxed">
                      {member.work}
                    </p>
                  </div>
                </div>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}