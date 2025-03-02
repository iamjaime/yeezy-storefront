"use client"

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'

// Import Solana wallet styles in a Next.js friendly way
import '@solana/wallet-adapter-react-ui/styles.css'

const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  // You can change this to 'mainnet-beta' for production
  const network = WalletAdapterNetwork.Devnet

  // You can add more wallets here
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  )

  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default SolanaProvider 