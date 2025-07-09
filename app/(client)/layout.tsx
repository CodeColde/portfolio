import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import NavMenu from "../components/NavMenu";
import { GoogleAnalytics, } from "@next/third-parties/google";

const mainFont = Chakra_Petch({
	variable: "--font-chakra-petch",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Hayo Friese",
	description:
		"Hayo Friese's portfolio. Software engineer, product manager, and UX designer.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${mainFont.className} antialiased`}>
				<NavMenu />
				{children}
			</body>
			<GoogleAnalytics gaId="G-4YQBDC3X3W" />
		</html>
	);
}
