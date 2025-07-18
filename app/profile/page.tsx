import type { Metadata } from "next"
import ProfilePageClient from "./profile-page-client"

export const metadata: Metadata = {
  title: "User Profile - Manage Your NFT Collection & Activity",
  description:
    "View and manage your NFT collection on OmniMint. Track your owned, created, and liked NFTs. Monitor your trading activity, achievements, and portfolio value across all blockchains.",
  keywords: [
    "NFT profile",
    "NFT collection",
    "user dashboard",
    "NFT portfolio",
    "trading activity",
    "NFT achievements",
    "owned NFTs",
    "created NFTs",
    "liked NFTs",
    "NFT statistics",
    "blockchain portfolio",
  ],
  openGraph: {
    title: "User Profile - Manage Your NFT Collection | OmniMint",
    description: "View and manage your NFT collection. Track owned, created, and liked NFTs across all blockchains.",
    url: "https://omnimint.io/profile",
    images: [
      {
        url: "/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint User Profile - NFT Collection Management",
      },
    ],
  },
  twitter: {
    title: "User Profile - NFT Collection | OmniMint",
    description: "Manage your NFT collection and track your activity across all blockchains.",
    images: ["/twitter-profile.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/profile",
  },
}

export default function Page() {
  return <ProfilePageClient />
}
