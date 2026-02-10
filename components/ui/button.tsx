"use client"

import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
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
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition",
        variant === "primary" &&
          "bg-white text-black hover:bg-gray-200",
        variant === "secondary" &&
          "border border-white text-white hover:bg-white hover:text-black",
        className
      )}
    >
      {children}
    </button>
  )
}