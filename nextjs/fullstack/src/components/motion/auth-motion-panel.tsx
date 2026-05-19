"use client"

import { PageEnter } from "@/components/motion/page-enter"

export function AuthMotionPanel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageEnter className="flex flex-1 flex-col items-center justify-center">
      {children}
    </PageEnter>
  )
}
