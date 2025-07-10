import type { Metadata } from "next";

import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Hayo Portfolio - CMS",
	description: "Welcome to the CMS of Hayo's Portfolio",
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${montserrat.variable} antialiased`}>{children}</body>
		</html>
	);
}
