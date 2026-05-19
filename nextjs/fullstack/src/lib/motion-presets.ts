import type { Transition, Variants } from "motion/react"

export const easeOut = [0.22, 1, 0.36, 1] as const

export const transitionFast: Transition = {
  duration: 0.35,
  ease: easeOut,
}

export const transitionMedium: Transition = {
  duration: 0.5,
  ease: easeOut,
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionMedium,
  },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: transitionFast,
  },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitionMedium,
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionMedium,
  },
}

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionFast,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
}

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
}

export const viewportOnce = {
  once: true,
  margin: "-60px" as const,
}
