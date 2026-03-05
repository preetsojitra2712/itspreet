import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../src/app/globals.css";
import { Providers } from "@/components/providers";
import { profile } from "@/content/preet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://preet-sojitra.vercel.app"),
  title: `${profile.name} | ${profile.titles.join(" • ")}`,
  description:
    "FAANG-ready AI/ML/Software engineering portfolio with measurable impact, case studies, and recruiter-focused evidence.",
  openGraph: {
    title: `${profile.name} Portfolio`,
    description: profile.summary,
    type: "website",
    siteName: `${profile.name} Portfolio`,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
