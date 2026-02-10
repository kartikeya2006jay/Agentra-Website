"use client"

import { ReactNode } from "react"

interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative rounded-2xl bg-black p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}