"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Grid3X3, List, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const collections = [
  {
    id: 1,
    name: "Cosmic Collection",
    description: "A journey through the cosmos with stunning digital art",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "2.5 ETH",
    volume24h: "1,234 ETH",
    volumeTotal: "45,678 ETH",
    items: 10000,
    owners: 3456,
    blockchain: "Ethereum",
    verified: true,
    trending: true,
  },
  {
    id: 2,
    name: "Digital Dreams",
    description: "Surreal digital landscapes and dreamscapes",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "1.8 ETH",
    volume24h: "987 ETH",
    volumeTotal: "23,456 ETH",
    items: 5000,
    owners: 2134,
    blockchain: "Polygon",
    verified: true,
    trending: false,
  },
  {
    id: 3,
    name: "Quantum Realm",
    description: "Exploring the quantum world through art",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "3.2 ETH",
    volume24h: "2,156 ETH",
    volumeTotal: "67,890 ETH",
    items: 8888,
    owners: 4567,
    blockchain: "Solana",
    verified: true,
    trending: true,
  },
  {
    id: 4,
    name: "Genesis Collection",
    description: "The beginning of a new digital era",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "0.9 ETH",
    volume24h: "543 ETH",
    volumeTotal: "12,345 ETH",
    items: 3333,
    owners: 1876,
    blockchain: "Ethereum",
    verified: false,
    trending: false,
  },
  {
    id: 5,
    name: "Avatar Series",
    description: "Unique digital avatars for the metaverse",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "1.2 ETH",
    volume24h: "765 ETH",
    volumeTotal: "18,765 ETH",
    items: 7777,
    owners: 3210,
    blockchain: "Polygon",
    verified: true,
    trending: true,
  },
  {
    id: 6,
    name: "Abstract Dimensions",
    description: "Abstract art meets digital innovation",
    image: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=100&width=400",
    floorPrice: "0.7 ETH",
    volume24h: "432 ETH",
    volumeTotal: "9,876 ETH",
    items: 4444,
    owners: 1987,
    blockchain: "BSC",
    verified: false,
    trending: false,
  },
]

export default function CollectionsPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("volume")
  const [activeTab, setActiveTab] = useState("all")

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "trending" && collection.trending) ||
      (activeTab === "verified" && collection.verified)

    return matchesSearch && matchesTab
  })

  const getBlockchainColor = (blockchain: string) => {
    switch (blockchain.toLowerCase()) {
      case "ethereum":
        return "bg-blue-500/20 text-blue-400"
      case "polygon":
        return "bg-purple-500/20 text-purple-400"
      case "solana":
        return "bg-green-500/20 text-green-400"
      case "bsc":
      case "binance smart chain":
        return "bg-yellow-500/20 text-yellow-400"
      case "base":
        return "bg-blue-400/20 text-blue-300"
      case "op mainnet":
      case "optimism":
        return "bg-red-500/20 text-red-400"
      case "soneium":
        return "bg-indigo-500/20 text-indigo-400"
      case "ink":
        return "bg-slate-500/20 text-slate-400"
      case "worldchain":
        return "bg-cyan-500/20 text-cyan-400"
      case "lisk":
        return "bg-emerald-500/20 text-emerald-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Collections
          </h1>
          <p className="text-gray-400 text-lg">Explore the most popular NFT collections across all blockchains</p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-black/40 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
              aria-label="Search collections"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
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
                  <DropdownMenuItem onClick={() => setSortBy("volume")} className="text-gray-300 hover:text-purple-400">
                    Volume
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("floor-price")}
                    className="text-gray-300 hover:text-purple-400"
                  >
                    Floor Price
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("items")} className="text-gray-300 hover:text-purple-400">
                    Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("owners")} className="text-gray-300 hover:text-purple-400">
                    Owners
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
                aria-label="Grid view"
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
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All Collections
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="verified" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Verified
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Collections Grid/List */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">{filteredCollections.length} collections found</p>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`}>
                <Card className="group bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-0">
                    {/* Banner */}
                    <div className="relative h-24 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-t-lg overflow-hidden">
                      <Image
                        src={collection.banner || "/placeholder.svg"}
                        alt={`${collection.name} banner`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {collection.trending && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="relative -mt-8 px-4">
                      <div className="w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{collection.name}</h3>
                        {collection.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{collection.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Floor Price:</span>
                          <span className="text-purple-400 font-semibold">{collection.floorPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h Volume:</span>
                          <span className="text-green-400 font-semibold">{collection.volume24h}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Items:</span>
                          <span className="text-gray-300">{collection.items.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Owners:</span>
                          <span className="text-gray-300">{collection.owners.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <Badge className={getBlockchainColor(collection.blockchain)}>{collection.blockchain}</Badge>
                        <div className="text-xs text-gray-400">
                          {Math.round((collection.owners / collection.items) * 100)}% unique owners
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCollections.map((collection, index) => (
              <Link key={collection.id} href={`/collections/${collection.id}`}>
                <Card className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-2xl font-bold text-purple-400 w-8">#{index + 1}</div>

                      <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white truncate">{collection.name}</h3>
                          {collection.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                          {collection.trending && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm truncate">{collection.description}</p>
                      </div>

                      <div className="hidden md:flex items-center gap-8 text-sm">
                        <div className="text-center">
                          <div className="text-purple-400 font-semibold">{collection.floorPrice}</div>
                          <div className="text-gray-400">Floor</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-semibold">{collection.volume24h}</div>
                          <div className="text-gray-400">24h Volume</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-300">{collection.items.toLocaleString()}</div>
                          <div className="text-gray-400">Items</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-300">{collection.owners.toLocaleString()}</div>
                          <div className="text-gray-400">Owners</div>
                        </div>
                        <Badge className={getBlockchainColor(collection.blockchain)}>{collection.blockchain}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No collections found</div>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
