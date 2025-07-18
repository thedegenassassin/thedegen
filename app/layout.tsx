import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "OmniMint - The Future of NFT Trading Across All Blockchains",
    template: "%s | OmniMint",
  },
  description:
    "Discover, create, and trade extraordinary NFTs across multiple blockchains. OmniMint is the most advanced NFT marketplace supporting Ethereum, Polygon, Solana, and more.",
  keywords: [
    "NFT marketplace",
    "multi-blockchain NFTs",
    "Ethereum NFTs",
    "Polygon NFTs",
    "Solana NFTs",
    "create NFTs",
    "mint NFTs",
    "digital art",
    "crypto collectibles",
    "Web3 marketplace",
    "decentralized marketplace",
    "OmniMint",
  ],
  authors: [{ name: "OmniMint Team" }],
  creator: "OmniMint",
  publisher: "OmniMint",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://omnimint.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omnimint.io",
    title: "OmniMint - The Future of NFT Trading Across All Blockchains",
    description:
      "Discover, create, and trade extraordinary NFTs across multiple blockchains. The most advanced NFT marketplace in the metaverse.",
    siteName: "OmniMint",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OmniMint - Multi-Blockchain NFT Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniMint - The Future of NFT Trading",
    description: "Discover, create, and trade extraordinary NFTs across multiple blockchains.",
    images: ["/twitter-image.jpg"],
    creator: "@mixedcrypto702",
    site: "@mixedcrypto702",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
  classification: "NFT Marketplace",
  referrer: "origin-when-cross-origin",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OmniMint",
              description: "The most advanced multi-blockchain NFT marketplace",
              url: "https://omnimint.io",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://omnimint.io/marketplace?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: ["https://x.com/mixedcrypto702", "https://discord.gg/omnimint", "https://github.com/omnimint"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
