import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "OmniMint - Discover, Create & Trade NFTs Across All Blockchains",
  description:
    "Welcome to OmniMint, the future of NFT trading. Explore 250K+ NFTs, connect with 50K+ creators, and trade across Ethereum, Polygon, Solana, and more. Start your Web3 journey today.",
  keywords: [
    "NFT marketplace",
    "multi-blockchain NFTs",
    "discover NFTs",
    "create NFTs",
    "trade NFTs",
    "Ethereum marketplace",
    "Polygon NFTs",
    "Solana NFTs",
    "digital art marketplace",
    "crypto collectibles",
  ],
  openGraph: {
    title: "OmniMint - Discover, Create & Trade NFTs Across All Blockchains",
    description:
      "Welcome to the future of NFT trading. 250K+ NFTs, 50K+ creators, 1.2M+ users. Trade across multiple blockchains.",
    url: "https://omnimint.io",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint Homepage - Multi-Blockchain NFT Marketplace",
      },
    ],
  },
  twitter: {
    title: "OmniMint - The Future of NFT Trading",
    description: "Discover, create & trade NFTs across all blockchains. Join 1.2M+ users in the metaverse.",
    images: ["/twitter-home.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io",
  },
}

export default function Page() {
  return <ClientPage />
}
