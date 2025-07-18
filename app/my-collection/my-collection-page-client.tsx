"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Grid3X3,
  List,
  ChevronDown,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
  Eye,
  Share2,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NFTCard } from "../components/nft-card"
import { WalletGuard } from "../components/wallet-guard"

// Mock user's collected NFTs
const userCollectedNFTs = [
  {
    id: 1,
    title: "Cosmic Wanderer #001",
    creator: "NebulaArt",
    price: "2.5 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Cosmic Collection",
    blockchain: "Ethereum",
    rarity: "Legendary",
    category: "Art",
    purchasePrice: "2.0 ETH",
    purchaseDate: "2024-01-15",
    currentValue: "2.8 ETH",
  },
  {
    id: 2,
    title: "Digital Dreams #042",
    creator: "CyberVision",
    price: "1.8 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Dream Series",
    blockchain: "Polygon",
    rarity: "Rare",
    category: "Photography",
    purchasePrice: "1.5 ETH",
    purchaseDate: "2024-02-03",
    currentValue: "2.1 ETH",
  },
  {
    id: 3,
    title: "Quantum Essence #777",
    creator: "FutureForge",
    price: "3.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Quantum Realm",
    blockchain: "Solana",
    rarity: "Epic",
    category: "3D",
    purchasePrice: "2.8 ETH",
    purchaseDate: "2024-01-28",
    currentValue: "3.5 ETH",
  },
  {
    id: 4,
    title: "Neon Genesis #123",
    creator: "TechnoMystic",
    price: "0.9 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Genesis Collection",
    blockchain: "Ethereum",
    rarity: "Common",
    category: "Art",
    purchasePrice: "0.8 ETH",
    purchaseDate: "2024-02-10",
    currentValue: "1.1 ETH",
  },
  {
    id: 5,
    title: "Cyber Punk Avatar #456",
    creator: "PixelMaster",
    price: "1.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Avatar Series",
    blockchain: "Polygon",
    rarity: "Rare",
    category: "Avatar",
    purchasePrice: "1.0 ETH",
    purchaseDate: "2024-01-20",
    currentValue: "1.4 ETH",
  },
  {
    id: 6,
    title: "Abstract Dimensions #89",
    creator: "ArtFlow",
    price: "0.7 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Abstract Collection",
    blockchain: "Ethereum",
    rarity: "Common",
    category: "Art",
    purchasePrice: "0.6 ETH",
    purchaseDate: "2024-02-05",
    currentValue: "0.8 ETH",
  },
  {
    id: 7,
    title: "Mystic Portal #333",
    creator: "DimensionArt",
    price: "4.1 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Portal Series",
    blockchain: "Ethereum",
    rarity: "Legendary",
    category: "Art",
    purchasePrice: "3.5 ETH",
    purchaseDate: "2024-01-12",
    currentValue: "4.8 ETH",
  },
  {
    id: 8,
    title: "Virtual Landscape #67",
    creator: "MetaCreator",
    price: "1.6 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Virtual Worlds",
    blockchain: "Polygon",
    rarity: "Epic",
    category: "3D",
    purchasePrice: "1.3 ETH",
    purchaseDate: "2024-02-01",
    currentValue: "1.9 ETH",
  },
]

export default function MyCollectionPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedBlockchain, setSelectedBlockchain] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Calculate portfolio stats
  const totalValue = userCollectedNFTs.reduce(
    (sum, nft) => sum + Number.parseFloat(nft.currentValue.replace(" ETH", "")),
    0,
  )
  const totalPurchaseValue = userCollectedNFTs.reduce(
    (sum, nft) => sum + Number.parseFloat(nft.purchasePrice.replace(" ETH", "")),
    0,
  )
  const totalGainLoss = totalValue - totalPurchaseValue
  const gainLossPercentage = ((totalGainLoss / totalPurchaseValue) * 100).toFixed(1)

  const filteredNFTs = userCollectedNFTs.filter((nft) => {
    const matchesSearch =
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBlockchain = selectedBlockchain === "all" || nft.blockchain === selectedBlockchain
    const matchesFilter = filterBy === "all" || nft.rarity.toLowerCase() === filterBy

    return matchesSearch && matchesBlockchain && matchesFilter
  })

  const getCollectionsByBlockchain = () => {
    const blockchainCounts = userCollectedNFTs.reduce(
      (acc, nft) => {
        acc[nft.blockchain] = (acc[nft.blockchain] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return blockchainCounts
  }

  const blockchainCounts = getCollectionsByBlockchain()

  return (
    <WalletGuard requireConnection={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Collection
            </h1>
            <p className="text-gray-400 text-lg">Manage and track your NFT portfolio across all blockchains</p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Items</p>
                    <p className="text-2xl font-bold text-white">{userCollectedNFTs.length}</p>
                  </div>
                  <Wallet className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">{totalValue.toFixed(2)} ETH</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Invested</p>
                    <p className="text-2xl font-bold text-white">{totalPurchaseValue.toFixed(2)} ETH</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Profit/Loss</p>
                    <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {totalGainLoss >= 0 ? "+" : ""}
                      {totalGainLoss.toFixed(2)} ETH
                    </p>
                    <p className={`text-xs ${totalGainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {totalGainLoss >= 0 ? "+" : ""}
                      {gainLossPercentage}%
                    </p>
                  </div>
                  <div className={`w-8 h-8 ${totalGainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blockchain Distribution */}
          <Card className="bg-black/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Collection by Blockchain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(blockchainCounts).map(([blockchain, count]) => (
                  <div key={blockchain} className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{count}</div>
                    <div className="text-sm text-gray-400">{blockchain}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search and Controls */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search your collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-black/40 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                  <SelectTrigger className="w-40 bg-black/40 border-purple-500/30 text-white">
                    <SelectValue placeholder="Blockchain" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    <SelectItem value="all">All Chains</SelectItem>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-32 bg-black/40 border-purple-500/30 text-white">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    >
                      Sort: {sortBy} <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-purple-500/30">
                    <DropdownMenuItem
                      onClick={() => setSortBy("recent")}
                      className="text-gray-300 hover:text-purple-400"
                    >
                      Recently Acquired
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("value-high")}
                      className="text-gray-300 hover:text-purple-400"
                    >
                      Highest Value
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("value-low")}
                      className="text-gray-300 hover:text-purple-400"
                    >
                      Lowest Value
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("alphabetical")}
                      className="text-gray-300 hover:text-purple-400"
                    >
                      Alphabetical
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Collection Grid */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-400">{filteredNFTs.length} items in your collection</p>
            <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
              <Share2 className="w-4 h-4 mr-2" />
              Share Collection
            </Button>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredNFTs.map((nft) => (
              <div key={nft.id} className="relative group">
                <NFTCard nft={nft} />
                {/* Additional collection info overlay */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-black/60 hover:bg-black/80 text-white border-0 p-2"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-purple-500/30">
                      <DropdownMenuItem className="text-gray-300 hover:text-purple-400">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-purple-400">List for Sale</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-purple-400">Transfer</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-purple-400">Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Purchase info badge */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-black/60 text-white text-xs">Bought: {nft.purchasePrice}</Badge>
                </div>
              </div>
            ))}
          </div>

          {filteredNFTs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No NFTs found</div>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                asChild
              >
                <a href="/marketplace">Browse Marketplace</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </WalletGuard>
  )
}
