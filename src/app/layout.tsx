import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Linn Myat Maung | Software Developer & AI Engineer",
  description:
    "Portfolio of Linn Myat Maung — Software Developer and AI Engineer specializing in React, TypeScript, LangChain, Next.js, and modern web technologies based in Yangon, Myanmar.",
  keywords: [
    "Software Developer",
    "AI Engineer",
    "React",
    "TypeScript",
    "LangChain",
    "Next.js",
    "Myanmar",
    "Linn Myat Maung",
    "Full Stack Developer",
  ],
  authors: [{ name: "Linn Myat Maung", url: "https://github.com/linnmyatmaung" }],
  creator: "Linn Myat Maung",
  openGraph: {
    title: "Linn Myat Maung | Software Developer & AI Engineer",
    description:
      "Portfolio of Linn Myat Maung — Software Developer and AI Engineer.",
    type: "website",
    locale: "en_US",
    siteName: "Linn Myat Maung Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linn Myat Maung | Software Developer & AI Engineer",
    description:
      "Portfolio of Linn Myat Maung — Software Developer and AI Engineer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
