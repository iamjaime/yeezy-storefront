"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { createQR, encodeURL, findReference, validateTransfer } from '@solana/pay'
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@medusajs/ui"
import BigNumber from 'bignumber.js'
import { useSearchParams } from 'next/navigation'

type SolanaPayButtonProps = {
  amount: number
  onPlaceOrder: () => void
  useSplToken?: boolean
  splTokenAddress?: string
  splTokenTicker?: string
  splTokenDecimals?: number
}

const SolanaPayButton = ({ 
  amount, 
  onPlaceOrder, 
  useSplToken = false,
  splTokenAddress,
  splTokenTicker = 'SOL',
  splTokenDecimals = 9
}: SolanaPayButtonProps) => {
  const { publicKey, connected } = useWallet()
  const qrRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrCode, setQrCode] = useState<any>(null)
  const [reference, setReference] = useState<PublicKey | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const isReviewStep = searchParams.get('step') === 'review'
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // You can change this to mainnet-beta for production
  const connection = useMemo(
    () => new Connection(clusterApiUrl('devnet'), {
      commitment: 'confirmed',
      wsEndpoint: clusterApiUrl('devnet').replace('https', 'wss')
    }),
    []
  )

  // Replace with your shop's Solana wallet address
  const shopAddress = new PublicKey('H2EBaCZyQQoDtmjm3HQMF7JkahTSEXad7Lkfv5kTn55E')

  const handlePaymentSuccess = () => {
    setPaymentComplete(true)
    setShowQR(false)
    setQrCode(null)
    setReference(null)
    setIsChecking(false)
  }

  // Monitor payment
  useEffect(() => {
    if (!reference || !showQR) return

    let timeoutId: NodeJS.Timeout
    let isCheckingPayment = false
    
    const checkPayment = async () => {
      if (isCheckingPayment) return
      
      isCheckingPayment = true
      try {
        console.log('Checking payment status...')
        const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
        
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: shopAddress,
            amount: new BigNumber(amount).multipliedBy(Math.pow(10, splTokenDecimals)),
            reference,
            ...(useSplToken && splTokenAddress ? { splToken: new PublicKey(splTokenAddress) } : {})
          }
        )

        handlePaymentSuccess()
      } catch (error) {
        // Only log non-"not found" errors
        if (!(error instanceof Error) || !error.message.includes('not found')) {
          console.error('Error monitoring payment:', error)
        } else {
          console.log('Payment not found, will check again in 60 seconds')
        }
        isCheckingPayment = false
        // Retry after 60 seconds
        timeoutId = setTimeout(checkPayment, 60000)
      }
    }

    // Initial check
    checkPayment()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      isCheckingPayment = false
    }
  }, [reference, showQR, connection, shopAddress, amount, useSplToken, splTokenAddress, splTokenDecimals])

  useEffect(() => {
    if (showQR && qrRef.current && qrCode) {
      const updateQRSize = () => {
        qrRef.current!.innerHTML = ''
        const containerSize = Math.min(qrRef.current!.offsetWidth, qrRef.current!.offsetHeight)
        const qr = createQR(qrCode.url, containerSize, 'white', 'black')
        qr.append(qrRef.current!)
      }

      // Initial render
      updateQRSize()

      // Update on window resize
      window.addEventListener('resize', updateQRSize)

      return () => {
        window.removeEventListener('resize', updateQRSize)
      }
    }
  }, [showQR, qrCode])

  const createPayment = useCallback(async () => {
    try {
      if (!publicKey) throw new Error('Wallet not connected')
      if (useSplToken && !splTokenAddress) throw new Error('SPL token address not provided')

      // Convert amount based on token decimals
      const tokenAmount = new BigNumber(amount).multipliedBy(Math.pow(10, splTokenDecimals))

      // Generate a new reference for this payment
      const newReference = Keypair.generate().publicKey
      setReference(newReference)

      // Create the payment URL
      const url = encodeURL({
        recipient: shopAddress,
        amount: tokenAmount,
        reference: newReference,
        label: 'YEEZY Store Purchase',
        message: 'Thanks for your purchase!',
        memo: 'Store purchase transaction',
        ...(useSplToken && splTokenAddress ? { splToken: new PublicKey(splTokenAddress) } : {})
      })

      // Store URL for later QR generation
      setQrCode({ url })
      setShowQR(true)
    } catch (error) {
      console.error('Error creating payment:', error)
      setShowQR(false)
      setQrCode(null)
      setReference(null)
    }
  }, [amount, publicKey, shopAddress, useSplToken, splTokenAddress, splTokenDecimals])

  if (!isReviewStep) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {!paymentComplete ? (
        <>
          <div className="w-full text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Pay with {useSplToken ? splTokenTicker : 'Solana'}</h3>
            <p className="text-gray-600">Complete your payment using {useSplToken ? splTokenTicker : 'Solana'} to proceed with the order.</p>
          </div>
          <WalletMultiButton />
          {connected && (
            <Button
              onClick={() => createPayment()}
              className="w-full"
              size="large"
            >
              Pay with {useSplToken ? splTokenTicker : 'Solana'}
            </Button>
          )}
          {showQR && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg w-full max-w-[500px]">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
                  <p className="text-gray-600">
                    Scan the QR code or send payment directly:
                  </p>
                </div>
                <div className="w-full h-[300px] mb-4">
                  <div ref={qrRef} className="w-full h-full flex items-center justify-center" />
                </div>
                <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">
                    Send <span className="font-semibold">{amount} {splTokenTicker}</span> to:
                  </p>
                  <div 
                    className="break-all font-mono text-sm p-3 bg-white rounded border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(shopAddress.toString())
                      // You could add a toast notification here
                    }}
                    title="Click to copy address"
                  >
                    {shopAddress.toString()}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setShowQR(false)
                    setQrCode(null)
                    setReference(null)
                    setIsChecking(false)
                  }}
                  className="w-full"
                  variant="secondary"
                  size="large"
                >
                  Cancel Payment
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Button
          onClick={onPlaceOrder}
          className="w-full"
          size="large"
        >
          Place Order
        </Button>
      )}
    </div>
  )
}

export default SolanaPayButton 