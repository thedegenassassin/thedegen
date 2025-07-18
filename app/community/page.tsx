import type { Metadata } from "next"
import CommunityPageClient from "./community-page-client"

export const metadata: Metadata = {
  title: "Community - Join the OmniMint NFT Community",
  description:
    "Join the OmniMint community! Connect with creators, collectors, and traders. Access Discord, Twitter, forums, and community events. Be part of the future of NFTs.",
  keywords: [
    "OmniMint community",
    "NFT community",
    "Discord",
    "Twitter",
    "community events",
    "NFT creators",
    "NFT collectors",
    "community forum",
    "social media",
    "community guidelines",
  ],
  openGraph: {
    title: "Community - Join the OmniMint NFT Community",
    description: "Connect with creators, collectors, and traders in the OmniMint community.",
    url: "https://omnimint.io/community",
    images: [
      {
        url: "/og-community.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint Community - Join NFT Creators and Collectors",
      },
    ],
  },
  twitter: {
    title: "Community - Join OmniMint",
    description: "Connect with creators, collectors, and traders in the OmniMint community.",
    images: ["/twitter-community.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/community",
  },
}

export default function Page() {
  return <CommunityPageClient />
}
