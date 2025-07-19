"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

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
				{children}
			</ProgressProvider>
		</ThemeProvider>
	);
}
