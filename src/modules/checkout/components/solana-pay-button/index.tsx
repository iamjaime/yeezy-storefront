"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { createQR, encodeURL } from '@solana/pay'
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useCallback, useMemo, useRef } from 'react'
import { Button } from "@medusajs/ui"
import BigNumber from 'bignumber.js'

type SolanaPayButtonProps = {
  amount: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const SolanaPayButton = ({ amount, onSuccess, onError }: SolanaPayButtonProps) => {
  const { publicKey, connected } = useWallet()
  const qrRef = useRef<HTMLDivElement>(null)

  // You can change this to mainnet-beta for production
  const connection = useMemo(
    () => new Connection(clusterApiUrl('devnet'), 'confirmed'),
    []
  )

  // Replace with your shop's Solana wallet address
  const shopAddress = new PublicKey('7YB2bPF5Ny4vxuYX9qpXzkVB7K6DQuv12ms2gZHvKGVM')

  const createPayment = useCallback(async () => {
    try {
      if (!publicKey) throw new Error('Wallet not connected')

      // Convert amount to LAMPORTS as BigNumber
      const lamports = new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL)

      // Create the payment URL
      const url = encodeURL({
        recipient: shopAddress,
        amount: lamports,
        reference: publicKey,
        label: 'YEEZY Store Purchase',
        message: 'Thanks for your purchase!',
        memo: 'Store purchase transaction',
      })

      // Create the QR code
      const qr = createQR(url)
      
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        qr.append(qrRef.current)
      }

      // Monitor the transaction
      try {
        const latestBlockhash = await connection.getLatestBlockhash()
        const signature = await connection.requestAirdrop(publicKey, lamports.toNumber())
        
        const confirmation = await connection.confirmTransaction({
          signature,
          ...latestBlockhash
        })

        if (confirmation.value.err === null) {
          onSuccess?.()
        } else {
          throw new Error('Transaction failed')
        }
      } catch (error) {
        throw new Error('Transaction confirmation failed')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      onError?.(error as Error)
    }
  }, [amount, connection, onError, onSuccess, publicKey, shopAddress])

  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton />
      {connected && (
        <Button
          onClick={() => createPayment()}
          className="w-full"
          size="large"
        >
          Pay with Solana
        </Button>
      )}
      <div ref={qrRef} className="w-64 h-64" />
    </div>
  )
}

export default SolanaPayButton 