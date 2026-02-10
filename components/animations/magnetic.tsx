"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Magnetic({
  children,
}: {
  children: ReactNode
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}