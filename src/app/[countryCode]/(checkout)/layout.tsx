import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BackArrow from "@modules/common/icons/back-arrow"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1"
            data-testid="back-to-cart-link"
          >
            <BackArrow />
          </LocalizedClientLink>
          <div className="flex-1" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
