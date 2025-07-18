import type { Metadata } from "next"
import CreatePageContent from "./components/create-page"

export const metadata: Metadata = {
  title: "Create & Mint NFTs - Multi-Blockchain NFT Creation",
  description:
    "Create and mint your NFTs on OmniMint across multiple blockchains. Upload images, videos, audio, and 3D files. Set prices, royalties, and launch on Ethereum, Polygon, Solana, and BSC.",
  keywords: [
    "create NFT",
    "mint NFT",
    "NFT creation",
    "upload NFT",
    "multi-blockchain minting",
    "Ethereum NFT creation",
    "Polygon NFT mint",
    "Solana NFT creation",
    "BSC NFT mint",
    "NFT royalties",
    "digital art creation",
    "NFT collection creation",
  ],
  openGraph: {
    title: "Create & Mint NFTs - Multi-Blockchain Creation | OmniMint",
    description:
      "Create and mint your NFTs across multiple blockchains. Upload any file type and launch on Ethereum, Polygon, Solana, and more.",
    url: "https://omnimint.io/create",
    images: [
      {
        url: "/og-create.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint NFT Creation - Mint Across All Blockchains",
      },
    ],
  },
  twitter: {
    title: "Create & Mint NFTs | OmniMint",
    description: "Create and mint your NFTs across multiple blockchains with advanced creation tools.",
    images: ["/twitter-create.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/create",
  },
}

export default function Page() {
  return <CreatePageContent />
}
