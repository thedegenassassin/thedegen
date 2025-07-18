"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Zap } from "lucide-react"
import { WalletModal } from "./wallet-modal"
import { NFTCard } from "./nft-card"
import { WalletButton } from "./wallet-button"

const featuredNFTs = [
  {
    id: 1,
    title: "Cosmic Wanderer #001",
    creator: "NebulaArt",
    price: "2.5 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Cosmic Collection",
    blockchain: "Ethereum",
    rarity: "Legendary",
  },
  {
    id: 2,
    title: "Digital Dreams",
    creator: "CyberVision",
    price: "1.8 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Dream Series",
    blockchain: "Polygon",
    rarity: "Rare",
  },
  {
    id: 3,
    title: "Quantum Essence",
    creator: "FutureForge",
    price: "3.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Quantum Realm",
    blockchain: "Solana",
    rarity: "Epic",
  },
  {
    id: 4,
    title: "Neon Genesis",
    creator: "TechnoMystic",
    price: "0.9 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Genesis Collection",
    blockchain: "Ethereum",
    rarity: "Common",
  },
]

export default function HomePage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                aria-label="OmniMint - Home"
              >
                OmniMint
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/marketplace" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
                <Link href="/create" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Create
                </Link>
                <Link href="/collections" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Collections
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Profile
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-black/40 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
                />
              </div>
              <WalletButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Discover the Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore, collect, and trade extraordinary NFTs across multiple blockchains in the most advanced
              marketplace in the metaverse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                asChild
              >
                <Link href="/marketplace">
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Marketplace
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                asChild
              >
                <Link href="/create">Create NFT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-16 px-4" aria-label="Featured NFTs">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured NFTs
            </h2>
            <p className="text-gray-400 text-lg">Discover the most sought-after digital assets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" aria-label="Call to action">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators and collectors in the most advanced NFT marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                asChild
              >
                <a href="https://www.meetup.com/vegas-crypto-group/" target="_blank" rel="noopener noreferrer">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                asChild
              >
                <a href="https://informempower.com/" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                OmniMint
              </h3>
              <p className="text-gray-400">The future of digital ownership and creativity</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Marketplace</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/marketplace" className="hover:text-purple-400 transition-colors">
                    Browse NFTs
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-purple-400 transition-colors">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace?sort=trending" className="hover:text-purple-400 transition-colors">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Create</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/create" className="hover:text-purple-400 transition-colors">
                    Mint NFT
                  </Link>
                </li>
                <li>
                  <Link href="/my-collection" className="hover:text-purple-400 transition-colors">
                    My Collection
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-purple-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-purple-400 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OmniMint. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </div>
  )
}
