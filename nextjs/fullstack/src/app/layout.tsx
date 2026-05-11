import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Analytics } from "@vercel/analytics/next";


const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next.js Fullstack Boilerplate",
	description:
		"Boilerplate fullstack moderne avec Next.js, shadcn/ui, Prisma, PostgreSQL et auth prête à l'emploi.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body
				className={`${spaceGrotesk.className} tracking-normal antialiased`}
			>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
