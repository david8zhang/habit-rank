import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Habit Rank',
  description: 'A habit tracking app which incorporates a rank-based progression system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark text-foreground bg-background'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
