import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'YouResepi',
  description: 'Dapatkan Resepi Masakan Dari Video Youtube Masak-Masak Kegemaran Anda!',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}         <Toaster />
	  </body>
    </html>
  )
}
