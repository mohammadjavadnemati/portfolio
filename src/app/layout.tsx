import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { Navbar } from "@/app/_components/navbar";
import { Footer } from "@/app/_components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.dev"),
  title: {
    default: "Mohammad Javad Nemati — Backend Developer",
    template: "%s | Mohammad Javad Nemati",
  },
  description:
    "Backend Developer with hands-on experience building REST APIs in Python (Django) and C# (ASP.NET Core).",
  openGraph: { type: "website", locale: "en_US", siteName: "Mohammad Javad Nemati" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}