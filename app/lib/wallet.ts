import { ethers } from "ethers"
export { ethers }

export interface WalletInfo {
  address: string
  balance: string
  chainId: number
  provider: ethers.BrowserProvider
  signer: ethers.JsonRpcSigner
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  isConnecting: boolean
  error: string | null
}

export const SUPPORTED_CHAINS = {
  1: { name: "Ethereum Mainnet", symbol: "ETH", rpc: "https://mainnet.infura.io/v3/" },
  137: { name: "Polygon", symbol: "MATIC", rpc: "https://polygon-rpc.com/" },
  56: { name: "BSC", symbol: "BNB", rpc: "https://bsc-dataseed.binance.org/" },
  11155111: { name: "Sepolia Testnet", symbol: "ETH", rpc: "https://sepolia.infura.io/v3/" },
  // OP Stack Blockchains
  8453: { name: "Base", symbol: "ETH", rpc: "https://mainnet.base.org" },
  10: { name: "OP Mainnet", symbol: "ETH", rpc: "https://mainnet.optimism.io" },
  1946: { name: "Soneium", symbol: "ETH", rpc: "https://rpc.soneium.org" },
  57073: { name: "Ink", symbol: "ETH", rpc: "https://rpc-gel.inkonchain.com" },
  480: { name: "Worldchain", symbol: "ETH", rpc: "https://worldchain-mainnet.g.alchemy.com/public" },
  1135: { name: "Lisk", symbol: "ETH", rpc: "https://rpc.api.lisk.com" },
} as const

export type SupportedChainId = keyof typeof SUPPORTED_CHAINS

export class WalletService {
  private static instance: WalletService
  private listeners: Set<(state: WalletState) => void> = new Set()
  private state: WalletState = {
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    provider: null,
    signer: null,
    isConnecting: false,
    error: null,
  }

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService()
    }
    return WalletService.instance
  }

  private constructor() {
    this.initializeEventListeners()
  }

  private initializeEventListeners() {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", this.handleAccountsChanged.bind(this))
      window.ethereum.on("chainChanged", this.handleChainChanged.bind(this))
      window.ethereum.on("disconnect", this.handleDisconnect.bind(this))
    }
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      this.disconnect()
    } else if (accounts[0] !== this.state.address) {
      this.updateWalletInfo()
    }
  }

  private handleChainChanged(chainId: string) {
    this.updateWalletInfo()
  }

  private handleDisconnect() {
    this.disconnect()
  }

  private updateState(newState: Partial<WalletState>) {
    this.state = { ...this.state, ...newState }
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getState(): WalletState {
    return { ...this.state }
  }

  async connectMetaMask(): Promise<WalletInfo | null> {
    try {
      this.updateState({ isConnecting: true, error: null })

      if (!window.ethereum) {
        throw new Error("MetaMask is not installed")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const balance = await provider.getBalance(address)
      const network = await provider.getNetwork()

      const walletInfo: WalletInfo = {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        provider,
        signer,
      }

      this.updateState({
        isConnected: true,
        address: walletInfo.address,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        provider: walletInfo.provider,
        signer: walletInfo.signer,
        isConnecting: false,
        error: null,
      })

      return walletInfo
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet"
      this.updateState({ isConnecting: false, error: errorMessage })
      throw error
    }
  }

  async connectWalletConnect(): Promise<WalletInfo | null> {
    try {
      this.updateState({ isConnecting: true, error: null })

      // Import WalletConnect dynamically to avoid SSR issues
      const { EthereumProvider } = await import("@walletconnect/ethereum-provider")

      const provider = await EthereumProvider.init({
        chains: [1, 137, 56, 8453, 10, 1946, 57073, 480, 1135],
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id",
        showQrModal: true,
        qrModalOptions: {
          themeMode: "dark",
          themeVariables: {
            "--wcm-z-index": "1000",
          },
        },
      })

      await provider.connect()

      const ethersProvider = new ethers.BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()
      const address = await signer.getAddress()
      const balance = await ethersProvider.getBalance(address)
      const network = await ethersProvider.getNetwork()

      const walletInfo: WalletInfo = {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        provider: ethersProvider,
        signer,
      }

      this.updateState({
        isConnected: true,
        address: walletInfo.address,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        provider: walletInfo.provider,
        signer: walletInfo.signer,
        isConnecting: false,
        error: null,
      })

      return walletInfo
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect WalletConnect"
      this.updateState({ isConnecting: false, error: errorMessage })
      throw error
    }
  }

  async connectCoinbaseWallet(): Promise<WalletInfo | null> {
    try {
      this.updateState({ isConnecting: true, error: null })

      // Check if Coinbase Wallet is available
      if (!window.ethereum?.isCoinbaseWallet && !window.coinbaseWalletExtension) {
        throw new Error("Coinbase Wallet is not installed")
      }

      const provider = window.ethereum?.isCoinbaseWallet ? window.ethereum : window.coinbaseWalletExtension

      if (!provider) {
        throw new Error("Coinbase Wallet provider not found")
      }

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const ethersProvider = new ethers.BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()
      const address = await signer.getAddress()
      const balance = await ethersProvider.getBalance(address)
      const network = await ethersProvider.getNetwork()

      const walletInfo: WalletInfo = {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        provider: ethersProvider,
        signer,
      }

      this.updateState({
        isConnected: true,
        address: walletInfo.address,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        provider: walletInfo.provider,
        signer: walletInfo.signer,
        isConnecting: false,
        error: null,
      })

      return walletInfo
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect Coinbase Wallet"
      this.updateState({ isConnecting: false, error: errorMessage })
      throw error
    }
  }

  async switchChain(chainId: SupportedChainId): Promise<void> {
    try {
      if (!window.ethereum) {
        throw new Error("No wallet provider found")
      }

      const chainIdHex = `0x${chainId.toString(16)}`

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          const chainConfig = SUPPORTED_CHAINS[chainId]
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainIdHex,
                chainName: chainConfig.name,
                nativeCurrency: {
                  name: chainConfig.symbol,
                  symbol: chainConfig.symbol,
                  decimals: 18,
                },
                rpcUrls: [chainConfig.rpc],
              },
            ],
          })
        } else {
          throw switchError
        }
      }

      // Update wallet info after chain switch
      await this.updateWalletInfo()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to switch chain"
      this.updateState({ error: errorMessage })
      throw error
    }
  }

  async updateWalletInfo(): Promise<void> {
    try {
      if (!this.state.provider || !this.state.signer) {
        return
      }

      const address = await this.state.signer.getAddress()
      const balance = await this.state.provider.getBalance(address)
      const network = await this.state.provider.getNetwork()

      this.updateState({
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
      })
    } catch (error) {
      console.error("Failed to update wallet info:", error)
    }
  }

  disconnect(): void {
    this.updateState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      provider: null,
      signer: null,
      isConnecting: false,
      error: null,
    })
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  getChainName(chainId: number): string {
    return SUPPORTED_CHAINS[chainId as SupportedChainId]?.name || "Unknown Network"
  }

  isChainSupported(chainId: number): boolean {
    return chainId in SUPPORTED_CHAINS
  }
}

// Global wallet service instance
export const walletService = WalletService.getInstance()

// Types for window.ethereum
declare global {
  interface Window {
    ethereum?: any
    coinbaseWalletExtension?: any
  }
}
