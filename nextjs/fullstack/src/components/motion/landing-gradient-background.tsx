"use client"

import { motion } from "motion/react"

export function LandingGradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.98_0.01_280)_0%,var(--background)_45%,var(--background)_100%)] dark:bg-[linear-gradient(180deg,oklch(0.18_0.04_280)_0%,var(--background)_40%,var(--background)_100%)]" />

      <motion.div
        className="absolute -left-[20%] top-[-10%] size-[55vw] max-w-[640px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.19_280/0.45)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,oklch(0.45_0.22_280/0.35)_0%,transparent_70%)]"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[5%] size-[50vw] max-w-[580px] rounded-full bg-[radial-gradient(circle,oklch(0.75_0.15_200/0.4)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,oklch(0.42_0.18_200/0.3)_0%,transparent_70%)]"
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-5%] left-[25%] size-[45vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.14_330/0.35)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,oklch(0.4_0.2_330/0.28)_0%,transparent_70%)]"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0_0_0/0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_75%)] dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)]" />
    </div>
  )
}
