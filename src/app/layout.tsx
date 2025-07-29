import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sunny-mood-project.vercel.app'),
  title: "💕เราคิดไรอยู่กันนะ💕",
  description:
    "มาฟังเสียงหัวใจของเราซะเส้....... ⚠️ เว็บนี้ทำมาเพื่อคนพิเศษเท่านั้น หากคุณไม่ใช่คนพิเศษ โปรดเลี่ยงออกไป! 💔",
  keywords:
    "ความรัก, คนพิเศษ, หัวใจ, ข้อความรัก, เว็บสำหรับคนรัก, คนไม่ใช่อย่าเข้า",
  authors: [{ name: "ArthitDev", url: "https://sunny-mood-project.vercel.app" }],
  creator: "ArthitDev 💕",
  openGraph: {
    title: "💕 ซัน - เว็บสำหรับคนพิเศษเท่านั้น! 💕",
    description:
      "⚠️ คำเตือน: เว็บนี้สร้างมาเพื่อคนพิเศษของ หากคุณไม่ใช่คนพิเศษ จะเลี่ยนมาก ๆ นะ! 555 💔 มาฟังเสียงหัวใจของซันกันเถอะ 💖",
    type: "website",
    locale: "th_TH",
    siteName: "ArthitDev 💕",
    images: [
      {
        url: "/pv.png",
        width: 1200,
        height: 630,
        alt: "💕 ซัน - เว็บสำหรับคนพิเศษเท่านั้น! คนไม่ใช่อย่าเข้า จะเลี่ยนนะ! 💔",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "💕 ซัน - เว็บสำหรับคนพิเศษเท่านั้น! 💕",
    description:
      "⚠️ หากคุณไม่ใช่คนพิเศษของซัน โปรดเลี่ยงออกไป! จะเลี่ยนมาก ๆ นะ 555 💔",
    creator: "@ArthitDev",
    images: ["/pv.png"],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    "max-video-preview": -1,
    "max-image-preview": "none",
    "max-snippet": -1,
  },
  other: {
    warning: "เว็บนี้ทำมาเพื่อคนพิเศษเท่านั้น",
    audience: "มอบให้คนพิเศษของผม",
    "access-restriction": "คนไม่ใช่อย่าเข้ามามันเลี่ยนน !",
    "love-level": "สูงมาก 💕💕💕",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
