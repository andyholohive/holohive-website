import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Holo Hive | Korea Market Activation for Web3 Projects",
  description: "Korea market activation for funded Web3 projects. $21.5M in presale deposits. $65K raised in 6 days. Seoul-based. 100+ launches.",
  keywords: ["Web3", "Korea", "crypto marketing", "Korea expansion", "blockchain", "Web3 growth"],
  openGraph: {
    title: "Holo Hive | Korea Market Activation for Web3 Projects",
    description: "Korea market activation for funded Web3 projects. $21.5M in presale deposits. $65K raised in 6 days. Seoul-based. 100+ launches.",
    type: "website",
    siteName: "Holo Hive",
    url: "https://holohive.io",
    images: [
      {
        url: "/og-background.jpeg",
        width: 1200,
        height: 630,
        alt: "Holo Hive - Korea Market Activation for Web3 Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holo Hive | Korea Market Activation for Web3 Projects",
    description: "Korea market activation for funded Web3 projects. $21.5M in presale deposits. $65K raised in 6 days. Seoul-based. 100+ launches.",
    images: ["/og-background.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How long does this take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "90 days for the full engagement. Creators go live in the first two weeks. Traction shows up in your analytics within 30 days. If we do not hit the agreed targets, we keep going at no extra cost.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does it cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Depends on scope. We will walk through it on the call. What we can say now: 100% of the creator budget goes directly to creators. We take zero cut on spend. Unused budget rolls forward.",
                  },
                },
                {
                  "@type": "Question",
                  name: "We already tried Korea and it did not work.",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "That is actually how most of our engagements start. The issue is usually not Korea. It is the approach. We have taken over from agencies with zero conversions and turned it around in weeks. Happy to walk through specifics on a call.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why don't you start with a Korean Telegram right away?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Empty rooms kill momentum. We fill the queue before we open the doors. Scarcity drives demand.",
                  },
                },
                {
                  "@type": "Question",
                  name: "We already have an agency. Why would we need you?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We do not replace your agency. We are the Korea layer. The local relationships, creator network, and distribution your global team cannot provide from outside the market.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What kind of projects do you work with?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Funded Web3 projects with an upcoming catalyst. Token launch, exchange listing, public sale, mainnet, major partnership. If you have something happening in the next 2-6 months that Korea should know about, you are probably a fit.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Holo Hive",
              url: "https://holohive.io",
              logo: "https://holohive.io/logo.png",
              description: "Korea market activation for funded Web3 projects.",
              sameAs: [
                "https://x.com/holohive_",
                "https://www.linkedin.com/company/holo-hive",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
