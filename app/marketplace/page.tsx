import type { Metadata } from "next"
import MarketplacePageClient from "./components/marketplace-page-client"

export const metadata: Metadata = {
  title: "NFT Marketplace - Browse & Trade Across All Blockchains",
  description:
    "Explore thousands of unique NFTs on OmniMint's marketplace. Filter by blockchain, price, rarity, and category. Trade on Ethereum, Polygon, Solana, and BSC with advanced search tools.",
  keywords: [
    "NFT marketplace",
    "browse NFTs",
    "trade NFTs",
    "Ethereum NFTs",
    "Polygon marketplace",
    "Solana NFTs",
    "BSC NFTs",
    "NFT filters",
    "digital art marketplace",
    "crypto collectibles",
    "NFT search",
    "multi-blockchain trading",
  ],
  openGraph: {
    title: "NFT Marketplace - Browse & Trade Across All Blockchains | OmniMint",
    description:
      "Explore thousands of unique NFTs with advanced filtering. Trade across Ethereum, Polygon, Solana, and more.",
    url: "https://omnimint.io/marketplace",
    images: [
      {
        url: "/og-marketplace.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint Marketplace - Browse NFTs Across All Blockchains",
      },
    ],
  },
  twitter: {
    title: "NFT Marketplace - Browse & Trade | OmniMint",
    description: "Explore thousands of unique NFTs with advanced filtering across all blockchains.",
    images: ["/twitter-marketplace.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/marketplace",
  },
}

export default function Page() {
  return <MarketplacePageClient />
}
