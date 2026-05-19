import { Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AuthMotionPanel } from "@/components/motion/auth-motion-panel"


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Sparkles className="size-4" />
                        </div>
                        app logo.
                    </Link>
                </div>
                <AuthMotionPanel>{children}</AuthMotionPanel>
            </div>
            <div className="relative hidden overflow-hidden bg-linear-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 lg:block">
                <Image
                    src="/images/auth-banner.png"
                    width={1200}
                    height={1200}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.8] dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}