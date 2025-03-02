"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Heading, Button } from "@medusajs/ui"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import SolanaPayButton from "@modules/checkout/components/solana-pay-button"

const CheckoutForm = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const [shippingMethods, setShippingMethods] = useState<HttpTypes.StoreCartShippingOption[]>([])
  const [paymentMethods, setPaymentMethods] = useState<HttpTypes.StorePaymentProvider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isOpen = searchParams.get("step")

  useEffect(() => {
    if (isOpen) {
      const element = document.getElementById(isOpen)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [isOpen])

  useEffect(() => {
    const loadMethods = async () => {
      if (!cart) return

      try {
        const [shipping, payment] = await Promise.all([
          listCartShippingMethods(cart.id),
          listCartPaymentMethods(cart.region?.id ?? "")
        ])

        if (shipping) setShippingMethods(shipping)
        if (payment) setPaymentMethods(payment)

        if (!shipping || shipping.length === 0) {
          setError("No shipping methods available for your region")
        } else if (!payment || payment.length === 0) {
          setError("No payment methods available for your region")
        } else {
          setError(null)
        }
      } catch (error) {
        console.error("Error loading checkout methods:", error)
        setError("Error loading checkout methods. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadMethods()
  }, [cart])

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(cart.id)
    } catch (error) {
      console.error("Error placing order:", error)
      setError("Failed to place order. Please try again.")
    }
  }

  if (!cart || isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ui-border-base mx-auto mb-4"></div>
          <p className="text-ui-fg-base">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <div className="text-center">
          <p className="text-ui-fg-error mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-4 small:px-8">
        <Heading
          level="h1"
          className="text-2xl-semi uppercase mb-6"
          data-testid="checkout-form-header"
        >
          Checkout
        </Heading>
      </div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>

        <div>
          <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        </div>

        <div>
          <Payment cart={cart} availablePaymentMethods={paymentMethods} />
        </div>

        <div>
          <Review cart={cart}>
            <div className="mt-4">
            
            <SolanaPayButton 
              amount={10}
              onPlaceOrder={() => {}}
              useSplToken={true}
              splTokenAddress="4E8Y48BCK1CDEaupUXW3xH9Hd6bZZdb4qBeRxfqeq3Md"  // USDC address
              splTokenTicker="LTHOT"
              splTokenDecimals={6}  // USDC has 6 decimals
            />
            </div>
          </Review>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
