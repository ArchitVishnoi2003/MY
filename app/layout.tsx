import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'A Kingdom Built For You - A Royal Proposal Experience',
  description: 'A cinematic, emotionally immersive royal-themed proposal website with floating particles, animated roses, and magical micro-interactions.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#FFF6FB'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
