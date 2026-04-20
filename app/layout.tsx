import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif'
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Nails @ Bri\'s | Luxury Nail Studio',
  description: 'Reserve your appointment with ease. Elegant nail services, premium care, and a seamless booking experience at Nails @ Bri\'s Luxury Nail Studio.',
  keywords: ['nail salon', 'luxury nails', 'nail art', 'manicure', 'gel nails', 'acrylic nails', 'South Africa'],
  authors: [{ name: 'Bridget Chisangwa' }],
  openGraph: {
    title: 'Nails @ Bri\'s | Luxury Nail Studio',
    description: 'Reserve your appointment with ease. Elegant nail services, premium care, and a seamless booking experience.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#C4A46F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
