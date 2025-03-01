import { Inter } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${inter.variable}`}>
      <body className="min-h-screen bg-white text-black">
        <header className="fixed w-full top-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
          <div className="content-container py-4 flex items-center justify-between">
            <LocalizedClientLink href="/" className="text-2xl font-bold tracking-tighter hover:text-ui-fg-base">
              YEEZY
            </LocalizedClientLink>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="nav-link">Collections</a>
              <LocalizedClientLink href="/store" className="nav-link">Shop</LocalizedClientLink>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Contact</a>
            </nav>
            <div className="flex items-center space-x-6">
              <LocalizedClientLink href="/account" className="nav-link">
                Account
              </LocalizedClientLink>
              <Suspense fallback={
                <LocalizedClientLink href="/cart" className="nav-link">
                  Cart (0)
                </LocalizedClientLink>
              }>
                <CartButton />
              </Suspense>
            </div>
          </div>
        </header>
        <main className="relative pt-20 min-h-screen">
          {props.children}
        </main>
        <footer className="bg-black text-white py-16">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">YEEZY</h3>
                <p className="text-gray-400">Modern fashion redefined.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
