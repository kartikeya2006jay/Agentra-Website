"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Agentra
        </Link>

        <div className="flex gap-6 text-sm text-gray-300 items-center">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/work" className="hover:text-white transition-colors">
            Work
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <a 
            href="/showcase.html" 
            className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-xs font-semibold text-blue-400 hover:text-white hover:border-blue-500/60 transition-all duration-300 hover:scale-105"
          >
            3D Showcase
          </a>
        </div>
      </nav>
    </header>
  )
}