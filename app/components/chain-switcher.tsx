"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, AlertTriangle } from "lucide-react"
import { useWallet } from "@/app/hooks/use-wallet"
import { SUPPORTED_CHAINS, type SupportedChainId } from "@/app/lib/wallet"
import { toast } from "@/hooks/use-toast"

export function ChainSwitcher() {
  const { chainId, isChainSupported, switchChain, getChainName } = useWallet()

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

  if (!chainId) {
    return null
  }

  const isUnsupported = !isChainSupported(chainId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`border-purple-500/50 hover:bg-purple-500/10 ${
            isUnsupported ? "border-red-500/50 text-red-400" : "text-purple-400"
          }`}
        >
          {isUnsupported && <AlertTriangle className="w-4 h-4 mr-2" />}
          {getChainName(chainId)}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 border-purple-500/30">
        {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => {
          const chainIdNum = Number(id) as SupportedChainId
          const isActive = chainId === chainIdNum

          return (
            <DropdownMenuItem
              key={id}
              onClick={() => !isActive && handleSwitchChain(chainIdNum)}
              className={`cursor-pointer ${
                isActive
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span>{chain.name}</span>
                {isActive && <Badge className="bg-purple-500/30 text-purple-400 text-xs">Active</Badge>}
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
