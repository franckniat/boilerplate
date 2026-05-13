"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";
import { ProgressProvider } from '@bprogress/next/app';
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors closeButton />
            <ProgressProvider
                height="3px"
                color="#525252"
                options={{ showSpinner: false }}
                shallowRouting
            >
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ProgressProvider>
        </ThemeProvider>
    );
}
