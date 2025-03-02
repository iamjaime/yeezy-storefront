import { Inter } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Account from "@modules/common/icons/account"
import ShoppingBag from "@modules/common/icons/shopping-bag"

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
      <body className="flex flex-col min-h-screen bg-white text-black">
        <header className="fixed w-full top-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
          <div className="content-container h-16 flex items-center justify-between">
            <LocalizedClientLink href="/" className="text-2xl font-bold tracking-tighter hover:text-ui-fg-base">
              YEEZY
            </LocalizedClientLink>
            <div className="flex items-center">
              {/* <LocalizedClientLink href="/account" className="w-12 h-12 flex items-center justify-center hover:text-gray-600">
                <Account size={24} />
              </LocalizedClientLink> */}
              <Suspense fallback={
                <div className="w-12 h-12 flex items-center justify-center">
                  <ShoppingBag size={24} />
                </div>
              }>
                <div className="w-12 h-12 flex items-center justify-center">
                  <CartButton />
                </div>
              </Suspense>
            </div>
          </div>
        </header>
        <main className="flex-1 pt-16">
          {props.children}
        </main>
        <footer className="mt-auto bg-black text-white py-16">
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
