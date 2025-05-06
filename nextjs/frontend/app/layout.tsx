import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const mona_sans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

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
		<html lang="en">
			<body
				className={`${mona_sans.className} ${mona_sans.variable} antialiased tracking-normal`}
			>
				{children}
			</body>
		</html>
	);
}
