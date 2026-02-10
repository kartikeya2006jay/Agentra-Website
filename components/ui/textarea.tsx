"use client"

import { TextareaHTMLAttributes } from "react"
import clsx from "clsx"

export default function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-white focus:outline-none",
        className
      )}
    />
  )
}