"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Wallet,
  Sparkles,
  ShoppingCart,
  Settings,
  Shield,
  HelpCircle,
  Book,
  MessageCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    description: "Learn the basics of using OmniMint",
    articles: [
      "How to create an account",
      "Setting up your profile",
      "Understanding blockchain networks",
      "First steps guide",
    ],
  },
  {
    id: "wallet",
    title: "Wallet & Connection",
    icon: Wallet,
    description: "Connect and manage your crypto wallet",
    articles: ["Connecting MetaMask", "Using WalletConnect", "Switching networks", "Wallet troubleshooting"],
  },
  {
    id: "creating",
    title: "Creating NFTs",
    icon: Sparkles,
    description: "Learn how to mint and create NFTs",
    articles: ["How to mint your first NFT", "Setting royalties", "Creating collections", "File format requirements"],
  },
  {
    id: "trading",
    title: "Trading & Marketplace",
    icon: ShoppingCart,
    description: "Buy, sell, and trade NFTs",
    articles: ["How to buy NFTs", "Listing NFTs for sale", "Understanding gas fees", "Making offers"],
  },
  {
    id: "account",
    title: "Account & Settings",
    icon: Settings,
    description: "Manage your account and preferences",
    articles: ["Profile customization", "Notification settings", "Privacy controls", "Account security"],
  },
  {
    id: "security",
    title: "Security & Safety",
    icon: Shield,
    description: "Keep your assets safe and secure",
    articles: ["Avoiding scams", "Verifying authenticity", "Best security practices", "Reporting issues"],
  },
]

const faqs = [
  {
    question: "What is OmniMint?",
    answer:
      "OmniMint is a multi-blockchain NFT marketplace that allows you to create, buy, sell, and trade NFTs across Ethereum, Polygon, Solana, and Binance Smart Chain.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "We support MetaMask, WalletConnect, and Coinbase Wallet. You can connect any wallet that supports these protocols.",
  },
  {
    question: "What file formats can I upload for NFTs?",
    answer:
      "We support images (JPG, PNG, GIF, SVG), videos (MP4, WEBM), audio (MP3, WAV, OGG), and 3D files (GLB, GLTF).",
  },
  {
    question: "How do gas fees work?",
    answer:
      "Gas fees are transaction costs paid to the blockchain network. Fees vary by network - Ethereum typically has higher fees than Polygon or BSC.",
  },
  {
    question: "Can I cancel a listing?",
    answer:
      "Yes, you can cancel your NFT listings at any time. This will require a small gas fee to execute the cancellation transaction.",
  },
  {
    question: "How do royalties work?",
    answer:
      "Royalties are a percentage of future sales that go back to the original creator. You can set royalties up to 50% when creating your NFT.",
  },
  {
    question: "Is there a minimum price for NFTs?",
    answer:
      "There's no minimum price set by OmniMint, but consider gas fees when pricing your NFTs to ensure profitability.",
  },
  {
    question: "How do I report a problem or scam?",
    answer:
      "Use the report button on any NFT or collection page, or contact our support team directly through the contact form.",
  },
]

export default function HelpPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of OmniMint
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-black/40 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Contact Support</h3>
              <p className="text-gray-400 text-sm mb-4">Get personalized help from our support team</p>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                Contact Us
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Join Community</h3>
              <p className="text-gray-400 text-sm mb-4">Connect with other users and get help</p>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                Join Discord
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Book className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
              <p className="text-gray-400 text-sm mb-4">Detailed guides and API documentation</p>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                View Docs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Help Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {helpCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.id}
                    className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                          <p className="text-gray-400 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {category.articles.slice(0, 3).map((article, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-300 hover:text-purple-400 transition-colors"
                          >
                            <span>{article}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                        <div className="text-purple-400 text-sm font-medium mt-3">
                          View all {category.articles.length} articles →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-purple-500/30">
                      <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No FAQs found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="bg-black/40 border-purple-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Popular Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "How to connect MetaMask wallet",
                    "Creating your first NFT",
                    "Understanding gas fees",
                    "Setting up your profile",
                    "Avoiding common scams",
                  ].map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      <span>{article}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Still Need Help */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
