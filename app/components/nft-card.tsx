"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Zap } from "lucide-react"
import { useState } from "react"
import { OptimizedImage } from "./optimized-image"

interface NFT {
  id: number
  title: string
  creator: string
  price: string
  image: string
  thumbnails?: {
    small: string
    medium: string
    large: string
  }
  webp?: {
    original: string
    small: string
    medium: string
    large: string
  }
  collection: string
  blockchain: string
  rarity: string
}

interface NFTCardProps {
  nft: NFT
  size?: "small" | "medium" | "large"
}

export function NFTCard({ nft, size = "medium" }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10)
  const [imageError, setImageError] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "rare":
        return "bg-gradient-to-r from-blue-400 to-cyan-400"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500"
    }
  }

  // Determine which image to use based on size and availability
  const getImageUrl = () => {
    if (imageError || !nft.thumbnails) {
      return nft.image || "/placeholder.svg?height=300&width=300"
    }

    switch (size) {
      case "small":
        return nft.thumbnails.small
      case "large":
        return nft.thumbnails.large
      case "medium":
      default:
        return nft.thumbnails.medium
    }
  }

  // Get WebP version if available
  const getWebpUrl = () => {
    if (!nft.webp) return undefined

    switch (size) {
      case "small":
        return nft.webp.small
      case "large":
        return nft.webp.large
      case "medium":
      default:
        return nft.webp.medium
    }
  }

  // Determine image height based on card size
  const getImageHeight = () => {
    switch (size) {
      case "small":
        return "h-48"
      case "large":
        return "h-80"
      case "medium":
      default:
        return "h-64"
    }
  }

  return (
    <Card className="group bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={getImageUrl()}
            webpSrc={getWebpUrl()}
            alt={nft.title}
            className={`w-full ${getImageHeight()} object-cover group-hover:scale-105 transition-transform duration-300`}
            onError={() => setImageError(true)}
            priority={size === "small"}
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${getRarityColor(nft.rarity)} text-white border-0`}>{nft.rarity}</Badge>
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/60 hover:bg-black/80 text-white border-0 p-2"
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/60 hover:bg-black/80 text-white border-0 p-2">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-black/60 text-white border-0">
              {nft.blockchain}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1">{nft.title}</h3>
            <p className="text-gray-400 text-sm">{nft.collection}</p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-xs">Creator</p>
              <p className="text-purple-400 text-sm font-medium">{nft.creator}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Price</p>
              <p className="text-white font-bold">{nft.price}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              <Zap className="w-4 h-4 mr-1" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
