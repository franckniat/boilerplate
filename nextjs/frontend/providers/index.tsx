"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ProgressProvider
				height="4px"
				color="#fffd00"
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
