"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, AlertTriangle } from "lucide-react"
import { useWallet } from "@/app/hooks/use-wallet"
import { WalletButton } from "./wallet-button"
import { ChainSwitcher } from "./chain-switcher"

interface WalletGuardProps {
  children: ReactNode
  requireConnection?: boolean
  requireSupportedChain?: boolean
  fallback?: ReactNode
}

export function WalletGuard({
  children,
  requireConnection = true,
  requireSupportedChain = true,
  fallback,
}: WalletGuardProps) {
  const { isConnected, chainId, isChainSupported } = useWallet()

  // Check if wallet connection is required but not connected
  if (requireConnection && !isConnected) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Card className="bg-black/40 border-purple-500/30 max-w-md mx-auto">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-6">You need to connect your wallet to access this feature</p>
            <WalletButton />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Check if supported chain is required but current chain is unsupported
  if (requireSupportedChain && chainId && !isChainSupported(chainId)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Card className="bg-black/40 border-red-500/30 max-w-md mx-auto">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Unsupported Network</h3>
            <p className="text-gray-400 mb-6">Please switch to a supported network to continue</p>
            <ChainSwitcher />
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
