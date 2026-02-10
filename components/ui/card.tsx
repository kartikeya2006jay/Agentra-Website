import { ReactNode } from "react"
import clsx from "clsx"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-800 bg-black/40 p-8 backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  )
}