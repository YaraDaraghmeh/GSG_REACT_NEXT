import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'Keep track of your tasks efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}