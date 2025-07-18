"use client"

import { useState, useEffect } from "react"
import { walletService, type WalletState, type WalletInfo, type SupportedChainId } from "@/app/lib/wallet"

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>(walletService.getState())

  useEffect(() => {
    const unsubscribe = walletService.subscribe(setWalletState)
    return unsubscribe
  }, [])

  const connectMetaMask = async (): Promise<WalletInfo | null> => {
    try {
      return await walletService.connectMetaMask()
    } catch (error) {
      console.error("Failed to connect MetaMask:", error)
      return null
    }
  }

  const connectWalletConnect = async (): Promise<WalletInfo | null> => {
    try {
      return await walletService.connectWalletConnect()
    } catch (error) {
      console.error("Failed to connect WalletConnect:", error)
      return null
    }
  }

  const connectCoinbaseWallet = async (): Promise<WalletInfo | null> => {
    try {
      return await walletService.connectCoinbaseWallet()
    } catch (error) {
      console.error("Failed to connect Coinbase Wallet:", error)
      return null
    }
  }

  const switchChain = async (chainId: SupportedChainId): Promise<void> => {
    try {
      await walletService.switchChain(chainId)
    } catch (error) {
      console.error("Failed to switch chain:", error)
    }
  }

  const disconnect = (): void => {
    walletService.disconnect()
  }

  const formatAddress = (address: string): string => {
    return walletService.formatAddress(address)
  }

  const getChainName = (chainId: number): string => {
    return walletService.getChainName(chainId)
  }

  const isChainSupported = (chainId: number): boolean => {
    return walletService.isChainSupported(chainId)
  }

  return {
    ...walletState,
    connectMetaMask,
    connectWalletConnect,
    connectCoinbaseWallet,
    switchChain,
    disconnect,
    formatAddress,
    getChainName,
    isChainSupported,
  }
}
