"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Wallet, ExternalLink, AlertCircle } from "lucide-react"
import { useWallet } from "@/app/hooks/use-wallet"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using browser wallet",
    icon: "🦊",
    installUrl: "https://metamask.io/download/",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect using mobile wallet",
    icon: "📱",
    installUrl: "https://walletconnect.com/",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect using Coinbase",
    icon: "🔵",
    installUrl: "https://www.coinbase.com/wallet",
  },
]

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { isConnecting, error, connectMetaMask, connectWalletConnect, connectCoinbaseWallet } = useWallet()

  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId)

    try {
      let result = null

      switch (walletId) {
        case "metamask":
          result = await connectMetaMask()
          break
        case "walletconnect":
          result = await connectWalletConnect()
          break
        case "coinbase":
          result = await connectCoinbaseWallet()
          break
        default:
          throw new Error("Unsupported wallet")
      }

      if (result) {
        onClose()
      }
    } catch (error) {
      console.error(`Failed to connect ${walletId}:`, error)
    } finally {
      setConnectingWallet(null)
    }
  }

  const isWalletAvailable = (walletId: string): boolean => {
    switch (walletId) {
      case "metamask":
        return typeof window !== "undefined" && !!window.ethereum?.isMetaMask
      case "coinbase":
        return (
          typeof window !== "undefined" && (!!window.ethereum?.isCoinbaseWallet || !!window.coinbaseWalletExtension)
        )
      case "walletconnect":
        return true // WalletConnect is always available
      default:
        return false
    }
  }

  const getWalletInstallUrl = (walletId: string): string => {
    const wallet = wallets.find((w) => w.id === walletId)
    return wallet?.installUrl || "#"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-purple-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center">
            <Wallet className="w-6 h-6 mr-2 text-purple-400" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3 mt-6">
          {wallets.map((wallet) => {
            const isAvailable = isWalletAvailable(wallet.id)
            const isCurrentlyConnecting = connectingWallet === wallet.id

            return (
              <div key={wallet.id}>
                <Button
                  onClick={() => handleWalletConnect(wallet.id)}
                  disabled={isConnecting || !isAvailable}
                  variant="outline"
                  className="w-full p-4 h-auto border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-500/10 text-left disabled:opacity-50"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{wallet.icon}</div>
                      <div>
                        <div className="font-semibold text-white">{wallet.name}</div>
                        <div className="text-sm text-gray-400">{wallet.description}</div>
                      </div>
                    </div>
                    {isCurrentlyConnecting && <Loader2 className="w-5 h-5 animate-spin text-purple-400" />}
                  </div>
                </Button>

                {!isAvailable && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Not installed</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      <a
                        href={getWalletInstallUrl(wallet.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Install <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 space-y-3">
          <div className="text-center text-sm text-gray-400">
            By connecting a wallet, you agree to our{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </a>
          </div>

          <div className="text-center text-xs text-gray-500">
            New to Ethereum wallets?{" "}
            <a
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Learn more
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
