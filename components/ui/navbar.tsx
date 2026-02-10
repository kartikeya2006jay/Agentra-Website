"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Agentra
        </Link>

        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/work" className="hover:text-white">
            Work
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}