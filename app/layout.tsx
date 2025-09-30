import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liga Deals Berlin | מועדון הטבות בברלין",
  description: "Liga Deals Berlin - מועדון הטבות מוביל בברלין. מאמרים, המלצות, וכל מה שצריך לדעת על החיים בברלין",
  keywords: ["ברלין", "הטבות", "מועדון", "גרמניה", "Berlin", "deals", "discounts"],
  authors: [{ name: "Liga Deals Berlin" }],
  openGraph: {
    title: "Liga Deals Berlin | מועדון הטבות בברלין",
    description: "מועדון הטבות מוביל בברלין - מאמרים, המלצות וטיפים",
    type: "website",
    locale: "he_IL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${assistant.variable} antialiased font-[var(--font-heebo)] min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
