"use client"
import HomePage from "./components/home-page"

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

const collections = [
  { name: "Cosmic Collection", volume: "1,234 ETH", items: 10000 },
  { name: "Digital Dreams", volume: "987 ETH", items: 5000 },
  { name: "Quantum Realm", volume: "2,156 ETH", items: 8888 },
  { name: "Genesis Collection", volume: "543 ETH", items: 3333 },
]

export default function ClientPage() {
  return <HomePage />
}
