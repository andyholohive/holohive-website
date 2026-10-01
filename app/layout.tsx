import type { Metadata } from 'next';
import './globals.css';
import './homepage.css';
import './editorial.css';
import './case-posters.css';
import './gallery.css';
import './craft.css'; // Shared Figma detail treatments.
import './approach.css';
import './refinement.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://www.holohive.io'),
  title: 'Holo Hive | Your team in Korea',
  description:
    'Build demand for your project in Korea. Strategy, creator relationships and campaigns that help Web3 teams attract users, investors and ecosystem partners.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Holo Hive | Your team in Korea',
    description:
      'Build demand for your project in Korea through local strategy, creator relationships and campaigns.',
    url: '/',
    siteName: 'Holo Hive',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holo Hive | Your team in Korea',
    description: 'See the work, client evidence and Korea Market Scan.',
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
