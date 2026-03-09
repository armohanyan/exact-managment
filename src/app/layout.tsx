import type { Metadata } from "next";
import {
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Serif,
  Noto_Serif_Armenian,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans-default",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display-default",
  display: "swap",
  weight: ["500", "600", "700"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-sans-armenian",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  variable: "--font-display-armenian",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Exact Management – Construction & Development Project Management",
  description:
    "Construction and development project management. We deliver your project on time, within budget, and with high quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSerif.variable} ${notoSansArmenian.variable} ${notoSerifArmenian.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
