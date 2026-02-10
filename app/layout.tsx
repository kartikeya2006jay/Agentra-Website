import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/ui/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Agentra — Digital Experiences That Convert",
    template: "%s | Agentra",
  },
  description:
    "Agentra is a premium digital agency building cinematic, high-performance web experiences.",
  metadataBase: new URL("https://agentra.vercel.app"),
  openGraph: {
    title: "Agentra",
    description: "Cinematic digital experiences",
    type: "website",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        {/* Fixed navigation */}
        <Navbar />

        {/* Page content */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}