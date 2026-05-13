import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers";

const mona_sans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

const dm_Sans = localFont({
	src: "./fonts/DMSans-Variable.ttf",
	variable: "--font-dm-sans",
})

export const metadata: Metadata = {
	title: "Next.js Boilerplate | Franck NIAT",
	description: "A Next.js boilerplate with TypeScript, Tailwind CSS, shadcn UI and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${dm_Sans.className} ${mona_sans.variable} antialiased tracking-normal`}
			>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
