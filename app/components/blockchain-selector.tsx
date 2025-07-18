"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Zap, Shield, Globe } from "lucide-react"

const BLOCKCHAIN_CATEGORIES = {
  mainnet: {
    title: "Layer 1 Networks",
    description: "Primary blockchain networks",
    blockchains: [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        gasPrice: "High",
        description: "Most popular, highest liquidity",
        color: "from-blue-500 to-blue-600",
        chainId: 1,
        features: ["High Security", "Large Ecosystem", "DeFi Hub"],
      },
      {
        id: "polygon",
        name: "Polygon",
        symbol: "MATIC",
        gasPrice: "Low",
        description: "Fast and cheap transactions",
        color: "from-purple-500 to-purple-600",
        chainId: 137,
        features: ["Low Fees", "Fast Finality", "Ethereum Compatible"],
      },
      {
        id: "bsc",
        name: "Binance Smart Chain",
        symbol: "BNB",
        gasPrice: "Low",
        description: "Low fees, fast confirmation",
        color: "from-yellow-500 to-yellow-600",
        chainId: 56,
        features: ["Low Cost", "High Speed", "Large User Base"],
      },
    ],
  },
  opstack: {
    title: "OP Stack L2s",
    description: "Optimistic Rollup networks built on OP Stack",
    blockchains: [
      {
        id: "base",
        name: "Base",
        symbol: "ETH",
        gasPrice: "Low",
        description: "Coinbase's L2, built on OP Stack",
        color: "from-blue-400 to-blue-500",
        chainId: 8453,
        features: ["Coinbase Backed", "Easy Onboarding", "Growing Ecosystem"],
      },
      {
        id: "optimism",
        name: "OP Mainnet",
        symbol: "ETH",
        gasPrice: "Low",
        description: "Original Optimistic Rollup",
        color: "from-red-500 to-red-600",
        chainId: 10,
        features: ["Battle Tested", "Retroactive Funding", "Strong Community"],
      },
      {
        id: "soneium",
        name: "Soneium",
        symbol: "ETH",
        gasPrice: "Very Low",
        description: "Sony's blockchain network",
        color: "from-indigo-500 to-indigo-600",
        chainId: 1946,
        features: ["Sony Ecosystem", "Entertainment Focus", "Web3 Gaming"],
      },
      {
        id: "ink",
        name: "Ink",
        symbol: "ETH",
        gasPrice: "Very Low",
        description: "Kraken's L2 solution",
        color: "from-slate-500 to-slate-600",
        chainId: 57073,
        features: ["Kraken Backed", "DeFi Focused", "Institutional Grade"],
      },
      {
        id: "worldchain",
        name: "Worldchain",
        symbol: "ETH",
        gasPrice: "Low",
        description: "World's identity-focused chain",
        color: "from-cyan-500 to-cyan-600",
        chainId: 480,
        features: ["Identity Verification", "Human-Centric", "Privacy First"],
      },
      {
        id: "lisk",
        name: "Lisk",
        symbol: "ETH",
        gasPrice: "Low",
        description: "Developer-friendly blockchain",
        color: "from-emerald-500 to-emerald-600",
        chainId: 1135,
        features: ["Developer Tools", "Easy Deployment", "Modular Design"],
      },
    ],
  },
  other: {
    title: "Other Networks",
    description: "Alternative blockchain networks",
    blockchains: [
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        gasPrice: "Very Low",
        description: "Ultra-fast and low cost",
        color: "from-green-500 to-green-600",
        chainId: null,
        features: ["Ultra Fast", "Low Fees", "High Throughput"],
      },
    ],
  },
}

interface BlockchainSelectorProps {
  selectedBlockchain: string
  onSelect: (blockchainId: string) => void
  showDetails?: boolean
  defaultTab?: string
}

export function BlockchainSelector({
  selectedBlockchain,
  onSelect,
  showDetails = true,
  defaultTab = "opstack",
}: BlockchainSelectorProps) {
  const getGasPriceColor = (gasPrice: string) => {
    switch (gasPrice) {
      case "Very Low":
        return "bg-green-500/20 text-green-400"
      case "Low":
        return "bg-yellow-500/20 text-yellow-400"
      case "High":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Choose Your Blockchain</h3>
        <p className="text-gray-400">Select the network where you want to mint your NFT</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="opstack" className="data-[state=active]:bg-purple-600">
            <Zap className="w-4 h-4 mr-2" />
            OP Stack L2s
          </TabsTrigger>
          <TabsTrigger value="mainnet" className="data-[state=active]:bg-purple-600">
            <Shield className="w-4 h-4 mr-2" />
            Layer 1
          </TabsTrigger>
          <TabsTrigger value="other" className="data-[state=active]:bg-purple-600">
            <Globe className="w-4 h-4 mr-2" />
            Other
          </TabsTrigger>
        </TabsList>

        {Object.entries(BLOCKCHAIN_CATEGORIES).map(([categoryKey, category]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="text-lg font-medium text-white">{category.title}</h4>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.blockchains.map((blockchain) => (
                <Card
                  key={blockchain.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedBlockchain === blockchain.id
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                      : "border-purple-500/30 hover:border-purple-500/50 bg-black/40"
                  }`}
                  onClick={() => onSelect(blockchain.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${blockchain.color} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">{blockchain.symbol}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{blockchain.name}</h3>
                          <p className="text-gray-400 text-sm">{blockchain.description}</p>
                        </div>
                      </div>
                      <Badge className={getGasPriceColor(blockchain.gasPrice)}>{blockchain.gasPrice} Gas</Badge>
                    </div>

                    {showDetails && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {blockchain.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-purple-500/30 text-purple-300"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedBlockchain === blockchain.id && (
                      <div className="mt-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                        <div className="flex items-center text-purple-400 text-sm">
                          <Info className="w-4 h-4 mr-2" />
                          Selected for minting
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {categoryKey === "opstack" && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">OP Stack Benefits</h4>
                    <ul className="text-blue-300 text-sm space-y-1">
                      <li>• Lower transaction fees compared to Ethereum mainnet</li>
                      <li>• Faster confirmation times (1-2 seconds)</li>
                      <li>• Full Ethereum compatibility and security</li>
                      <li>• Easy bridging to/from Ethereum</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
