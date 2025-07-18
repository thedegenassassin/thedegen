"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Grid3X3, List, ChevronDown, SlidersHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NFTCard } from "../../components/nft-card"

const allNFTs = [
  {
    id: 1,
    title: "Cosmic Wanderer #001",
    creator: "NebulaArt",
    price: "2.5 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Cosmic Collection",
    blockchain: "Ethereum",
    rarity: "Legendary",
    category: "Art",
  },
  {
    id: 2,
    title: "Digital Dreams",
    creator: "CyberVision",
    price: "1.8 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Dream Series",
    blockchain: "Polygon",
    rarity: "Rare",
    category: "Photography",
  },
  {
    id: 3,
    title: "Quantum Essence",
    creator: "FutureForge",
    price: "3.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Quantum Realm",
    blockchain: "Solana",
    rarity: "Epic",
    category: "3D",
  },
  {
    id: 4,
    title: "Neon Genesis",
    creator: "TechnoMystic",
    price: "0.9 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Genesis Collection",
    blockchain: "Ethereum",
    rarity: "Common",
    category: "Art",
  },
  {
    id: 5,
    title: "Cyber Punk Avatar",
    creator: "PixelMaster",
    price: "1.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Avatar Series",
    blockchain: "Polygon",
    rarity: "Rare",
    category: "Avatar",
  },
  {
    id: 6,
    title: "Abstract Dimensions",
    creator: "ArtFlow",
    price: "0.7 ETH",
    image: "/placeholder.svg?height=300&width=300",
    thumbnails: {
      small: "/placeholder.svg?height=200&width=200",
      medium: "/placeholder.svg?height=400&width=400",
      large: "/placeholder.svg?height=800&width=800",
    },
    collection: "Abstract Collection",
    blockchain: "Ethereum",
    rarity: "Common",
    category: "Art",
  },
]

export default function MarketplacePageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)

  const blockchains = [
    "Ethereum",
    "Polygon",
    "Solana",
    "Binance Smart Chain",
    "Base",
    "OP Mainnet",
    "Soneium",
    "Ink",
    "Worldchain",
    "Lisk",
  ]
  const categories = ["Art", "Photography", "Music", "Video", "3D", "Avatar", "Gaming"]
  const rarities = ["Common", "Rare", "Epic", "Legendary"]

  const handleBlockchainChange = (blockchain: string, checked: boolean) => {
    if (checked) {
      setSelectedBlockchains([...selectedBlockchains, blockchain])
    } else {
      setSelectedBlockchains(selectedBlockchains.filter((b) => b !== blockchain))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleRarityChange = (rarity: string, checked: boolean) => {
    if (checked) {
      setSelectedRarities([...selectedRarities, rarity])
    } else {
      setSelectedRarities(selectedRarities.filter((r) => r !== rarity))
    }
  }

  const filteredNFTs = allNFTs.filter((nft) => {
    const matchesSearch =
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBlockchain = selectedBlockchains.length === 0 || selectedBlockchains.includes(nft.blockchain)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(nft.category)
    const matchesRarity = selectedRarities.length === 0 || selectedRarities.includes(nft.rarity)

    const price = Number.parseFloat(nft.price.replace(" ETH", ""))
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

    return matchesSearch && matchesBlockchain && matchesCategory && matchesRarity && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-gray-400 text-lg">Discover, collect, and trade extraordinary NFTs</p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search NFTs, collections, or creators..."
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
                    onClick={() => setSortBy("trending")}
                    className="text-gray-300 hover:text-purple-400"
                  >
                    Trending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-low")}
                    className="text-gray-300 hover:text-purple-400"
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-high")}
                    className="text-gray-300 hover:text-purple-400"
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")} className="text-gray-300 hover:text-purple-400">
                    Recently Listed
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

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="bg-black/40 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Price Range (ETH)</h3>
                  <div className="space-y-4">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={10} step={0.1} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{priceRange[0]} ETH</span>
                      <span>{priceRange[1]} ETH</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Blockchain</h3>
                  <div className="space-y-3">
                    {blockchains.map((blockchain) => (
                      <div key={blockchain} className="flex items-center space-x-2">
                        <Checkbox
                          id={blockchain}
                          checked={selectedBlockchains.includes(blockchain)}
                          onCheckedChange={(checked) => handleBlockchainChange(blockchain, checked as boolean)}
                        />
                        <Label htmlFor={blockchain} className="text-gray-300 cursor-pointer">
                          {blockchain}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Category</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <Label htmlFor={category} className="text-gray-300 cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Rarity</h3>
                  <div className="space-y-3">
                    {rarities.map((rarity) => (
                      <div key={rarity} className="flex items-center space-x-2">
                        <Checkbox
                          id={rarity}
                          checked={selectedRarities.includes(rarity)}
                          onCheckedChange={(checked) => handleRarityChange(rarity, checked as boolean)}
                        />
                        <Label htmlFor={rarity} className="text-gray-300 cursor-pointer">
                          {rarity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* NFT Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-400">{filteredNFTs.length} items found</p>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} size={viewMode === "grid" ? "small" : "medium"} />
              ))}
            </div>

            {filteredNFTs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">No NFTs found</div>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
