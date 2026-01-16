import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Holo Hive APAC | Korea & China Growth for Web3 Projects",
  description: "Real traction in Korea and China for funded Web3 projects. Not translated tweets. Not inflated reports. Seoul-based team working with Western founders since 2021.",
  keywords: ["Web3", "Korea", "China", "crypto marketing", "Asia expansion", "blockchain", "Web3 growth"],
  openGraph: {
    title: "Holo Hive APAC | Korea & China Growth for Web3 Projects",
    description: "Real traction in Korea and China for funded Web3 projects. Seoul-based team working with Western founders since 2021.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holo Hive APAC | Korea & China Growth for Web3 Projects",
    description: "Real traction in Korea and China for funded Web3 projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
