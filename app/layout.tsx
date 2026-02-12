import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { bricolageGrotesque, dmSans }  from "./fonts";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather app built with Next.js 13 and OpenWeather API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolageGrotesque.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
