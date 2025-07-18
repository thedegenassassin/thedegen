export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  website: string
  twitter: string
  instagram: string
  discord: string
  email: string
  walletAddress: string
  avatar: string
  coverImage: string
  isVerified: boolean
  joinedDate: Date
  lastActive: Date
}

export interface UserStats {
  totalTransactions: number
  totalVolume: string // in ETH
  nftsOwned: number
  nftsCreated: number
  nftsSold: number
  collectionsOwned: number
  collectionsCreated: number
  followers: number
  following: number
  totalEarnings: string // in ETH
  averageSalePrice: string // in ETH
  highestSale: string // in ETH
  successfulSales: number
  failedTransactions: number
  gasSpent: string // in ETH
}

export interface Transaction {
  id: string
  type: "mint" | "buy" | "sell" | "transfer" | "list" | "delist"
  nftId?: string
  nftTitle?: string
  amount: string // in ETH
  gasUsed: string // in ETH
  fromAddress: string
  toAddress: string
  blockchainId: number
  transactionHash: string
  timestamp: Date
  status: "pending" | "confirmed" | "failed"
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

class ProfileService {
  private static instance: ProfileService
  private listeners: Set<(profile: UserProfile, stats: UserStats) => void> = new Set()

  // Mock data - in real app this would come from backend/blockchain
  private userProfile: UserProfile = {
    id: "user_001",
    username: "cryptoartist",
    displayName: "Crypto Artist",
    bio: "Digital artist and NFT creator passionate about blockchain technology.",
    website: "https://cryptoartist.com",
    twitter: "@cryptoartist",
    instagram: "@cryptoartist",
    discord: "cryptoartist#1234",
    email: "artist@example.com",
    walletAddress: "0x1234567890123456789012345678901234567890",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=800",
    isVerified: true,
    joinedDate: new Date("2023-01-15"),
    lastActive: new Date(),
  }

  private userStats: UserStats = {
    totalTransactions: 0,
    totalVolume: "0.0",
    nftsOwned: 0,
    nftsCreated: 0,
    nftsSold: 0,
    collectionsOwned: 0,
    collectionsCreated: 0,
    followers: 0,
    following: 0,
    totalEarnings: "0.0",
    averageSalePrice: "0.0",
    highestSale: "0.0",
    successfulSales: 0,
    failedTransactions: 0,
    gasSpent: "0.0",
  }

  private transactions: Transaction[] = []
  private achievements: Achievement[] = [
    {
      id: "first_transaction",
      title: "First Steps",
      description: "Complete your first transaction",
      icon: "🎯",
      rarity: "common",
      maxProgress: 1,
      progress: 0,
    },
    {
      id: "first_nft",
      title: "NFT Creator",
      description: "Create your first NFT",
      icon: "🎨",
      rarity: "common",
      maxProgress: 1,
      progress: 0,
    },
    {
      id: "volume_milestone",
      title: "Volume Trader",
      description: "Reach 10 ETH in total volume",
      icon: "💎",
      rarity: "rare",
      maxProgress: 10,
      progress: 0,
    },
    {
      id: "sales_master",
      title: "Sales Master",
      description: "Complete 50 successful sales",
      icon: "🏆",
      rarity: "epic",
      maxProgress: 50,
      progress: 0,
    },
    {
      id: "whale_collector",
      title: "Whale Collector",
      description: "Own 100+ NFTs",
      icon: "🐋",
      rarity: "legendary",
      maxProgress: 100,
      progress: 0,
    },
  ]

  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  subscribe(listener: (profile: UserProfile, stats: UserStats) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.userProfile, this.userStats))
  }

  getProfile(): UserProfile {
    return { ...this.userProfile }
  }

  getStats(): UserStats {
    return { ...this.userStats }
  }

  getTransactions(): Transaction[] {
    return [...this.transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getAchievements(): Achievement[] {
    return [...this.achievements]
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    this.userProfile = { ...this.userProfile, ...updates, lastActive: new Date() }
    this.notifyListeners()
  }

  async updateProfileImage(type: "avatar" | "coverImage", file: File | null, previewUrl: string | null): Promise<void> {
    if (file && previewUrl) {
      // In a real app, you would upload to a cloud storage service here
      // For demo purposes, we'll use the preview URL
      const updates = {
        [type]: previewUrl,
      }
      await this.updateProfile(updates)
    } else {
      // Remove image
      const updates = {
        [type]: type === "avatar" ? "/placeholder.svg?height=120&width=120" : "/placeholder.svg?height=300&width=800",
      }
      await this.updateProfile(updates)
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id" | "timestamp">): Promise<void> {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    this.transactions.push(newTransaction)

    if (newTransaction.status === "confirmed") {
      await this.updateStatsFromTransaction(newTransaction)
      await this.checkAchievements()
    }

    this.notifyListeners()
  }

  private async updateStatsFromTransaction(transaction: Transaction): Promise<void> {
    const amount = Number.parseFloat(transaction.amount)
    const gasUsed = Number.parseFloat(transaction.gasUsed)

    // Update basic stats
    this.userStats.totalTransactions += 1
    this.userStats.totalVolume = (Number.parseFloat(this.userStats.totalVolume) + amount).toFixed(4)
    this.userStats.gasSpent = (Number.parseFloat(this.userStats.gasSpent) + gasUsed).toFixed(6)

    // Update specific stats based on transaction type
    switch (transaction.type) {
      case "mint":
        this.userStats.nftsCreated += 1
        this.userStats.nftsOwned += 1
        break
      case "buy":
        this.userStats.nftsOwned += 1
        break
      case "sell":
        this.userStats.nftsSold += 1
        this.userStats.successfulSales += 1
        this.userStats.totalEarnings = (Number.parseFloat(this.userStats.totalEarnings) + amount).toFixed(4)

        // Update highest sale
        if (amount > Number.parseFloat(this.userStats.highestSale)) {
          this.userStats.highestSale = amount.toFixed(4)
        }

        // Update average sale price
        if (this.userStats.successfulSales > 0) {
          this.userStats.averageSalePrice = (
            Number.parseFloat(this.userStats.totalEarnings) / this.userStats.successfulSales
          ).toFixed(4)
        }
        break
      case "transfer":
        // Transfer doesn't change ownership count for the sender
        break
    }
  }

  private async checkAchievements(): Promise<void> {
    this.achievements.forEach((achievement) => {
      if (achievement.unlockedAt) return // Already unlocked

      let currentProgress = 0

      switch (achievement.id) {
        case "first_transaction":
          currentProgress = this.userStats.totalTransactions > 0 ? 1 : 0
          break
        case "first_nft":
          currentProgress = this.userStats.nftsCreated > 0 ? 1 : 0
          break
        case "volume_milestone":
          currentProgress = Math.floor(Number.parseFloat(this.userStats.totalVolume))
          break
        case "sales_master":
          currentProgress = this.userStats.successfulSales
          break
        case "whale_collector":
          currentProgress = this.userStats.nftsOwned
          break
      }

      achievement.progress = Math.min(currentProgress, achievement.maxProgress || 1)

      if (achievement.progress >= (achievement.maxProgress || 1)) {
        achievement.unlockedAt = new Date()
      }
    })
  }

  // Simulate transactions for demo purposes
  async simulateTransaction(type: Transaction["type"], amount = "0.1"): Promise<void> {
    const blockchains = [1, 8453, 10, 137] // ETH, Base, OP, Polygon
    const randomBlockchain = blockchains[Math.floor(Math.random() * blockchains.length)]

    await this.addTransaction({
      type,
      nftId: `nft_${Math.random().toString(36).substr(2, 9)}`,
      nftTitle: `${type.charAt(0).toUpperCase() + type.slice(1)} NFT #${Math.floor(Math.random() * 1000)}`,
      amount,
      gasUsed: (Math.random() * 0.01).toFixed(6),
      fromAddress: this.userProfile.walletAddress,
      toAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      blockchainId: randomBlockchain,
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      status: Math.random() > 0.1 ? "confirmed" : "failed", // 90% success rate
    })
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  formatEth(amount: string): string {
    const num = Number.parseFloat(amount)
    if (num === 0) return "0 ETH"
    if (num < 0.001) return "<0.001 ETH"
    if (num < 1) return `${num.toFixed(3)} ETH`
    return `${num.toFixed(2)} ETH`
  }

  getDaysActive(): number {
    const now = new Date()
    const joined = new Date(this.userProfile.joinedDate)
    return Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24))
  }
}

export const profileService = ProfileService.getInstance()
