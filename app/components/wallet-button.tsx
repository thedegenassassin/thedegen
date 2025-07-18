"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Settings, AlertTriangle } from "lucide-react"
import { useWallet } from "@/app/hooks/use-wallet"
import { SUPPORTED_CHAINS, type SupportedChainId } from "@/app/lib/wallet"
import { WalletModal } from "./wallet-modal"
import { toast } from "@/hooks/use-toast"

export function WalletButton() {
  const {
    isConnected,
    address,
    balance,
    chainId,
    isConnecting,
    formatAddress,
    getChainName,
    isChainSupported,
    switchChain,
    disconnect,
  } = useWallet()

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleViewOnExplorer = () => {
    if (address && chainId) {
      let explorerUrl = ""
      switch (chainId) {
        case 1:
          explorerUrl = `https://etherscan.io/address/${address}`
          break
        case 137:
          explorerUrl = `https://polygonscan.com/address/${address}`
          break
        case 56:
          explorerUrl = `https://bscscan.com/address/${address}`
          break
        case 11155111:
          explorerUrl = `https://sepolia.etherscan.io/address/${address}`
          break
        default:
          return
      }
      window.open(explorerUrl, "_blank")
    }
  }

  const handleSwitchChain = async (newChainId: SupportedChainId) => {
    try {
      await switchChain(newChainId)
      toast({
        title: "Network switched",
        description: `Switched to ${SUPPORTED_CHAINS[newChainId].name}`,
      })
    } catch (error) {
      toast({
        title: "Failed to switch network",
        description: "Please try again or switch manually in your wallet",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setIsWalletModalOpen(true)}
          disabled={isConnecting}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
        <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
      </>
    )
  }

  const isUnsupportedChain = chainId && !isChainSupported(chainId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 min-w-[200px]">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium">{formatAddress(address!)}</div>
              <div className="text-xs text-gray-400">
                {balance ? `${Number.parseFloat(balance).toFixed(4)} ETH` : "0 ETH"}
              </div>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 border-purple-500/30 w-80" align="end">
        <div className="p-4 space-y-3">
          {/* Wallet Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Wallet Address</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="p-1 h-auto text-purple-400 hover:text-purple-300"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="font-mono text-sm text-white">{address}</div>
          </div>

          {/* Balance */}
          <div className="space-y-1">
            <span className="text-sm text-gray-400">Balance</span>
            <div className="text-lg font-semibold text-white">
              {balance ? `${Number.parseFloat(balance).toFixed(4)} ETH` : "0 ETH"}
            </div>
          </div>

          {/* Network */}
          <div className="space-y-2">
            <span className="text-sm text-gray-400">Network</span>
            <div className="flex items-center justify-between">
              <Badge
                variant={isUnsupportedChain ? "destructive" : "secondary"}
                className={isUnsupportedChain ? "bg-red-500/20 text-red-400" : "bg-purple-500/20 text-purple-400"}
              >
                {isUnsupportedChain && <AlertTriangle className="w-3 h-3 mr-1" />}
                {chainId ? getChainName(chainId) : "Unknown"}
              </Badge>
            </div>
          </div>

          {/* Network Switcher */}
          {isUnsupportedChain && (
            <div className="space-y-2">
              <span className="text-sm text-gray-400">Switch to supported network:</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
                  <Button
                    key={id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSwitchChain(Number(id) as SupportedChainId)}
                    className="text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    {chain.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-purple-500/30" />

        {/* Actions */}
        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 cursor-pointer"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleViewOnExplorer}
          className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuItem className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Wallet Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-purple-500/30" />

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
