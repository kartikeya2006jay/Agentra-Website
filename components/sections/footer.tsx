"use client"

import Reveal from "@/components/animations/reveal"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Left */}
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Agentra. All rights reserved.
            </p>

            {/* Right */}
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}