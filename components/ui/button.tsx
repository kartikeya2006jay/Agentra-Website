"use client"

import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition will-change-transform",
        variant === "primary" &&
          "bg-white text-black hover:bg-gray-200",
        variant === "secondary" &&
          "bg-white/10 text-white hover:bg-white hover:text-black",
        variant === "outline" &&
          "border border-white/20 text-white bg-transparent hover:bg-white/10",
        className
      )}
    >
      {children}
    </button>
  )
}