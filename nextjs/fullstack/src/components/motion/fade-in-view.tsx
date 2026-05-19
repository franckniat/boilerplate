"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"
import { viewportOnce } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

type FadeInViewProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
}

export function FadeInView({
  children,
  className,
  delay = 0,
  ...props
}: FadeInViewProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <motion.div className={cn(className)} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
