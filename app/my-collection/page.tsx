import type { Metadata } from "next"
import MyCollectionPageClient from "./my-collection-page-client"

export const metadata: Metadata = {
  title: "My Collection - Your NFT Portfolio | OmniMint",
  description:
    "View and manage your personal NFT collection on OmniMint. Track your owned NFTs, portfolio value, and collection statistics across all blockchains.",
  keywords: [
    "my NFT collection",
    "NFT portfolio",
    "owned NFTs",
    "personal collection",
    "NFT dashboard",
    "collection management",
    "NFT inventory",
    "digital assets",
    "blockchain portfolio",
    "NFT tracker",
  ],
  openGraph: {
    title: "My Collection - Your NFT Portfolio | OmniMint",
    description: "View and manage your personal NFT collection across all blockchains.",
    url: "https://omnimint.io/my-collection",
    images: [
      {
        url: "/og-my-collection.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint My Collection - Personal NFT Portfolio",
      },
    ],
  },
  twitter: {
    title: "My Collection - NFT Portfolio | OmniMint",
    description: "View and manage your personal NFT collection across all blockchains.",
    images: ["/twitter-my-collection.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/my-collection",
  },
}

export default function Page() {
  return <MyCollectionPageClient />
}
