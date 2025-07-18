import type { Metadata } from "next"
import CollectionsPageClient from "./collections-page-client"

export const metadata: Metadata = {
  title: "NFT Collections - Explore Top Collections Across All Blockchains",
  description:
    "Discover the most popular NFT collections on OmniMint. Browse collections by volume, floor price, and blockchain. Find trending collections on Ethereum, Polygon, Solana, and BSC.",
  keywords: [
    "NFT collections",
    "top NFT collections",
    "trending collections",
    "collection rankings",
    "Ethereum collections",
    "Polygon collections",
    "Solana collections",
    "BSC collections",
    "collection volume",
    "floor price",
    "collection stats",
  ],
  openGraph: {
    title: "NFT Collections - Explore Top Collections | OmniMint",
    description:
      "Discover the most popular NFT collections across all blockchains. Browse by volume, floor price, and trends.",
    url: "https://omnimint.io/collections",
    images: [
      {
        url: "/og-collections.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint Collections - Top NFT Collections Across All Blockchains",
      },
    ],
  },
  twitter: {
    title: "NFT Collections - Top Collections | OmniMint",
    description: "Explore the most popular NFT collections across all blockchains.",
    images: ["/twitter-collections.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/collections",
  },
}

export default function Page() {
  return <CollectionsPageClient />
}
