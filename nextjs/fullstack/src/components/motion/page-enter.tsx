"use client"

import { motion, type HTMLMotionProps } from "motion/react"
import { pageEnter } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

export function PageEnter({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </motion.div>
  )
}
