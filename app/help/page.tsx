import type { Metadata } from "next"
import HelpPageClient from "./help-page-client"

export const metadata: Metadata = {
  title: "Help Center - OmniMint Support & Documentation",
  description:
    "Get help with OmniMint NFT marketplace. Find guides on wallet connection, NFT creation, trading, and troubleshooting. Access FAQs, tutorials, and support resources.",
  keywords: [
    "OmniMint help",
    "NFT marketplace support",
    "wallet connection help",
    "NFT creation guide",
    "trading help",
    "troubleshooting",
    "FAQ",
    "tutorials",
    "support documentation",
    "how to use OmniMint",
  ],
  openGraph: {
    title: "Help Center - OmniMint Support & Documentation",
    description: "Get help with OmniMint NFT marketplace. Find guides, FAQs, and support resources.",
    url: "https://omnimint.io/help",
    images: [
      {
        url: "/og-help.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint Help Center - Support & Documentation",
      },
    ],
  },
  twitter: {
    title: "Help Center - OmniMint Support",
    description: "Get help with OmniMint NFT marketplace. Find guides, FAQs, and support resources.",
    images: ["/twitter-help.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/help",
  },
}

export default function Page() {
  return <HelpPageClient />
}
